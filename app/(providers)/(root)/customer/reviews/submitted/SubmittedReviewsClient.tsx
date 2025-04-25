'use client'; 

import { useState } from 'react';
import WorkerCardInCompletedReview from '@/components/organisms/WorkerCardInCompletedReview';
import Pagination from '@/components/molecules/Pagination'; 
import Emptyreview from '@/components/molecules/EmptyReview';
import { Review } from '@/types/dtos/review.dto'; 

interface SubmittedReviewsClientProps {
  initialReviews: Review[]; 
}

function SubmittedReviewsClient({ initialReviews }: SubmittedReviewsClientProps) {
  
  const [reviews] = useState<Review[]>(initialReviews); 
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6; 

  // 작성한 리뷰 자세히 보기 모달 띄우기
  

  // SSP 페이지네이션 - 해당 페이지의 데이터만 서버에서 받아오게 구현할 예정
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  

  return (
    <div className="bg-background-100 flex items-center justify-center">
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
      <div className="flex flex-wrap w-full justify-center">
        {/* 작성한 리뷰가 없을때 EmptyReview 표시 */}
        {reviews.length === 0 ? (
           <div className="w-full flex justify-center items-center h-[200px] mt-[104px]">
             <Emptyreview />
           </div>
        ) : (
          currentReviews.map((review) => (
            <div key={review.id} className="w-1/2 p-2">
              <WorkerCardInCompletedReview
                serviceType={review.serviceType}
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

      {reviews.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
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