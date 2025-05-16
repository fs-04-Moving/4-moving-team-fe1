import type { Metadata } from 'next';
import PendingReviewsClient from '@/components/templates/PendingReviewsClient';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import writableReviewApiServer from '@/api/review/writableReview.server.api';

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
        url: 'https://i.postimg.cc/zfmnrJ0F/moving.jpg',
        width: 1017,
        height: 570,
        alt: '리뷰 작성하기 페이지 미리보기 이미지',
      },
    ],
  },
};

const defaultPageParams = {
  page: 1,
  pageSize: 6, 
};

async function PendingReviewsPage() {

  const { queryClient } = await handleSSRPrefetch([
    {
      queryKey: [
        'pendingReviews', 
        { page: defaultPageParams.page, pageSize: defaultPageParams.pageSize }
      ],
      queryFn: () => 
        writableReviewApiServer.getReviewableEstimatesServer({
          page: defaultPageParams.page,
          pageSize: defaultPageParams.pageSize,}),
    },
  ]);

  const dehydratedState = dehydrate(queryClient); 

  return (
    <HydrationBoundary state={dehydratedState}> 
      <PendingReviewsClient />
    </HydrationBoundary>
  );
}

export default PendingReviewsPage;