// 🗒️작성가능한 이사견적 데이터 갖고오는 API

import { Review } from '@/types/dtos/review.dto';
import { client, errorHandler } from '../client';
import { API_URL } from '@/constants/env';

interface GetReviewableEstimatesParams {
  page?: number;
  pageSize?: number;
}

interface GetReviewableEstimatesResponse {
  list: Review[];
  totalCount: number;
}

const getReviewableEstimates = async (params?: GetReviewableEstimatesParams): Promise<GetReviewableEstimatesResponse> => {
  const url = '/estimate/reviewable';
  try {
    const response = await client.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('🥺리뷰 목록을 가져오는 데 실패했습니다.', error);
    throw error;
  }
};

const getReviewableEstimatesServer = async (cookieHeader: string, params?: GetReviewableEstimatesParams): Promise<GetReviewableEstimatesResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) {
    queryParams.append('page', String(params.page));
  }
  const apiUrl = `${API_URL}/estimate/reviewable?${queryParams.toString()}`;

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
    console.error('SSR getReviewableEstimatesServer 실패', text);
    throw new Error(`Failed to fetch pending reviews: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const writableReviewApi = {
  getReviewableEstimates,
  getReviewableEstimatesServer,
};

export default writableReviewApi;