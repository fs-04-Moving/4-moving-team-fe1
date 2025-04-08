import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from './utils/getUserFromRequest';

// 접근 가능한 경로 정의
const PUBLIC_ROUTES = ['/', '/auth/log-in', '/auth/sign-up'];
const PROFILE_ROUTES = ['/customer/profile', '/worker/profile'];
// 테스트 라우트 임시 등록
// TODO: 추후 삭제
const TEST_ROUTES = [
  '/test/jhm',
  '/test/jjh',
  '/test/kem',
  '/test/khj',
  '/test/khjoo',
  '/test/khju',
  '/test/kjy',
  '/test/usm',
];

/**
 * 라우트 리다이렉트 미들웨어
 * - 퍼블릭 라우트 외에도 user정보 fetch를 통해 모든 리다이렉트 처리
 * - 클라이언트에서의 리다이렉트 최소화(깜박임이 UX를 너무너무 저해시키므로)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. 퍼블릭 라우트: 로그인하지 않은 사용자 접근 허용
  if (PUBLIC_ROUTES.includes(pathname) || TEST_ROUTES.includes(pathname)) {
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
 * 퍼블릭 라우트만 리다이렉트
 *
 * refreshToken을 이용해 accessToken을 받아오는 유틸 함수
 */
// async function getAccessTokenFromRefreshByRefreshToken(
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
