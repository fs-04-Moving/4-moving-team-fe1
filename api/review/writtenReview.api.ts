// 🗒️작성한 리뷰 데이터 갖고오는 API

import { Review } from '@/types/dtos/review.dto';
import { client, errorHandler } from '../client';
import { API_URL } from '@/constants/env';

interface GetMyWrittenReviewsParams {
  page?: number;
}

interface GetMyWrittenReviewsResponse {
  list: Review[];
  totalCount: number;
}

const getMyWrittenReviews = async (params?: GetMyWrittenReviewsParams) => {
  const url = '/review';
  try {
    const response = await client.get(url, { params });
    console.log('백엔드에서 리뷰 목록을 성공적으로 가져왔습니다.');
    return response.data;
  } catch (error) {
    console.error('백엔드에서 리뷰 목록을 가져오는 데 실패했습니다ㅠㅠㅠ', error);
    console.log('백엔드 호출 실패. 🍚예시 데이터를 사용합니다.');
  }
};

const getMyWrittenReviewsServer = async (cookieHeader: string, params?: GetMyWrittenReviewsParams): Promise<GetMyWrittenReviewsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) {
    queryParams.append('page', String(params.page));
  }
  // 다른 파라미터도 필요하다면 queryParams에 추가

  const apiUrl = `${API_URL}/review?${queryParams.toString()}`;

  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getMyWrittenReviewsServer 실패', text);
    throw new Error(`Failed to fetch written reviews: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const reviewsApi = {
  getMyWrittenReviews,
  getMyWrittenReviewsServer,
};

export default reviewsApi;