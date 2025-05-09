"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import WorkerCardInWritableReview from "@/components/organisms/WorkerCardInWritableReview";
import Pagination from "@/components/molecules/Pagination";
import EmptyWritableReview from "@/components/molecules/EmptyWritableReview";
import { Review } from "@/types/dtos/review.dto";
import ReviewRegister from "@/components/organisms/ReviewRegister";
import { ServiceType } from "@/types/move.type";
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import writableReviewApi from "@/api/review/writableReview.api";
import { useSearchParams, useRouter } from "next/navigation";
import avartation from "@/assets/images/avatartion-1.svg";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import GeneralModal from "@/components/templates/GeneralModal";

type workerData = {
  driverId: string;
  estimateId: string;
  serviceType: ServiceType;
  movingDate: Date;
  price: number;
};

function PendingReviewsClient() {
  const queryClient: QueryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingReviews", page],
    queryFn: () =>
      writableReviewApi.getReviewableEstimates({ page, pageSize: 1 }),
    // keepPreviousData: true,
  });

  const reviews = useMemo(() => reviewsData?.list || [], [reviewsData?.list]);
  const totalCount = reviewsData?.totalCount || 0;

  useEffect(() => {
    if (reviewsData) {
      console.log("불러온 리뷰 데이터:", reviewsData);
    }
  }, [reviewsData]);
  const [workerData, setWorkerData] = useState<workerData | null>(null);

  const handleWriteReview = (reviewId: string, review: any) => {
    console.log("handleWriteReview 호출됨", reviewId);

    const selected = reviews.find((review) => review.id === reviewId);
    if (selected) {
      setSelectedReview(selected);
      console.log("선택된 리뷰 정보:", selected);
      console.log("선택된 기사 정보:", selected.driver);
      setIsModalOpen(true);
      console.log("모달 열림 확인:", isModalOpen);
      setWorkerData({
        driverId: review.workerId,
        estimateId: review.id,
        movingDate: new Date(review.movingDate),
        serviceType: review.serviceType as
          | "smallMove"
          | "homeMove"
          | "officeMove",
        price: review.price,
      });
    } else {
      console.log("해당 ID의 리뷰를 찾을 수 없슴다다.");
    }
  };

  const handleCloseModal = useCallback(
    (isReviewSubmitted: boolean = false) => {
      setIsModalOpen(false);
      setSelectedReview(null);

      if (isReviewSubmitted && selectedReview?.id) {
        queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
        console.log(
          `리뷰 ID ${selectedReview.id}가 작성 완료되어 목록에서 제거됨`
        );
      }
    },
    [queryClient, selectedReview?.id, reviews]
  );

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(newPage));
    router.push(`?${newSearchParams.toString()}`);
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
    return <div>리뷰 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="bg-background-100 flex items-center justify-center">
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
        <div className="flex flex-wrap w-full justify-nomal">
          {reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-[50px] h-[370px] w-[327px] lg:h-[955px] lg:w-[656px]">
              <EmptyWritableReview text={"작성 가능한 리뷰가 없습니다."} />
            </div>
          ) : (
            reviews.map((review) => {
              return (
                <div key={review.id} className=" p-2 w-full lg:w-1/2">
                  <WorkerCardInWritableReview
                    serviceType={
                      review.serviceType as
                        | "smallMove"
                        | "homeMove"
                        | "officeMove"
                    }
                    profileImage={review.profileImage || avartation}
                    nickname={review.nickname}
                    movingDate={new Date(review.movingDate)}
                    price={review.price}
                    isReviewWritten={review.isReviewWritten}
                    onClickWriteReview={() =>
                      handleWriteReview(review.id, review)
                    }
                  />
                </div>
              );
            })
          )}
        </div>

        {totalCount > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / 1)}
            onPageChange={handlePageChange}
            className="mt-5 mb-3"
          />
        )}

        {isModalOpen &&
          selectedReview &&
          selectedReview.nickname &&
          selectedReview.id &&
          workerData && (
            <GeneralModal
              onClose={handleCloseModal}
              isOpen={isModalOpen}
            >
              {/* <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50"> */}
              <ReviewRegister
                onClose={() => handleCloseModal(true)}
                driverId={workerData.driverId}
                movingDate={workerData.movingDate}
                price={workerData.price}
                serviceType={workerData.serviceType}
                estimateId={selectedReview.id}
              />
              {/* </div> */}
            </GeneralModal>
          )}
      </div>
    </div>
  );
}

export default PendingReviewsClient;
