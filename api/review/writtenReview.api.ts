// 🗒️작성한 리뷰 데이터 갖고오는 API

// 기존 데이터 갖고오는 api코드드

import { Review } from '@/types/dtos/review.dto';
import { client, errorHandler } from '../client';

const getReviewableEstimates = async (): Promise<Review[]> => {
  const url = '/estimate/reviewable';
  const response = await client.get(url);
  return response.data;
};

const reviewsApi = {
  getReviewableEstimates,
};

export default reviewsApi;


// 🍚테이터없으면 예시데이터 사용하기기
// import { Review } from '@/types/dtos/review.dto';
// import { client, errorHandler } from '../client'; 
// import exampleReviewData from './exampleReviewData'; 

// const getMyWrittenReviews = async (): Promise<Review[]> => {
//   const url = '/review';

//   try {
//     const response = await client.get(url);
//     console.log('백엔드에서 리뷰 목록을 성공적으로 가져왔습니다.');
//     return response.data; 

//   } catch (error) {
//     console.error('백엔드에서 리뷰 목록을 가져오는 데 실패했습니다.', error)
//     console.log('백엔드 호출 실패. 예시 데이터를 사용합니다.');
//     return exampleReviewData;
//   }
// };

// const reviewsApi = {
//     getMyWrittenReviews,
// };

// export default reviewsApi;


// import { Review } from '@/types/dtos/review.dto';
// import { client } from '../client';

// const getMyWrittenReviews = async (): Promise<Review[]> => {
//   const url = '/review';

//   try {
//     const response = await client.get(url);
//     console.log('백엔드에서 내가 작성한 리뷰 목록을 성공적으로 가져왔습니다.');
//     return response.data;
//   } catch (error: any) {
//     console.error('백엔드에서 내가 작성한 리뷰 목록을 가져오는 데 실패했습니다.', error);
//     if (error.response) {
//       console.error('응답 상태:', error.response.status);
//       console.error('응답 데이터:', error.response.data);
//     }
//     // 에러를 다시 던져서 상위 컴포넌트에서 처리하도록 함
//     throw error;
//   }
// };

// const reviewsApi = {
//   getMyWrittenReviews,
// };

// export default reviewsApi;