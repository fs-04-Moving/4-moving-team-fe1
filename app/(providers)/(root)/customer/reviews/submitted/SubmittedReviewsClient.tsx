'use client';

import { useEffect } from 'react';
import WorkerCardInCompletedReview from '@/components/organisms/WorkerCardInCompletedReview';
import Pagination from '@/components/molecules/Pagination';
import EmptyReview from '@/components/molecules/EmptyReview';
import { Review } from '@/types/dtos/review.dto';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import reviewApi from '@/api/review/review.api';

interface SubmittedReviewsClientProps {
  initialReviews?: Review[];
}

function SubmittedReviewsClient({ initialReviews }: SubmittedReviewsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['myWrittenReviews', page],
    queryFn: () => reviewApi.getMyWrittenReviews({ page }),
    initialData: { list: initialReviews || [], totalCount: initialReviews?.length || 0 },
  });

  const reviews: Review[] = reviewsData?.list || initialReviews || [];
  const totalCount = reviewsData?.totalCount || initialReviews?.length || 0;
  const totalPages = Math.ceil(totalCount / 6);

  useEffect(() => {
    if (reviewsData) {
      console.log('작성한 리뷰 데이터:', reviewsData);
    }
  }, [reviewsData]);

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(newPage));
    router.push(`?${newSearchParams.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="bg-background-100 flex items-center justify-center h-screen">
        <LoadingSpinner size="md" /> {/* LoadingSpinner 컴포넌트 사용 */}
      </div>
    );
  }

  if (isError) {
    console.error('작성한 리뷰 데이터를 불러오는 중 오류 발생:', error);
    return <div>작성한 리뷰 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="bg-background-100 flex items-center justify-center">
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
        <div className="flex flex-wrap w-full justify-nomal">
          {reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-[50px] h-[370px] lg:h-[955px]">
              <EmptyReview />
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-2 w-full lg:w-1/2">
                <WorkerCardInCompletedReview
                  serviceType={review.serviceType as 'smallMove' | 'homeMove' | 'officeMove'}
                  profileImage={review.profileImage}
                  nickname={review.nickname}
                  movingDate={new Date(review.movingDate)}
                  price={review.price}
                  content={review.content}
                  createdAt={new Date(review.createdAt)}
                  rating={review.rating}
                />
              </div>
            ))
          )}
        </div>

        {totalCount > 0 && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-5 mb-3"
          />
        )}
      </div>
    </div>
  );
}

export default SubmittedReviewsClient;
