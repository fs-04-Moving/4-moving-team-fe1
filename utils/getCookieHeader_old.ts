// utils/getCookieHeader.ts

import { cookies } from 'next/headers';

/**
 * SSR 환경에서 fetch 요청에 사용할 쿠키 헤더 문자열을 생성
 * @returns 쿠키 헤더 문자열 (ex: "refreshToken=abc; accessToken=def")
 */
export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}
