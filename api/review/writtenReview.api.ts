// 🗒️작성한 리뷰 데이터 갖고오는 API

import { Review } from '@/types/dtos/review.dto';
import { client } from '../client';

interface GetMyWrittenReviewsParams {
 page?: number;
 pageSize?: number;
}

interface GetMyWrittenReviewsResponse {
 list: Review[];
 totalCount: number;
}

const getMyWrittenReviews = async (params?: GetMyWrittenReviewsParams) => {
 const url = '/review';
 try {
  const response = await client.get<GetMyWrittenReviewsResponse>(url, { params }); 
  console.log('클라이언트 API: 백엔드에서 리뷰 목록을 성공적으로 가져왔습니다.');
  return response.data; 
 } catch (error) {
  console.error('클라이언트 API: 백엔드에서 리뷰 목록을 가져오는 데 실패했습니다ㅠㅠㅠ', error);

  throw error; 
 }
};

const reviewsApi = {
 getMyWrittenReviews,

};

export default reviewsApi;