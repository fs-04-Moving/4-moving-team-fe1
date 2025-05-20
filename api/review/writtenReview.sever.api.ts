import { API_URL } from '@/constants/env';

interface GetMyWrittenReviewsServerParams {
  page: number;
  pageSize: number;
}

const getMyWrittenReviewsServer = async (
  cookieHeaderString: string, 
  params: GetMyWrittenReviewsServerParams
) => {
  const { page, pageSize } = params;

  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize), 
  }).toString();

  const res = await fetch(`${API_URL}/review?${queryParams}`, { 
    method: 'GET',
    headers: {
      Cookie: cookieHeaderString, 
    },
    credentials: 'include',
    cache: 'no-store', 
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getMyWrittenReviewsServer 실패:', text, 'Status:', res.status);
    throw new Error(`Failed to fetch written reviews: ${res.status}`);
  }

  const data = await res.json();
  return data; 
};

const writtenReviewApiServer = {
    getMyWrittenReviewsServer,
};

export default writtenReviewApiServer; 
