import axios, { AxiosError } from 'axios';
import usersApi from './users/users.api';

const baseURL = 'http://localhost:5050';

export const client = axios.create({
  baseURL,
});

// ---------------- axios interceptors 설정하기
// request interceptor
// - headers에 accessToken 실어 보내기
client.interceptors.request.use(
  (config) => {
    if (
      config.url === '/users/refresh-token' ||
      config.url === '/users/sign-up' ||
      config.url === '/users/log-in' ||
      config.url === '/users/check-nickname'
    )
      return config;
    let accessToken;
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken');
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
// - 401 에러 시 refreshToken 요청(accessToken 재발급) 후 -에러가 발생한- 기존 요청을 재요청
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    if ((statusCode === 401 || statusCode === 419) && !originalRequest._retry) {
      console.log('토큰 만료');
      originalRequest._retry = true;
      let prevRefreshToken;
      if (typeof window !== 'undefined') {
        prevRefreshToken = localStorage.getItem('refreshToken');
      }
      if (!prevRefreshToken) {
        return;
      }
      const { accessToken } = await usersApi.refreshToken(prevRefreshToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
      }
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return client.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

export function errorHandler(error: AxiosError | Error | unknown) {
  console.log('AxiosError', error);
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  } else {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('알 수 없는 에러로 요청에 실패하였습니다.');
    }
  }
}
