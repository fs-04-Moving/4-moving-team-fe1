// 🗒️작성한 리뷰 데이터 갖고오는 API

// 🍚데이터 갖고오기 실패하면 예시데이터 사용하기기
import { Review } from '@/types/dtos/review.dto';
import { client, errorHandler } from '../client'; 
import exampleReviewData from './exampleReviewData'; 

const getReviewableEstimates = async (): Promise<Review[]> => {
  const url = '/estimate/reviewable';

  try {
    const response = await client.get(url);
    console.log('백엔드에서 리뷰 목록을 성공적으로 가져왔습니다.');
    return response.data; 

  } catch (error) {
    console.error('백엔드에서 리뷰 목록을 가져오는 데 실패했습니다.ㅠㅠㅠ', error)
    console.log('백엔드 호출 실패. 🍚예시 데이터를 사용합니다.');
    return exampleReviewData;
  }
};

const reviewsApi = {
  getReviewableEstimates,
};

export default reviewsApi;

