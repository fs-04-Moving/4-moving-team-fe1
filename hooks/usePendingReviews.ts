import { useQuery } from '@tanstack/react-query';
import reviewsApi from '@/api/review/writableReview.api';
import { Review } from '@/types/dtos/review.dto';

const usePendingReviews = () => {
  const { data: reviews, isLoading, isError, error } = useQuery<Review[], Error>({
    queryKey: ['pendingReviews'],
    queryFn: reviewsApi.getReviewableEstimates,
  });

  return { reviews, isLoading, isError, error };
};

export default usePendingReviews;