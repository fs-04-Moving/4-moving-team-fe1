//review.api.ts

import { client } from "@/api/client";

interface CreateReviewParams {
  estimateId: string;
  content: string;
  rating: number;
}

const reviewApi = {
  async createReview({ estimateId, content, rating }: CreateReviewParams) {
    const response = await client.post(`/review/${estimateId}`, {
      content,
      star: rating, // 서버는 star 필드를 기대함
    });

    return response.data;
  },
};

export default reviewApi;
