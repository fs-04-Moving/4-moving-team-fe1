import { API_URL } from '@/constants/env';
import { getCookieHeader } from '@/utils/server/getCookieHeader.server';


interface GetReviewableEstimatesServerParams {
  page: number;
  pageSize: number;
}

const getReviewableEstimatesServer = async (params: GetReviewableEstimatesServerParams) => {
  const queryParams = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/estimates/reviewable?${queryParams}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include', 
    cache: 'no-store',    
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getReviewableEstimatesServer 실패', text);
    throw new Error(`Failed to fetch reviewable estimates: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const writableReviewApiServer = {
  getReviewableEstimatesServer,
};

export default writableReviewApiServer;