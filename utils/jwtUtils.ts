import { API_URL } from '@/constants/env';
import { cookies } from 'next/headers';

/**
 * JWT 디코딩 유틸(base64 디코딩)
 * @param token
 * @returns
 */
export function decodeJWT<T = unknown>(token: string): T | null {
  try {
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64url').toString('utf8');
    const parsed = JSON.parse(decoded);

    return parsed as T;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

//
/**
 * 미들웨어에서 사용
 * - getAccessTokenFromRefresh와의 차이는 파라미터로 token을 받는지 안 받는지
 * @param refreshToken
 * @returns
 */
export async function getAccessTokenFromRefreshByRefreshToken(
  refreshToken: string | { value: string }
): Promise<string | null> {
  try {
    const tokenValue =
      typeof refreshToken === 'string' ? refreshToken : refreshToken.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${tokenValue}`,
        },
      }
    );

    if (!res.ok) {
      const message = await res.text();
      if (res.status === 401 && message.includes('No refresh token')) {
        console.debug('No refresh token - skipping silently.');
        return null;
      }
      throw new Error(`${res.status}: ${message}`);
    }

    const data = await res.json();
    return data.accessToken.accessToken;
  } catch (error) {
    console.error('Failed to get access token from refresh token', error);
    return null;
  }
}

/**
 * 현재 refreshToken만 쿠키에 저장하고
 * accessToken은 쿠키 저장없이 header에 실어보내는 방식 사용
 * ssr을 보낼 때 사용할 accessToken을 얻기 위해 refreshToken을 사용하기 위한 함수
 * @returns
 */
export async function getAccessTokenFromRefresh(): Promise<string | null> {
  const cookieStore = cookies();
  console.log('SSR refreshToken:', (await cookieStore).getAll());
  const refreshToken = (await cookieStore).get('refreshToken')?.value;

  // 로그인 안 된 경우: 조용히 null 반환
  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) {
      // 실제로 refresh-token이 유효하지 않을 때만 에러 출력
      const message = await res.text();
      if (res.status === 401 && message.includes('No refresh token')) {
        console.debug('No refresh token in SSR - skipping silently.');
        return null;
      }
      throw new Error(`${res.status}: ${message}`);
    }

    const data = await res.json();
    return data.accessToken.accessToken;
  } catch (error) {
    // 네트워크 문제 등 예외적인 경우
    console.error('Refresh token request failed', error);
    return null;
  }
}

/**
 * 로컬 스토리지에서 accessToken불러오기
 * @returns
 */
export const getAccessTokenFromStorage = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};
