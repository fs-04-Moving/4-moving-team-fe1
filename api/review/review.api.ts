
import { client, errorHandler } from "@/api/client";
import { CreateReviewParams } from "@/types/dtos/review.dto";

// types/dtos/review.dto.ts에 정의해주시면 좋을듯합니다. - 조형민(2025.04.26)
// 다른 dto파일들 참고하셔서 이동 부탁드립니다. :)

// 다른 API들과 형태를 맞추기 위해 제가 리팩터링 해놓겠습니다. - 조형민(2025.04.26)
// const reviewApi = {
//   async createReview({ estimateId, content, rating }: CreateReviewParams) {
//     const response = await client.post(`/review/${estimateId}`, {
//       content,
//       star: rating, // 서버는 star 필드를 기대함
//     });

//     return response.data;
//   },
// };

// 리뷰 생성 API
const createReview = async ({ estimateId, content, rating }: CreateReviewParams) => {
  try {
    const response = await client.post(`/review/${estimateId}`, {
      content,
      star: rating,
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 특정 기사의 리뷰 목록 조회 API
const getWorkerReviews = async (workerId: string, page = 1, pageSize = 3) => {
  try {
    const url = `/review/${workerId}?page=${page}&pageSize=${pageSize}`;
    const response = await client.get(url);
    if (!response.data.list) {
      return {
        list: response.data.reviews || [],
        starCountList: response.data.starCountList || [0, 0, 0, 0, 0],
        totalCount: response.data.totalCount || 0,
        rating: response.data.rating || 0,
      };
    }

    return response.data;
  } catch (error) {
    errorHandler(error);
    // 에러 발생 시 기본 데이터 반환
    return {
      list: [],
      starCountList: [0, 0, 0, 0, 0],
      totalCount: 0,
      rating: 0,
    };
  }
};

// api/review/review.api.ts

// 기사 프로필 조회 API
const getWorkerProfile = async (workerId: string) => {
  try {
    const response = await client.get(`/profile/worker/${workerId}`);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const reviewApi = {
  createReview,
  getWorkerReviews,
  getWorkerProfile,
};

export default reviewApi;
