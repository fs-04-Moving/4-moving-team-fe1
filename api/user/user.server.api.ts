import { API_URL } from '@/constants/env';
import { getCookieHeader } from '@/utils/server/getCookieHeader.server';

/**
 * 기존 getUserMe가 있는데 별도로 server용을 만든 이유는?
 * - 서버 환경에서는 axios의 쿠키/인터셉터가 작동하지 않으므로 fetch로 직접 호출
 * ---->> 노노!! 작동하지 않는 것이 아니라 기본적으로 fetch가 최적화이므로
 * (서버 환경에서는 axios의 withCredentials 설정도 의미가 없으므로 headers에 직접 넣어줘야 함)
 * @param
 * @returns
 */
async function getUserMeServer() {
  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${API_URL}/user/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include', // <- 쿠키도 필요하면 이 옵션 유지
    cache: 'no-store', // Next.js에서 SSR fetch할 때는 이걸 붙여줘야 즉시 데이터 받음
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getUserMeServer fetch 실패', text);
    throw new Error(`Failed to fetch user info: ${res.status}`);
  }

  const user = await res.json();
  return user;
}

const userServerApi = {
  getUserMeServer,
};

export default userServerApi;
