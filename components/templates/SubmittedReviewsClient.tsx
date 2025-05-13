'use client';

import { useEffect } from 'react';
import WorkerCardInCompletedReview from '@/components/organisms/WorkerCardInCompletedReview';
import Pagination from '@/components/molecules/Pagination';
import { Review } from '@/types/dtos/review.dto'; 
import { ServiceType } from '@/types/move.type'; 
import { useQuery } from '@tanstack/react-query';
import reviewsApi from '@/api/review/writtenReview.api'; 
import { useSearchParams, useRouter, usePathname } from 'next/navigation'; 
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import useDeviceSize from '@/hooks/useDeviceSize'; 
import EmptyListMessage from "../molecules/EmptyListMessage"; 

function SubmittedReviewsClient() {
  const router = useRouter();
  const pathname = usePathname(); 
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { isDeskTop } = useDeviceSize();
  const pageSize = isDeskTop ? 6 : 4; 

  const {
    data: reviewsData, 
    isLoading, 
    isFetching, 
    isError,
    error,
  } = useQuery<{ list: Review[]; totalCount: number }, Error>({ 
    queryKey: ['myWrittenReviews', { page, pageSize }], 
    queryFn: () => reviewsApi.getMyWrittenReviews({ page, pageSize }), 
   
    placeholderData: (previousData) => previousData, 
  });

  const reviews = reviewsData?.list || [];
  const totalCount = reviewsData?.totalCount || 0;
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0;

  useEffect(() => {
    if (reviewsData) {
      console.log('작성한 리뷰 데이터:', reviewsData);
    }
  }, [reviewsData]);

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set("page", String(newPage));
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`); 
  };

  if (isLoading && !isFetching) { 
    return (
      <div className="bg-background-100 flex items-center justify-center h-screen">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (isError) {
    console.error('작성한 리뷰 데이터를 불러오는 중 오류 발생:', error);
    return (
        <div className="bg-background-100 flex items-center justify-center h-screen">
            <div className="text-red-600">🥺 작성한 리뷰 목록을 불러오는 데 실패했습니다: {error.message}</div>
        </div>
    );
  }

  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="bg-background-100 flex items-center justify-center"> 
        <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
          {isFetching && ( 
            <div className="text-center text-gray-500 my-4">데이터 업데이트 중...</div>
          )}
          <div className="flex flex-wrap w-full justify-center lg:justify-start pt-2"> 
            {reviews.length === 0 && !isFetching ? ( 
              <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]"> 
                <EmptyListMessage message="작성한 리뷰가 없습니다." />
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="pt-8 lg:pt-10 lg:pr-3 w-full lg:w-1/2 flex justify-center"> 
                  <WorkerCardInCompletedReview
                    serviceType={review.serviceType as ServiceType} 
                    profileImage={review.profileImage}
                    nickname={review.nickname}
                    movingDate={new Date(review.movingDate)}
                    price={review.price}
                    content={review.content}
                    createdAt={new Date(review.createdAt)}
                    rating={review.star} 
                  />
                </div>
              ))
            )}
          </div>
          <div className="mt-6 mb-[65px] lg:mt-6 lg:mb-[65px]">
            {totalCount > 0 && totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8 mb-8" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedReviewsClient;