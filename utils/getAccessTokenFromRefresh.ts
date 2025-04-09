import { cookies } from 'next/headers';

/**
 * 현재 refreshToken만 쿠키에 저장하고
 * accessToken은 쿠키 저장없이 header에 실어보내는 방식 사용
 * ssr을 보낼 때 사용할 accessToken을 얻기 위해 refreshToken을 사용하기 위한 함수
 * @returns
 */
export async function getAccessTokenFromRefresh(): Promise<string | null> {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get('refreshToken')?.value;

  // 로그인 안 된 경우: 조용히 null 반환
  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (!res.ok) {
      // 실제로 refresh-token이 유효하지 않을 때만 에러 출력
      const message = await res.text();
      if (res.status === 401 && message.includes('No refresh token')) {
        console.debug('No refresh token in SSR - skipping silently.');
        return null;
      }
      throw new Error(`${res.status}: ${message}`);
    }

    const data = await res.json();
    return data.accessToken.accessToken;
  } catch (error) {
    // 네트워크 문제 등 예외적인 경우
    console.error('Refresh token request failed', error);
    return null;
  }
}
