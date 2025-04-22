'use client';

import { useState } from 'react';
import WorkerCardInWritableReview from '@/components/organisms/WorkerCardInWritableReview';
import Pagination from '@/components/molecules/Pagination'; 
import EmptyWritableReview from '@/components/molecules/EmptyWritableReview';
import { Review } from '@/types/dtos/review.dto'; 

interface PendingReviewsClientProps {
  initialReviews: Review[]; 
}

function PendingReviewsClient({ initialReviews }: PendingReviewsClientProps) {
  
  const [reviews] = useState<Review[]>(initialReviews); 
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6; 

  // 리뷰 작성 하기 버튼 클릭 핸들러
  const handleWriteReview = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true); 
  };
// 제출하면 제출되었다는 팝업모달 뜨게하기기
  
  const handleReviewSubmit = (reviewData: any) => {
    console.log('Review submitted:', reviewData);
    setIsModalOpen(false);
  };

  // 페이지네이션 
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  // 리뷰 제출시 스피너 달기기

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

      {/* 리뷰 작성 모달 - Placeholder */}
      {isModalOpen && (
        <ReviewModal
          reviewId={selectedReviewId}
          onSubmit={handleReviewSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      </div>
    </div>
  );
}

export default PendingReviewsClient;