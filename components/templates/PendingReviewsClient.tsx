'use client';

import { useState, useCallback, useEffect, useMemo } from "react";
import WorkerCardInWritableReview from "@/components/organisms/WorkerCardInWritableReview";
import Pagination from "@/components/molecules/Pagination"; 
import { Review } from "@/types/dtos/review.dto"; 
import ReviewRegister from "@/components/organisms/ReviewRegister"; 
import { ServiceType } from "@/types/move.type"; 
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import writableReviewApi from "@/api/review/writableReview.api"; 
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/components/atoms/LoadingSpinner"; 
import GeneralModal from "@/components/templates/GeneralModal"; 
import useDeviceSize from "@/hooks/useDeviceSize"; 
import EmptyListMessage from "../molecules/EmptyListMessage";

type workerData = {
  driverId: string;
  estimateId: string; 
  serviceType: ServiceType;
  movingDate: Date; 
  price: number; 
};

interface GetReviewableEstimatesResponse {
  list: Review[]; 
  totalCount: number; 
} 

function PendingReviewsClient() {
  const queryClient: QueryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); 
  
  const page = parseInt(searchParams.get("page") || "1", 10);

  const {isDeskTop} = useDeviceSize();
  const pageSize = isDeskTop ? 6 : 4;
 
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workerData, setWorkerData] = useState<workerData | null>(null); 

  const {
    data: reviewsData,
    isLoading, 
    isFetching, 
    isError,
    error,
  } = useQuery<GetReviewableEstimatesResponse, Error>({ 
    queryKey: ["pendingReviews", { page, pageSize }],
    queryFn: () =>
      writableReviewApi.getReviewableEstimates({ page, pageSize }),
    placeholderData: (previousData) => previousData,
  });

  const reviews = useMemo(() => reviewsData?.list || [], [reviewsData?.list]);
  const totalCount = reviewsData?.totalCount || 0;

  useEffect(() => {
    if (reviewsData) {
      console.log("불러온 리뷰 데이터:", reviewsData);
    }
  }, [reviewsData]);
  const handleWriteReview = (reviewId: string) => {
    console.log("handleWriteReview 호출됨", reviewId);

    const selected = reviews.find((review) => review.id === reviewId);

    if (selected) {
      setSelectedReview(selected); 
      console.log("선택된 리뷰 정보:", selected);

      
      setWorkerData({
        driverId: selected.workerId, 
        estimateId: selected.id,     
        movingDate: new Date(selected.movingDate), 
        serviceType: selected.serviceType as ServiceType,
        price: selected.price,
      });

      setIsModalOpen(true); 
      console.log("모달 열림 확인");

    } else {
      console.log(`해당 ID(${reviewId})의 리뷰를 현재 페이지 목록에서 찾을 수 없습니다.`);
    }
  };

  const handleCloseModal = useCallback(
    (isReviewSubmitted: boolean = false) => {
      setIsModalOpen(false);
      setSelectedReview(null); 
      setWorkerData(null); 

      if (isReviewSubmitted) {
        queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
        console.log("리뷰 작성 완료, 펜딩리뷰 쿼리 무효화");
      }
    },
    [queryClient]
  );

  const handlePageChange = (newPage: number) => {
    
    const current = new URLSearchParams(searchParams.toString());
    current.set("page", String(newPage));
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
    
  };

  if (isLoading) {
    return (
      <div className="bg-background-100 flex items-center justify-center h-screen">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (isError) {
    console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    return (
        <div className="bg-background-100 flex items-center justify-center h-screen">
           <div className="text-red-600">🥺리뷰 목록을 불러오기기 실패: {error.message}</div>
        </div>
    );
  }

  return (
    <div className="bg-BackGround-200 min-h-full">
    <div className="bg-background-200 flex items-center justify-center"> 
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px] "> 
        {isFetching && !isLoading && (
            <div className="text-center text-gray-500 mb-4">데이터 업데이트 중...</div>
        )}

        <div className="flex flex-wrap w-full justify-center lg:justify-start">
          {reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]"> 
              <EmptyListMessage message="작성 가능한 리뷰가 없습니다." />
            </div>
          ) : (
            
            reviews.map((review) => {
              return (
                <div key={review.id} className=" p-2 w-full lg:w-1/2 flex justify-center"> 
                  <WorkerCardInWritableReview
                    serviceType={review.serviceType as ServiceType}
                    profileImage={review.profileImage}
                    nickname={review.nickname}
                    movingDate={new Date(review.movingDate)}
                    price={review.price}
                    isReviewWritten={review.isReviewWritten}
                    onClickWriteReview={() => handleWriteReview(review.id)}
                  />
                </div>
              );
            })
          )}
        </div>

        {totalCount > 0 && Math.ceil(totalCount / pageSize) > 1 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / pageSize)}
            onPageChange={handlePageChange}
            className="mt-8 mb-8" 
          />
        )}

        {isModalOpen && selectedReview && workerData && (
            <GeneralModal
              onClose={() => handleCloseModal(false)}
              isOpen={isModalOpen}
            >
            
              <ReviewRegister
                onClose={() => handleCloseModal(true)}
                driverId={workerData.driverId}
                movingDate={workerData.movingDate}
                price={workerData.price}
                serviceType={workerData.serviceType}
                estimateId={workerData.estimateId} 
              />
            </GeneralModal>
        )}
      </div>
    </div>
    </div>
  );
}

export default PendingReviewsClient;