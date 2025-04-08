import { NextRequest, NextResponse } from 'next/server';
import { getUserMeServer } from './api/user/user.api'; // 너가 이미 만들어둔 서버 유저 정보 fetch 함수
import { getAccessTokenFromRefreshWithRefreshToken } from './utils/getAccessTokenFromRefreshByRefreshTokenWithRefreshToken';

// 접근 가능한 경로 정의
const PUBLIC_ROUTES = ['/', '/auth/log-in', '/auth/sign-up'];
const PROFILE_ROUTES = ['/customer/profile', '/worker/profile'];

/**
 * 쿠키로부터 accessToken을 얻고 유저 정보를 반환하는 함수
 */
async function getUserFromRequest(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');
  if (!refreshToken) return null;

  const accessToken = await getAccessTokenFromRefreshWithRefreshToken(
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

/**
 * 미들웨어 메인 함수
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. 퍼블릭 라우트: 로그인하지 않은 사용자 접근 허용
  if (PUBLIC_ROUTES.includes(pathname)) {
    const result = await getUserFromRequest(req);
    if (!result) return NextResponse.next();

    const { user } = result;
    const target = user.hasProfile ? `/${user.role}` : `/${user.role}/profile`;
    return NextResponse.redirect(new URL(target, req.url));
  }

  // 2. 프로필 작성 페이지: 로그인 필요, hasProfile === false만 접근 가능
  if (PROFILE_ROUTES.includes(pathname)) {
    const result = await getUserFromRequest(req);
    if (!result) return NextResponse.redirect(new URL('/', req.url));

    const { user } = result;
    if (user.hasProfile) {
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    }

    return NextResponse.next();
  }

  // 3. 나머지 라우트: 로그인 + 프로필 작성 완료 필수
  const result = await getUserFromRequest(req);
  if (!result) return NextResponse.redirect(new URL('/', req.url));

  const { user } = result;
  if (!user.hasProfile) {
    return NextResponse.redirect(new URL(`/${user.role}/profile`, req.url));
  }

  return NextResponse.next();
}

/**
 * matcher 설정 (정적 리소스 제외)
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

/**
 * refreshToken을 이용해 accessToken을 받아오는 유틸 함수
 */
// async function getAccessTokenFromRefreshWithRefreshToken(
//   refreshToken: string | { value: string }
// ): Promise<string | null> {
//   try {
//     const tokenValue =
//       typeof refreshToken === 'string' ? refreshToken : refreshToken.value;

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Cookie: `refreshToken=${tokenValue}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       const message = await res.text();
//       if (res.status === 401 && message.includes('No refresh token')) {
//         console.debug('No refresh token - skipping silently.');
//         return null;
//       }
//       throw new Error(`${res.status}: ${message}`);
//     }

//     const data = await res.json();
//     return data.accessToken.accessToken;
//   } catch (error) {
//     console.error('Failed to get access token from refresh token', error);
//     return null;
//   }
// }
