// import type { Metadata } from 'next';
// import reviewsApi from '@/api/review/writtenReview.api'; 
// import { Review } from '@/types/dtos/review.dto'; 
// import SubmittedReviewsClient from './SubmittedReviewsClient'; 

// // 메타데이터 OG 넣기기
// export const metadata: Metadata = {
//   title: '작성한 리뷰',
//   description: '내가 작성한 리뷰들 입니다.',
// };

// async function getMyReviews(): Promise<Review[]> {
//   try {
//     const reviews = await reviewsApi.getMyWrittenReviews();
//     return reviews;
//   } catch (error) {
//     console.error('Failed to fetch written reviews:', error);
//     throw new Error('리뷰 목록을 불러오는데 실패했습니다.');
//   }
// }

// async function SubmittedReviewsPage() {
//   let reviews: Review[] = [];
//   let fetchError: Error | null = null;

//   try {
//     reviews = await getMyReviews();
//   } catch (error: any) {
//     fetchError = error;
//   }

//   if (fetchError) {
//     return <div>🚨에러 발생 {fetchError.message}</div>;
//   }

//   return <SubmittedReviewsClient initialReviews={reviews} />;
// }

// export default SubmittedReviewsPage;

import type { Metadata } from 'next';
import reviewsApi from '@/api/review/writtenReview.api';
import { Review } from '@/types/dtos/review.dto';
import SubmittedReviewsClient from './SubmittedReviewsClient';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

// 메타데이터 OG 넣기기
export const metadata: Metadata = {
  title: '작성한 리뷰',
  description: '내가 작성한 리뷰들 입니다.',
};

async function SubmittedReviewsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const { queryClient } = await handleSSRPrefetch([
    {
      queryKey: ['myWrittenReviews', 1], // 초기 페이지를 1로 설정
      queryFn: () => reviewsApi.getMyWrittenReviewsServer(cookieHeader, { page: 1 }),
    },
  ]);

  const dehydrateState = dehydrate(queryClient);
  console.log('dehydrateState for written reviews', dehydrateState);

  return (
    <HydrationBoundary state={dehydrateState}>
      <SubmittedReviewsClient />
    </HydrationBoundary>
  );
}

export default SubmittedReviewsPage;