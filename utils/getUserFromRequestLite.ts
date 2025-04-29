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
