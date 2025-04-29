import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { JwtPayload } from './getUserFromRequestLite';
import { decodeJWT } from './jwtUtils';

export function getUserFromRequestLiteSync() {
  const cookieStore = cookies() as unknown as RequestCookies;
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return null;

  const payload = decodeJWT<JwtPayload>(accessToken);

  if (!payload || !payload.role || typeof payload.hasProfile === 'undefined') {
    console.warn('[middleware] ⚠️ Invalid JWT payload structure:', payload);
    return null;
  }

  return payload;
}
