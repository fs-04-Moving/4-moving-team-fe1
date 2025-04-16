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