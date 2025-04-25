'use client';

import { useState, useCallback } from 'react';
import WorkerCardInWritableReview from '@/components/organisms/WorkerCardInWritableReview';
import Pagination from '@/components/molecules/Pagination';
import EmptyWritableReview from '@/components/molecules/EmptyWritableReview';
import { Review } from '@/types/dtos/review.dto';
import ReviewRegister from '@/components/organisms/ReviewRegister';
import { DriverWithMeta } from '@/types/move.type';

interface PendingReviewsClientProps {
  initialReviews: Review[];
}

function PendingReviewsClient({ initialReviews }: PendingReviewsClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  const handleWriteReview = (reviewId: string) => {
    console.log('이 아이디의 리뷰를 요청했다구:', reviewId);
    const selected = reviews.find((review) => review.id === reviewId);
    // if (selected) {
    //   setSelectedReview(selected);
    //   setIsModalOpen(true);
    // }
    if (selected) {
      console.log('선택된 리뷰:', selected);
      setSelectedReview(selected);
      console.log('selectedReview 상태 업데이트:', selected);
      setIsModalOpen(true);
      console.log('isModalOpen 상태 업데이트:', true);
    } else {
      console.log('해당 ID의 리뷰를 찾을 수 없습니다.');
    }
  };

  // 모달 닫기 및 리뷰 완료 처리 - 작성완료하면 목록에서 제거거
  const handleCloseModal = useCallback((isReviewSubmitted: boolean = false) => {
    setIsModalOpen(false);
    setSelectedReview(null); 

    if (isReviewSubmitted && selectedReview?.id) {
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== selectedReview.id));
      console.log(`리뷰 ID ${selectedReview.id}가 작성 완료되어 목록에서 제거됨됨`);
    }
  }, [setReviews, selectedReview?.id]);

  // 페이지네이션
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // ✅리뷰 제출시 스피너 달기

  return (
    <div className="bg-background-100 flex items-center justify-center">
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
        <div className="flex flex-wrap w-full justify-center">
          {/* 작성 가능한 리뷰가 없을때 EmptyWritableReview 표시 */}
          {reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center h-[200px] mt-[104px]">
              <EmptyWritableReview />
            </div>
          ) : (
            currentReviews.map((review) => (
              <div key={review.id} className="w-1/2 p-2">
                <WorkerCardInWritableReview
                  serviceType={review.serviceType}
                  profileImage={review.profileImage}
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

        {/* 페이지네이션 컴포넌트 - 리뷰가 있고 총 페이지 수가 1보다 클 때만 표시 */}
        {reviews.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-5 mb-3"
          />
        )}

        {/* 리뷰 작성 모달 */}
        {isModalOpen && selectedReview && selectedReview.driver && selectedReview.estimateId && (
          <ReviewRegister
            onClose={() => handleCloseModal(true)}
            driver={selectedReview.driver as DriverWithMeta}
            estimateId={selectedReview.estimateId}
          />
        )}
      </div>
    </div>
  );
}

export default PendingReviewsClient;