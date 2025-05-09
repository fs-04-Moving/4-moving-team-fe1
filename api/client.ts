import { NEXT_PUBLIC_API_URL } from '@/constants/env';
import { logoutHelper } from '@/utils/auth.helper';
import axios from 'axios';
import authApi from './auth/auth.api';

const baseURL = NEXT_PUBLIC_API_URL;

export const client = axios.create({
  baseURL,
  withCredentials: true, // 쿠키를 요청에 포함시킴 (SSR에서도 사용 가능)
});

// request interceptor: 클라이언트 환경에서만 accessToken 헤더에 포함
// 토큰 모두 쿠키로 전달하면서 필요없어짐
// client.interceptors.request.use(

// response interceptor: accessToken 만료 시 refreshToken 쿠키로 재요청
// refreshToken 무한 루프로 다시 입력한 코드
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    console.log('error', error);

    // refreshToken 요청 자체에서 에러면 빠져나가기
    if (
      originalRequest.url.includes('/auth/refresh-token') || // 이미 refresh-token 요청 중이거나
      originalRequest._retry // _retry가 true이면 이미 재시도된 요청이므로 빠져나가기(무한 루프 방지)
    ) {
      return Promise.reject(error);
    }

    // SSR 환경에선 절대 동작하지 않도록
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    // 인증 오류 발생 시 refrechToken으로 재발급 시도 후 원래 요청 다시 실행하기
    if (statusCode === 401 || statusCode === 419) {
      originalRequest._retry = true;

      try {
        const res = await authApi.refreshToken();

        if (!res || !res.accessToken) {
          console.warn('Failed to refresh token.');
          return Promise.reject(error);
        }

        const newAccessToken = res.accessToken.accessToken;

        // 새 토큰을 헤더에 반영
        console.log('axios accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return client(originalRequest); // 재요청
      } catch (refreshError) {
        // refreshToken도 만료됐거나 문제 생긴 경우에는 로그아웃
        console.error('Refresh token failed', refreshError);
        if (typeof window !== 'undefined') {
          logoutHelper();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export function errorHandler(error: unknown) {
  console.log('AxiosError', error);

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // 인증 관련 에러는 무시
      if (status === 401 && typeof data === 'string' && data.includes('No refresh token')) {
        console.warn('No refresh token. Skipping silently.');
        return null;
      }

      if (status === 403) {
        console.warn('Forbidden. Maybe token expired.');
        return null;
      }

      // 기타 에러
      throw new Error(`${status}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
    } else {
      // 네트워크 에러 등으로 response가 없는 경우
      const url = error.config?.url ?? 'unknown URL';
      throw new Error(`Network or CORS error while accessing: ${url}`);
    }
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error('Unknown error occurred');
}
