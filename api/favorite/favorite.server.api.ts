// 서버용 함수를 별도로 만들어야 하는 이유
// 1. URL의 차이
// - 서버에서 실행될 경우 next.config.ts의 rewrite가 작동하지 않으므로 절대 경로가 필요
// 2. 토큰의 전달
// - client는 axios interceptor를 통해 로컬 스토리지의 토큰을 헤더에 탑재
// - 그러나 서버에서는 로컬 스토리지를 읽지 못함

import { API_URL } from '@/constants/env';
import { getCookieHeader } from '@/utils/server/getCookieHeader.server';

// - 따라서 직접 headers에 토큰(cookieHeader)을 설정해야 함
const getFavoriteWorkersServer = async () => {
  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${API_URL}/favorite`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getFavoriteWorkersServer 실패', text);
    throw new Error(`Failed to fetch favorites: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const favoriteServerApi = {
  getFavoriteWorkersServer,
};

export default favoriteServerApi;
