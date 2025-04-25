// 🗒️작성한 리뷰 데이터 갖고오는 API

// 🍚데이터 갖고오기 실패하면 예시시데이터 사용하기
import { Review } from '@/types/dtos/review.dto';
import { client, errorHandler } from '../client';
import exampleReviewData from './exampleReviewData';

const getReviewableEstimates = async (): Promise<Review[]> => {
  const url = '/estimate/reviewable';

  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    console.error('🥺리뷰 목록을 가져오는 데 실패했습니다.', error);
    console.log('🍚예시 데이터를 사용합니다.');
    return exampleReviewData;
  }
};

const reviewsApi = {
  getReviewableEstimates,
};

export default reviewsApi;

