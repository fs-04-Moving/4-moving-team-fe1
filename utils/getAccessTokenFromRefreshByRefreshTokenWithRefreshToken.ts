export async function getAccessTokenFromRefreshWithRefreshToken(
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
