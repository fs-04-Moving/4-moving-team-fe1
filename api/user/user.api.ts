import { client, errorHandler } from '../client';

// 내 정보 조회
const getUserMe = async () => {
  if (typeof window === 'undefined') {
    // SSR에서는 axios 말고, getUserMeServer를 사용하도록 유도
    throw new Error('getUserMe는 클라이언트에서만 사용 가능합니다.');
  }
  try {
    const url = '/user/me';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

/**
 * 기존 getUserMe가 있는데 별도로 server용을 만든 이유는?
 * - 서버 환경에서는 axios의 쿠키/인터셉터가 작동하지 않으므로 fetch로 직접 호출
 * @param accessToken
 * @returns
 */
export async function getUserMeServer(accessToken: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include', // <- 쿠키도 필요하면 이 옵션 유지
    cache: 'no-store', // Next.js에서 SSR fetch할 때는 이걸 붙여줘야 즉시 데이터 받음
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('❌ SSR fetch 실패', text);
    throw new Error(`Failed to fetch user info: ${res.status}`);
  }

  const user = await res.json();
  return user;
}

const usersApi = {
  getUserMe,
  getUserMeServer,
};

export default usersApi;
