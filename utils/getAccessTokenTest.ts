import { API_URL } from '@/constants/env';
import { cookies } from 'next/headers';

export async function getAccessTokenFromRefreshTest(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!res.ok) return null;

  const data = await res.json();

  console.log('🔎 auth/refresh-token 응답:', data);

  if (typeof data.accessToken === 'string') return data.accessToken;
  if (data.accessToken?.accessToken) return data.accessToken.accessToken;

  return null;
}
