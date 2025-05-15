import { cookies } from 'next/headers';
import { decodeJWT } from './jwtUtils';

export interface JwtPayload {
  role: 'customer' | 'worker';
  hasProfile: boolean;
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
  name: string;
  profileImage?: string;
}

export async function getUserFromRequestLite() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;

  if (!accessToken) return null;

  const payload = decodeJWT<JwtPayload>(accessToken);

  if (!payload || !payload.role || typeof payload.hasProfile === 'undefined') {
    console.warn('[middleware] ⚠️ Invalid JWT payload structure:', payload);
    return null;
  }

  return payload;
  // return {
  //   user: {
  //     role: payload.role,
  //     hasProfile: payload.hasProfile,
  //   },
  // };
}

/**
 * SSR에서 accessToken 만료 및 refreshToken까지 검증해주는 Strict 버전
 */
export async function getUserFromRequestStrict() {
  const cookieStore = cookies();
  let accessToken = (await cookieStore).get('accessToken')?.value;
  const refreshToken = (await cookieStore).get('refreshToken')?.value;

  let payload = accessToken ? decodeJWT<JwtPayload>(accessToken) : null;

  const isExpired = payload?.exp ? Date.now() >= payload.exp * 1000 : true;

  // 액세스 토큰이 없거나 만료된 경우
  if ((!accessToken || isExpired) && refreshToken) {
    try {
      const newAccessToken = await getAccessTokenFromRefresh();

      if (newAccessToken) {
        accessToken = newAccessToken;
        payload = decodeJWT<JwtPayload>(accessToken);
        // ⚠️ 이 시점에 서버에서 response cookie set 해주는 건 별도로 처리해야 함
        // Next.js 15 미들웨어나 API route에서 직접 Response return 필요
      }
    } catch (error) {
      console.warn('[SSR Auth Strict] ⚠️ Failed to refresh access token', error);
      return null;
    }
  }

  if (!payload || !payload.role || typeof payload.hasProfile === 'undefined') {
    console.warn('[SSR Auth Strict] ⚠️ Invalid or expired JWT payload');
    return null;
  }

  return payload;
}

export async function getAccessTokenFromRefresh(): Promise<string | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // refreshToken 쿠키 전송
    });

    if (!response.ok) {
      console.warn('[Auth] Failed to refresh token', response.status);
      return null;
    }

    const data = await response.json();
    if (typeof data.accessToken === 'string') return data.accessToken;
    if (data.accessToken?.accessToken) return data.accessToken.accessToken;

    return null;
  } catch (error) {
    console.error('[Auth] Error refreshing token', error);
    return null;
  }
}
