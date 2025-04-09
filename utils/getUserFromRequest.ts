// ----------- fetch를 통해 User 정보를 갖고 올 때 ----------- //

import { getUserMeServer } from '@/api/user/user.api';
import { NextRequest } from 'next/server';
import { getAccessTokenFromRefreshByRefreshToken } from './jwtUtils';

/**
 * 쿠키로부터 accessToken을 얻고 fetch를 통해 유저 정보를 반환하는 함수
 */
export async function getUserFromRequest(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');
  if (!refreshToken) return null;

  const accessToken = await getAccessTokenFromRefreshByRefreshToken(
    refreshToken
  );
  if (!accessToken) return null;

  try {
    const user = await getUserMeServer(accessToken);
    return { accessToken, user };
  } catch (error) {
    console.error('Failed to fetch user from access token', error);
    return null;
  }
}

//
//
//
//
// ----------- token에 role과 hasProfile담아서 사용 ----------- //

// import { NextRequest } from 'next/server';
// import { getAccessTokenFromRefreshByRefreshToken } from './getAccessTokenFromRefreshByRefreshToken';
// import { decodeJWT, JwtPayload } from './jwtUtils';

// export async function getUserFromRequest(req: NextRequest) {
//   const refreshToken = req.cookies.get('refreshToken');
//   if (!refreshToken) return null;

//   const accessToken = await getAccessTokenFromRefreshByRefreshToken(
//     refreshToken
//   );
//   if (!accessToken) return null;

//   const payload: JwtPayload | null = decodeJWT(accessToken);
//   if (!payload || !payload.role || typeof payload.hasProfile === 'undefined') {
//     console.warn('Invalid JWT payload structure:', payload);
//     return null;
//   }

//   return {
//     accessToken,
//     user: {
//       role: payload.role,
//       hasProfile: payload.hasProfile,
//     },
//   };
// }
