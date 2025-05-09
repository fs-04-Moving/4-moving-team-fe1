'use client';

import reviewApi from '@/api/review/review.api';
import Pagination from '@/components/molecules/Pagination';
import ChartStarRatingReview from '@/components/organisms/ChartStarRatingReview';
import ReviewCard from '@/components/organisms/ReviewCard';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// 백엔드 API 응답 타입 정의
interface Review {
  id: string;
  customerId: string;
  workerId: string;
  star: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  customerEmail: string;
}

interface ReviewsResponse {
  list: Review[];
  starCountList: number[];
  totalCount: number;
  rating: number;
}

interface ReviewCardListProps {
  workerId: string;
  initialPage?: number;
  itemsPerPage?: number;
}
function ReviewCardList({ workerId, initialPage = 1, itemsPerPage = 3 }: ReviewCardListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // useQuery를 사용하여 리뷰 데이터 가져오기
  const { data, isLoading, error } = useQuery<ReviewsResponse>({
    queryKey: ['workerReviews', workerId, currentPage, itemsPerPage],
    queryFn: () => reviewApi.getWorkerReviews(workerId, currentPage, itemsPerPage),
    enabled: !!workerId, // workerId가 있을 때만 쿼리 실행
  });

  const reviewData = data?.list || [];
  const starCountList = data?.starCountList || [0, 0, 0, 0, 0];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    console.error('리뷰 데이터 가져오기 실패:', error);
    return (
      <div className="py-8 text-center text-red-500">
        <p>리뷰 데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <div className="loader">로딩 중...</div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">리뷰 ({totalCount})</h2>

      {/* 별점 차트 */}
      {totalCount > 0 && (
        <div className="mb-8">
          <ChartStarRatingReview ratingData={starCountList} />
        </div>
      )}

      {reviewData && reviewData.length > 0 ? (
        <div>
          {/* 리뷰 카드 목록 */}
          <div className="space-y-4">
            {reviewData.map((review) => (
              <ReviewCard
                key={review.id}
                customerEmail={review.customerEmail}
                // 닉네임 데이터 백앤드에서 리턴을 안해주는거 같음 일단 별처리
                rating={review.star}
                content={review.content}
                createdAt={new Date(review.createdAt)}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-5 mb-3"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>아직 작성된 리뷰가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default ReviewCardList;
