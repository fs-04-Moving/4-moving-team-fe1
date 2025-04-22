// 'use client';

// import { useState } from 'react';
// import ReviewCard from '@/components/organisms/ReviewCard';
// import type { Metadata } from 'next';
// import Pagination from '@/components/molecules/Pagination';
// import { ClipLoader } from 'react-spinners';
// import usePendingReviews from '@/hooks/usePendingReviews';
// import EmptyReview from '@/components/molecules/EmptyReview';

// function SubmittedReviewsPage() {
//   const { data: reviews = [], isLoading, isError, error } = usePendingReviews();
//   const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 6;

//   const handleWriteReview = (reviewId: string) => {
//     setSelectedReviewId(reviewId);
//     setIsModalOpen(true);
//   };

//   const handleReviewSubmit = (reviewData: any) => {
//     setIsModalOpen(false);
//     // 리뷰 제출 로직
//   };

//   const indexOfLastReview = currentPage * reviewsPerPage;
//   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
//   const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <ClipLoader color="#4da9ff" loading={isLoading} size={50} />
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>에러가 발생했습니다: {error.message}</div>;
//   }

//   return (
//     <div className="bg-backgrounf-100 flex flex-col items-center justify-center"> 
//       <div className="flex flex-wrap w-full justify-center"> 
//         {currentReviews.length === 0 ? (
//           <div className="w-full flex justify-center items-center h-[200px] mt-[104px]">
//             <EmptyReview />
//           </div>
//         ) : (
//           currentReviews.map((review) => (
//             <div key={review.id} className="w-1/2 p-2">
//               <WorkerCardInWritableReview
//                 serviceType={review.serviceType}
//                 workerProfileImage={review.workerProfileImage}
//                 workerNickname={review.workerNickname}
//                 movingDate={new Date(review.movingDate)}
//                 price={review.price}
//                 isReviewWritten={review.isReviewWritten}
//                 onClickWriteReview={() => handleWriteReview(review.id)}
//               />
//             </div>
//           ))
//         )}
//       </div>
//       {currentReviews.length > 0 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(reviews.length / reviewsPerPage)}
//           onPageChange={handlePageChange}
//           className="mt-5 mb-3"
//         />
//       )}
//       {isModalOpen && (
//         <ReviewModal
//           reviewId={selectedReviewId}
//           onSubmit={handleReviewSubmit}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default SubmittedReviewsPage;


import type { Metadata } from 'next';
import reviewsApi from '@/api/review/writtenReview.api'; 
import { Review } from '@/types/dtos/review.dto'; 
import SubmittedReviewsClient from './SubmittedReviewsClient'; 

// 메타데이터 OG 넣기기
export const metadata: Metadata = {
  title: '작성한 리뷰',
  description: '내가 작성한 리뷰들 입니다.',
};

async function getMyReviews(): Promise<Review[]> {
  try {
    const reviews = await reviewsApi.getMyWrittenReviews();
    return reviews;
  } catch (error) {
    console.error('Failed to fetch written reviews:', error);
    throw new Error('리뷰 목록을 불러오는데 실패했습니다.');
  }
}

async function SubmittedReviewsPage() {
  let reviews: Review[] = [];
  let fetchError: Error | null = null;

  try {
    reviews = await getMyReviews();
  } catch (error: any) {
    fetchError = error;
  }

  if (fetchError) {
    return <div>🚨에러 발생 {fetchError.message}</div>;
  }

  return <SubmittedReviewsClient initialReviews={reviews} />;
}

export default SubmittedReviewsPage;