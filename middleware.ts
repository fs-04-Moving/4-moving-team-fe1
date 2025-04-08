export function middleware() {
  console.log('미들웨어');
}

// import { NextRequest, NextResponse } from 'next/server';

// const PUBLIC_ROUTES = ['/', '/auth/log-in', '/auth/sign-up'];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // 퍼블릭 라우트는 항상 허용
//   if (PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const refreshToken = req.cookies.get('refreshToken')?.value;

//   // 퍼블릭이 아닌데 refreshToken 없으면 로그인 페이지로 리다이렉트
//   if (!refreshToken) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   // refreshToken이 존재하면 다음 단계로 진행
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };
