import { API_URL } from '@/constants/env';
import { WorkerSearchParams } from '@/types/dtos/Worker.dto';
import { getCookieHeader } from '@/utils/server/getCookieHeader.server';

const getWorkerProfilesServer = async (params: WorkerSearchParams) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/profile/workers?${queryString}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getWorkerProfilesServer 실패', text);
    throw new Error(`Failed to fetch worker profiles: ${res.status}`);
  }

  return res.json();
};

const profileServerApi = {
  getWorkerProfilesServer,
};

export default profileServerApi;
