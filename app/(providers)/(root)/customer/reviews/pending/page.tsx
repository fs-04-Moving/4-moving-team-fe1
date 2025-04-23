import type { Metadata } from 'next';
import writableReview from '@/api/review/writableReview.api'; 
import { Review } from '@/types/dtos/review.dto'; 
import PendingReviewsClient from './PendingReviewsClient'; 

// 메타데이터 OG 넣기
export const metadata: Metadata = {
  title: '리뷰 작성하기',
  description: '작성 가능한 이사 서비스 리뷰 목록입니다.',
  openGraph: {
    title: '이사할땐, 무빙',
    description: '작성 가능한 이사 서비스 리뷰 목록입니다.',
    //url: '현재 URL', 
    siteName: '이사할땐, 무빙', 
    type: 'website',
    images: [
      {
        url: 'https://m.luxblock.co.kr/file_data/luxblook/2020/08/17/4b0708ca352f2f903ed0ef0162bac4f2.png',
        width: 1200,
        height: 630,
        alt: '리뷰 작성하기 페이지 미리보기 이미지',
      },
    ],
  },
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