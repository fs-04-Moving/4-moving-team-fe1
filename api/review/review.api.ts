
import { client, errorHandler } from "@/api/client";
import { CreateReviewParams } from "@/types/dtos/review.dto";

// types/dtos/review.dto.ts에 정의해주시면 좋을듯합니다. - 조형민(2025.04.26)
// 다른 dto파일들 참고하셔서 이동 부탁드립니다. :)
// 김형준 : 넵
const createReview = async ({
  estimateId,
  content,
  rating,
}: CreateReviewParams) => {
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
const getWorkerReviews = async (workerId: string) => {
  try {
    const url = `/review/${workerId}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
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
