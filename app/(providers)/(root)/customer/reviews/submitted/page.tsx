import type { Metadata } from 'next';
import writtenReviewApiServer from '@/api/review/writtenReview.sever.api';
import SubmittedReviewsClient from '@/components/templates/SubmittedReviewsClient';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers'; 

export const metadata: Metadata = {
  title: '작성한 리뷰',
  description: '내가 작성한 리뷰들 입니다.',
  
  openGraph: {
    title: '이사할땐, 무빙',
    description: '내가 작성한 리뷰들 입니다.',
    siteName: '이사할땐, 무빙',
    type: 'website',
    images: [
      {
        url: 'https://i.postimg.cc/zfmnrJ0F/moving.jpg',
        width: 1017,
        height: 570,
        alt: '작성한 리뷰 페이지 미리보기 이미지',
      },
    ],
  },
};

const defaultPageParams = {
  page: 1,
  pageSize: 6,
};

async function SubmittedReviewsPage() {
  const headersList = headers();
  const cookieHeaderString = (await headersList).get('Cookie') || '';
  
  const { queryClient } = await handleSSRPrefetch([
    {
      queryKey: [
        'myWrittenReviews',
        { page: defaultPageParams.page, pageSize: defaultPageParams.pageSize },
      ],
      queryFn: () =>
        writtenReviewApiServer.getMyWrittenReviewsServer(
          cookieHeaderString,
          {
            page: defaultPageParams.page,
            pageSize: defaultPageParams.pageSize,
          }
        ),
    },
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SubmittedReviewsClient />
    </HydrationBoundary>
  );
}

export default SubmittedReviewsPage;