// "use client";

// import { useState, useCallback, useEffect, useMemo } from "react";
// import WorkerCardInWritableReview from "@/components/organisms/WorkerCardInWritableReview";
// import Pagination from "@/components/molecules/Pagination";
// import EmptyWritableReview from "@/components/molecules/EmptyWritableReview";
// import { Review } from "@/types/dtos/review.dto";
// import ReviewRegister from "@/components/organisms/ReviewRegister";
// import { ServiceType } from "@/types/move.type";
// import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
// import writableReviewApi from "@/api/review/writableReview.api";
// import { useSearchParams, useRouter } from "next/navigation";
// import avartation from "@/assets/images/avatartion-1.svg";
// import LoadingSpinner from "@/components/atoms/LoadingSpinner";
// import GeneralModal from "@/components/templates/GeneralModal";
// import useDeviceSize from "@/hooks/useDeviceSize";

// // type workerData = {
// //   driverId: string;
// //   estimateId: string;
// //   serviceType: ServiceType;
// //   movingDate: Date;
// //   price: number;
// // };

// function PendingReviewsClient() {
//   const queryClient: QueryClient = useQueryClient();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const [selectedReview, setSelectedReview] = useState<Review | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeskTop, isMobile, isTablet] = useDeviceSize()
//   const [pageSize, setPageSize] = useState(isDeskTop?6:4)
//   const {
//     data: reviewsData,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["pendingReviews", page,pageSize],
//     queryFn: () =>
//       writableReviewApi.getReviewableEstimates({ page, pageSize }),
//     // keepPreviousData: true,
//   });

//   const reviews = useMemo(() => reviewsData?.list || [], [reviewsData?.list]);
//   const totalCount = reviewsData?.totalCount || 0;

//   useEffect(() => {
//     if (reviewsData) {
//       console.log("불러온 리뷰 데이터:", reviewsData);
//     }
//   }, [reviewsData]);
//   const [workerData, setWorkerData] = useState<workerData | null>(null);

//   const handleWriteReview = (reviewId: string, review: any) => {
//     console.log("handleWriteReview 호출됨", reviewId);

//     const selected = reviews.find((review) => review.id === reviewId);
//     if (selected) {
//       setSelectedReview(selected);
//       console.log("선택된 리뷰 정보:", selected);
//       console.log("선택된 기사 정보:", selected.driver);
//       setIsModalOpen(true);
//       console.log("모달 열림 확인:", isModalOpen);
//       setWorkerData({
//         driverId: review.workerId,
//         estimateId: review.id,
//         movingDate: new Date(review.movingDate),
//         serviceType: review.serviceType as
//           | "smallMove"
//           | "homeMove"
//           | "officeMove",
//         price: review.price,
//       });
//     } else {
//       console.log("해당 ID의 리뷰를 찾을 수 없슴다다.");
//     }
//   };

//   const handleCloseModal = useCallback(
//     (isReviewSubmitted: boolean = false) => {
//       setIsModalOpen(false);
//       setSelectedReview(null);

//       if (isReviewSubmitted && selectedReview?.id) {
//         queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
//         console.log(
//           `리뷰 ID ${selectedReview.id}가 작성 완료되어 목록에서 제거됨`
//         );
//       }
//     },
//     [queryClient, selectedReview?.id, reviews]
//   );

//   const handlePageChange = (newPage: number) => {
//     const newSearchParams = new URLSearchParams(searchParams.toString());
//     newSearchParams.set("page", String(newPage));
//     router.push(`?${newSearchParams.toString()}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-background-100 flex items-center justify-center h-screen">
//         <LoadingSpinner size="md" />
//       </div>
//     );
//   }

//   if (isError) {
//     console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
//     return <div>리뷰 목록을 불러오는 데 실패했습니다.</div>;
//   }

//   return (
//     <div className="bg-background-100 flex items-center justify-center">
//       <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px]">
//         <div className="flex flex-wrap w-full justify-nomal">
//           {reviews.length === 0 ? (
//             <div className="w-full flex justify-center items-center mt-[50px] h-[370px] w-[327px] lg:h-[955px] lg:w-[656px]">
//               <EmptyWritableReview text={"작성 가능한 리뷰가 없습니다."} />
//             </div>
//           ) : (
//             reviews.map((review) => {
//               return (
//                 <div key={review.id} className=" p-2 w-full lg:w-1/2">
//                   <WorkerCardInWritableReview
//                     serviceType={
//                       review.serviceType as
//                         | "smallMove"
//                         | "homeMove"
//                         | "officeMove"
//                     }
//                     profileImage={review.profileImage || avartation}
//                     nickname={review.nickname}
//                     movingDate={new Date(review.movingDate)}
//                     price={review.price}
//                     isReviewWritten={review.isReviewWritten}
//                     onClickWriteReview={() =>
//                       handleWriteReview(review.id, review)
//                     }
//                   />
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {totalCount > 0 && (
//           <Pagination
//             currentPage={page}
//             totalPages={Math.ceil(totalCount / 6)}
//             onPageChange={handlePageChange}
//             className="mt-5 mb-3"
//           />
//         )}

//         {isModalOpen &&
//           selectedReview &&
//           selectedReview.nickname &&
//           selectedReview.id &&
//           workerData && (
//             <GeneralModal
//               onClose={handleCloseModal}
//               isOpen={isModalOpen}
//             >
//               {/* <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50"> */}
//               <ReviewRegister
//                 onClose={() => handleCloseModal(true)}
//                 driverId={workerData.driverId}
//                 movingDate={workerData.movingDate}
//                 price={workerData.price}
//                 serviceType={workerData.serviceType}
//                 estimateId={selectedReview.id}
//               />
//               {/* </div> */}
//             </GeneralModal>
//           )}
//       </div>
//     </div>
//   );
// }

// export default PendingReviewsClient;

'use client';

import { useState, useCallback, useEffect, useMemo } from "react";
import WorkerCardInWritableReview from "@/components/organisms/WorkerCardInWritableReview";
import Pagination from "@/components/molecules/Pagination"; 
import EmptyWritableReview from "@/components/molecules/EmptyWritableReview"; 
import { Review } from "@/types/dtos/review.dto"; 
import ReviewRegister from "@/components/organisms/ReviewRegister"; 
import { ServiceType } from "@/types/move.type"; 
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import writableReviewApi from "@/api/review/writableReview.api"; 
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/components/atoms/LoadingSpinner"; 
import GeneralModal from "@/components/templates/GeneralModal"; 
import useDeviceSize from "@/hooks/useDeviceSize"; 


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


interface Review {
    id: string; 
    workerId: string; 
    serviceType: ServiceType; 
    movingDate: string; 
    price: number; 
    profileImage?: string; 
    nickname: string; 
    isReviewWritten: boolean; 
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

  // 후기 작성 버튼 클릭 핸들러
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
        serviceType: selected.serviceType,
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
        console.log("리뷰 작성 완료, 펜딩리뷰뷰 쿼리 무효화");
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
    <div className="bg-background-100 flex items-center justify-center"> 
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px] "> 
        {isFetching && !isLoading && (
            <div className="text-center text-gray-500 mb-4">데이터 업데이트 중...</div>
        )}

        <div className="flex flex-wrap w-full justify-center lg:justify-start">
          {reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]"> 
              <EmptyWritableReview text={"작성 가능한 리뷰가 없습니다."} />
            </div>
          ) : (
            
            reviews.map((review) => {
              return (
                <div key={review.id} className=" p-2 w-full lg:w-1/2 flex justify-center"> 
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

        {/* 후기 작성/수정 모달 */}
        {/* 모달이 열려있고, 선택된 리뷰와 workerData가 있을 때만 렌더링 */}
        {isModalOpen && selectedReview && workerData && (
            <GeneralModal
              onClose={() => handleCloseModal(false)}
              isOpen={isModalOpen}
            >
               {/* ReviewRegister 컴포넌트 */}
               {/* ReviewRegister 내부에서 후기 제출 완료 시 handleCloseModal(true) 호출 필요 */}
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
  );
}

export default PendingReviewsClient;