// 🗒️작성가능한 이사견적 데이터 갖고오는 API

import { Review } from '@/types/dtos/review.dto';
import { client } from '../client';

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


const writableReviewApi = {
  getReviewableEstimates,
};

export default writableReviewApi;