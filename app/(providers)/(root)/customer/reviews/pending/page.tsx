import type { Metadata } from 'next';
import writableReviewApi from '@/api/review/writableReview.api';
import { Review } from '@/types/dtos/review.dto';
import PendingReviewsClient from './PendingReviewsClient';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

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

async function PendingReviewsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const { queryClient } = await handleSSRPrefetch([
    {
      queryKey: ['pendingReviews'],
      queryFn: () => writableReviewApi.getReviewableEstimatesServer(cookieHeader),
    },
  ]);

  const dehydrateState = dehydrate(queryClient);
  console.log('dehydrateState', dehydrateState);

  return (
    <HydrationBoundary state={dehydrateState}>
      <PendingReviewsClient />
    </HydrationBoundary>
  );
}

export default PendingReviewsPage;