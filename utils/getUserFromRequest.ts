import { getUserMeServer } from '@/api/user/user.api';
import { NextRequest } from 'next/server';
import { getAccessTokenFromRefreshByRefreshToken } from './getAccessTokenFromRefreshByRefreshToken';

/**
 * 쿠키로부터 accessToken을 얻고 유저 정보를 반환하는 함수
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
