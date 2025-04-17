import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
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

export function getUserFromRequestLiteSync() {
  const cookieStore = cookies() as unknown as RequestCookies;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) return null;

  const payload = decodeJWT<JwtPayload>(refreshToken);

  if (!payload || !payload.role || typeof payload.hasProfile === 'undefined') {
    console.warn('[middleware] ⚠️ Invalid JWT payload structure:', payload);
    return null;
  }

  return payload;
}
