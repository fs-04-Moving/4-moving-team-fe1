import type { Metadata } from 'next';
import writableReview from '@/api/review/writableReview.api'; 
import { Review } from '@/types/dtos/review.dto'; 
import PendingReviewsClient from './PendingReviewsClient'; 

// 메타데이터 OG 넣기기
export const metadata: Metadata = {
  title: '리뷰 작성하기',
  description: '작성 가능한 이사 서비스 리뷰 목록입니다.',
};

async function getPendingReviews(): Promise<Review[]> {
  try {
    const reviews = await writableReview.getReviewableEstimates();
    return reviews;
  } catch (error) {
    console.error('Failed to fetch pending reviews:', error);
    throw new Error('리뷰 목록을 불러오는데 실패했습니다.');
  }
}

async function PendingReviewsPage() {
  let reviews: Review[] = [];
  let fetchError: Error | null = null;

  try {
    reviews = await getPendingReviews();
  } catch (error: any) {
    fetchError = error;
  }

  if (fetchError) {
    return <div>🚨에러 발생 {fetchError.message}</div>;
  }

  return <PendingReviewsClient initialReviews={reviews} />;
}

export default PendingReviewsPage;