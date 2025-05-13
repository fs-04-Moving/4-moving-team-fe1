import type { Metadata } from 'next';
import reviewsApi from '@/api/review/writtenReview.api';
import SubmittedReviewsClient from '@/components/templates/SubmittedReviewsClient';
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
      queryKey: ['myWrittenReviews', 1],
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