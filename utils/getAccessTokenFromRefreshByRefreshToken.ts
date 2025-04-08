/**
 * 미들웨어에서 사용
 * - getAccessTokenFromRefresh와의 차이는 파라미터로 token을 받는지 안 받는지
 * @param refreshToken
 * @returns
 */
export async function getAccessTokenFromRefreshByRefreshToken(
  refreshToken: string | { value: string }
): Promise<string | null> {
  try {
    const tokenValue =
      typeof refreshToken === 'string' ? refreshToken : refreshToken.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${tokenValue}`,
        },
      }
    );

    if (!res.ok) {
      const message = await res.text();
      if (res.status === 401 && message.includes('No refresh token')) {
        console.debug('No refresh token - skipping silently.');
        return null;
      }
      throw new Error(`${res.status}: ${message}`);
    }

    const data = await res.json();
    return data.accessToken.accessToken;
  } catch (error) {
    console.error('Failed to get access token from refresh token', error);
    return null;
  }
}
