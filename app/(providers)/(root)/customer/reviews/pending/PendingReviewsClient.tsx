'use client';

import { useState, useCallback, useEffect } from 'react';
import WorkerCardInWritableReview from '@/components/organisms/WorkerCardInWritableReview';
import Pagination from '@/components/molecules/Pagination';
import EmptyWritableReview from '@/components/molecules/EmptyWritableReview';
import { Review } from '@/types/dtos/review.dto';
import ReviewRegister from '@/components/organisms/ReviewRegister';
import { DriverWithMeta } from '@/types/move.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import writableReviewApi from '@/api/review/writableReview.api';
import { useSearchParams, useRouter } from 'next/navigation';
import avartation from '@/assets/images/avatartion-1.svg'; // 더미 이미지

interface PendingReviewsClientProps {
  // initialReviews prop은 이제 사용하지 않습니다.
}

function PendingReviewsClient() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pendingReviews', page],
    queryFn: () => writableReviewApi.getReviewableEstimates({ page }),
    keepPreviousData: true,
  });

  const reviews = reviewsData?.list || [];
  const totalCount = reviewsData?.totalCount || 0;
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews); // 로컬 상태로 리뷰 목록 관리

  useEffect(() => {
    setLocalReviews(reviews); // reviewsData가 업데이트되면 로컬 상태 업데이트
  }, [reviews]);

  useEffect(() => {
    if (reviewsData) {
      console.log('불러온 리뷰 데이터:', reviewsData);
    }
  }, [reviewsData]);

  const handleWriteReview = (reviewId: string) => {
    const selected = localReviews.find((review) => review.id === reviewId);
    if (selected) {
      setSelectedReview(selected);
      setIsModalOpen(true);
    } else {
      console.log('해당 ID의 리뷰를 찾을 수 없습니다.');
    }
  };

  const handleCloseModal = useCallback((isReviewSubmitted: boolean = false) => {
    setIsModalOpen(false);
    setSelectedReview(null);

    if (isReviewSubmitted && selectedReview?.id) {
      // ✅ 작성 완료된 리뷰만 로컬 상태에서 제거
      setLocalReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== selectedReview.id)
      );
      // ✅ TanStack Query 캐시 무효화 (선택 사항 - 서버 데이터 재Fetch)
      queryClient.invalidateQueries(['pendingReviews']);
      console.log(`리뷰 ID ${selectedReview.id}가 작성 완료되어 목록에서 제거됨`);
    }
  }, [queryClient, setLocalReviews, selectedReview?.id]);

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(newPage));
    router.push(`?${newSearchParams.toString()}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('리뷰 데이터를 불러오는 중 오류 발생:', error);
    return <div>리뷰 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="bg-background-100 flex items-center justify-center">
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
        <div className="flex flex-wrap w-full justify-center">
          {localReviews.length === 0 ? ( // 로컬 상태 `localReviews` 사용
            <div className="w-full flex justify-center items-center h-[200px] mt-[104px]">
              <EmptyWritableReview text={'작성 가능한 리뷰가 없습니다.'} />
            </div>
          ) : (
            localReviews.map((review) => ( // 로컬 상태 `localReviews` 사용
              <div key={review.id} className="w-1/2 p-2">
                <WorkerCardInWritableReview
                  serviceType={review.serviceType}
                  profileImage={review.profileImage || avartation} // API 응답에 profileImage가 없을 경우 더미 이미지 사용
                  nickname={review.nickname}
                  movingDate={new Date(review.movingDate)}
                  price={review.price}
                  isReviewWritten={review.isReviewWritten}
                  onClickWriteReview={() => handleWriteReview(review.id)}
                />
              </div>
            ))
          )}
        </div>

        {totalCount > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / 6)}
            onPageChange={handlePageChange}
            className="mt-5 mb-3"
          />
        )}

        {isModalOpen && selectedReview && selectedReview.driver && selectedReview.estimateId && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <ReviewRegister
              onClose={() => handleCloseModal(true)}
              driver={selectedReview.driver as DriverWithMeta}
              estimateId={selectedReview.estimateId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingReviewsClient;