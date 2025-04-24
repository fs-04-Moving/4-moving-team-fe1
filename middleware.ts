import { NextRequest, NextResponse } from 'next/server';
import ROUTES from './constants/routes';
import { getUserFromRequestLite } from './utils/getUserFromRequestLite';

// 접근 가능한 경로 정의
const OPEN_ROUTES = [ROUTES.FIND_WORKER];
const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOG_IN,
  ROUTES.SIGN_UP,
  ROUTES.FIND_WORKER,
];
const PROFILE_ROUTES = [ROUTES.CUSTOMER.PROFILE, ROUTES.WORKER.PROFILE];

/**
 * 라우트 리다이렉트 미들웨어
 * - 퍼블릭 라우트 외에도 user정보 fetch를 통해 모든 리다이렉트 처리
 * - 클라이언트에서의 리다이렉트 최소화(깜박임이 UX를 너무너무 저해시키므로)
 */
export async function middleware(req: NextRequest) {
  const start = performance.now(); // 측정 시작

  const result = await getUserFromRequestLite();

  const end = performance.now(); // 측정 끝
  console.log(
    `⏱ getUserFromRequestLite: duration: ${(end - start).toFixed(2)}ms`
  );

  const { pathname } = req.nextUrl;
  console.log('🧭 pathname:', pathname);

  // 1. 오픈 라우트 (로그인 여부 관계없이 접근 허용)
  if (OPEN_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. 퍼블릭 라우트: 로그인 X → 허용 / 로그인 O → 리다이렉트
  if (
    PUBLIC_ROUTES.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )
  ) {
    if (!result) return NextResponse.next();

    const { role, hasProfile } = result;
    const target = hasProfile ? `/${role}` : `/${role}/profile`;
    return NextResponse.redirect(new URL(target, req.url));
  }

  // 로그인 필요 이후 로직
  // const result = await getUserFromRequest(req);
  if (!result) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const { role, hasProfile } = result;

  // 3. 프로필 작성 페이지
  if (PROFILE_ROUTES.includes(pathname)) {
    // role이 다른 프로필 페이지에 접근 시 리다이렉트
    const expectedProfilePath = `/${role}/profile`;
    if (pathname !== expectedProfilePath) {
      return NextResponse.redirect(new URL(expectedProfilePath, req.url));
    }

    // 이미 프로필이 있다면 홈으로 이동
    if (hasProfile) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }

    return NextResponse.next();
  }

  // 4. 일반 보호 라우트 - 프로필 미작성 → 프로필 페이지로 이동
  if (!hasProfile) {
    return NextResponse.redirect(new URL(`/${role}/profile`, req.url));
  }

  // 5. Role 보호 - 다른 역할 영역 접근 시 리다이렉트
  // 단, 예외적으로 기사의 상세페이지(/worker/:workerId)는 접근 가능
  const isWorkerDetailPage = /^\/worker\/[^\/]+$/.test(pathname);

  if (
    !isWorkerDetailPage && // 예외 라우트가 아닌 경우에만 막음
    ((role === 'customer' && pathname.startsWith(ROUTES.WORKER.ROOT)) ||
      (role === 'worker' && pathname.startsWith(ROUTES.CUSTOMER.ROOT)))
  ) {
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  // 6. 모든 조건을 통과하면 정상 접근
  return NextResponse.next();
}

/**
 * matcher 설정 (정적 리소스 제외)
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
