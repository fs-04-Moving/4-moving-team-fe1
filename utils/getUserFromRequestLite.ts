import { NextRequest } from 'next/server';
import { decodeJWT } from './jwtUtils';

interface JwtPayload {
  role: 'customer' | 'worker';
  hasProfile: boolean;
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function getUserFromRequestLite(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) return null;

  const payload = decodeJWT<JwtPayload>(refreshToken);

  if (!payload || !payload.role || typeof payload.hasProfile === 'undefined') {
    console.warn('[middleware] ⚠️ Invalid JWT payload structure:', payload);
    return null;
  }

  return {
    user: {
      role: payload.role,
      hasProfile: payload.hasProfile,
    },
  };
}
