// 'use client';

// import favoriteApi from '@/api/favorite/favorite.api';
// import ROUTES from '@/constants/routes';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// // import { useState } from 'react';
// import useDeviceSize from '@/hooks/useDeviceSize';
// import { useEffect, useState } from 'react';
// import Label from '../atoms/Label';
// import SkeletonFavoriteList from '../atoms/SkeletonFavoriteList';
// import EmptyListMessage from '../molecules/EmptyListMessage';
// import Pagination from '../molecules/Pagination';
// import WorkerCardInLiked, { WorkerCardInLikedProps } from './WorkerCardInLiked';

// export const PAGE_SIZE_DESKTOP = 6; // 데스크탑에서 한 페이지에 보여줄 목록 수
// export const PAGE_SIZE_MOBILE = 4; // 모바일에서 한 페이지에 보여줄 목록 수

// function ListFavoriteWorker() {
//   // const [page, setPage] = useState(1);
//   // const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP); // 디바이스 감지 후 설정됨
//   const [pagination, setPagination] = useState({ page: 1, pageSize: PAGE_SIZE_DESKTOP });
//   const { isDeskTop } = useDeviceSize();

//   // 최신 page, pageSize를 안전하게 참조하기 위한 ref
//   // const pageRef = useRef(page);
//   // const pageSizeRef = useRef(pageSize);

//   // deviceSize변경으로 pageSize가 바뀔 경우의 문제 대응
//   // e.g. 데이터가 5개일 경우 모바일에서 2페이지를 보고 있다가 데스크탑으로 전환되면 2페이지에 데이터가 없음
//   useEffect(() => {
//     // // 새로운 pageSize 결정
//     // const newPageSize = isDeskTop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE;

//     // // 현재 페이지에서 보고 있던 첫 데이터의 인덱스
//     // const currentItemStartIndex = (pageRef.current - 1) * pageSizeRef.current;

//     // // 새 page 계산
//     // const newPage = Math.floor(currentItemStartIndex / newPageSize) + 1;

//     // // ref 업데이트
//     // pageRef.current = newPage;
//     // pageSizeRef.current = newPageSize;
//     const newPageSize = isDeskTop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE;
//     const currentItemStartIndex = (pagination.page - 1) * pagination.pageSize;
//     const newPage = Math.floor(currentItemStartIndex / newPageSize) + 1;
//     // setPageSize(newPageSize);
//     // setPage(newPage);
//     // ✅ state를 batching 하여 한번에 변경
//     // setPageSize(() => {
//     //   setPage(newPage);
//     //   return newPageSize;
//     // });
//     setPagination({ page: newPage, pageSize: newPageSize });

//     // 불필요한 리렌더링 혹은 무한 루프 발생 가능성때문에 page, pageSize를 그냥 사용하지 않고 ref로 관리
//   }, [isDeskTop]);

//   /**
//    * @description
//    * 찜한 기사님 목록 조회 API
//    * CSR 시 디바이스별 pageSize에 따라 호출됨
//    * placeholderData를 통해 이전 페이지 데이터를 유지하여 깜빡임 방지
//    */
//   const {
//     data: favorites,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['favorites', pagination],
//     queryFn: () => {
//       console.log('클라이언트 favorites 쿼리 실행됨!');
//       return favoriteApi.getFavoriteWorkers(pagination);
//     },
//     placeholderData: (prev) => prev, // keepPreviousData 대체
//   });

//   const router = useRouter();

//   const handleClickCard = (workerId: string) => {
//     router.push(ROUTES.WORKER.DETAIL(workerId));
//   };

//   if (isLoading) return <SkeletonFavoriteList />;
//   if (isError || !favorites) return <div>오류 발생!</div>;

//   const totalPages = Math.ceil(favorites.totalCount / pagination.pageSize);
//   console.log('render!!!');

//   return (
//     <div className="bg-BackGround-200 min-h-full">
//       <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
//         <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
//           <Label intent="md">찜한 기사님</Label>
//         </div>
//       </div>
//       {favorites.totalCount === 0 ? (
//         <EmptyListMessage message="찜한 기사님이 없습니다." />
//       ) : (
//         <>
//           <div className="flex justify-center">
//             <div className="md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row flex-wrap gap-x-6 gap-y-6 md:gap-y-8 lg:gap-y-12">
//               {favorites.list.map((worker: WorkerCardInLikedProps) => {
//                 return (
//                   <div
//                     key={worker.id}
//                     className="shrink-0 cursor-pointer hover:opacity-60 active:opacity-80"
//                     onClick={() => handleClickCard(worker.id)}
//                   >
//                     <WorkerCardInLiked {...worker} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* 페이지네이션 컴포넌트: 현재 페이지 및 전체 페이지 수 전달 */}
//           <Pagination
//             currentPage={pagination}
//             totalPages={totalPages}
//             onPageChange={setPagination}
//             className="mt-8 mb-10"
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default ListFavoriteWorker;


'use client';

import { useState, useCallback, useEffect, useMemo } from "react";
import WorkerCardInWritableReview from "@/components/organisms/WorkerCardInWritableReview";
import Pagination from "@/components/molecules/Pagination"; // Pagination 컴포넌트 필요
import EmptyWritableReview from "@/components/molecules/EmptyWritableReview"; // EmptyWritableReview 컴포넌트 필요
// import { Review } from "@/types/dtos/review.dto"; // 원래 Review DTO 경로
import ReviewRegister from "@/components/organisms/ReviewRegister"; // ReviewRegister 컴포넌트 필요
import { ServiceType } from "@/types/move.type"; // ServiceType 타입 필요
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import writableReviewApi from "@/api/review/writableReview.api"; // 수정된 API 파일 경로 확인
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // usePathname 추가
import avartation from "@/assets/images/avatartion-1.svg"; // 이미지 경로 확인
import LoadingSpinner from "@/components/atoms/LoadingSpinner"; // LoadingSpinner 컴포넌트 필요
import GeneralModal from "@/components/templates/GeneralModal"; // GeneralModal 컴포넌트 필요
import useDeviceSize from "@/hooks/useDeviceSize"; // useDeviceSize 훅 경로 확인

// 페이지 사이즈 상수 정의 (ListFavoriteWorker와 동일하게)
export const PAGE_SIZE_DESKTOP = 6;
export const PAGE_SIZE_MOBILE = 4;

// workerData 타입 정의
type workerData = {
  driverId: string;
  estimateId: string;
  serviceType: ServiceType;
  movingDate: Date;
  price: number;
};

// API 응답 데이터 타입 정의 (실제 API 응답 구조에 맞춰 수정하세요)
interface GetReviewableEstimatesResponse {
  list: Review[]; // 'list' 필드가 실제 리뷰 데이터 배열이라고 가정
  totalCount: number; // 'totalCount' 필드가 전체 항목 수라고 가정
  // API 응답에 page, pageSize 등 다른 필드가 있다면 추가
}

// Review 타입 정의 (types/dtos/review.dto 또는 해당 경로에 맞춰 수정)
interface Review {
    id: string;
    workerId: string;
    serviceType: ServiceType;
    movingDate: string; // API에서 string으로 오고, workerData에서 Date로 변환한다고 가정
    price: number;
    profileImage?: string;
    nickname: string;
    isReviewWritten: boolean;
    // API 응답에 포함된 다른 필드가 있다면 여기에 추가하세요.
}


function PendingReviewsClient() {
  const queryClient: QueryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // 현재 경로를 가져와 페이지 이동 시 사용

  // **페이지 상태를 useState로 관리하되, 초기값은 URL에서 가져옴**
  const initialPageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPageFromUrl);

  // 디바이스 사이즈 훅 사용
  const { isDeskTop } = useDeviceSize();

  // **pageSize 상태를 useState로 관리하되, 초기값은 데스크탑 기본값으로 설정**
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP); // 초기값은 데스크탑 기준으로 설정

  // 모달 및 선택된 리뷰/기사 정보 상태 관리
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workerData, setWorkerData] = useState<workerData | null>(null);

  // **useEffect를 사용하여 isDeskTop 변경 시 pageSize 및 page 조정**
  // ListFavoriteWorker의 패턴 적용
  useEffect(() => {
    const currentItemStartIndex = (page - 1) * pageSize; // 현재 페이지 시작 인덱스 (이전 상태 기준)
    const newPageSize = isDeskTop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE; // 변경될 pageSize

    // 새로운 pageSize 기준으로 페이지 재계산
    const newPage = Math.floor(currentItemStartIndex / newPageSize) + 1;

    // pageSize가 변경되었다면 상태 업데이트 및 URL 업데이트
    if (pageSize !== newPageSize) {
        setPageSize(newPageSize);

        // 새 페이지가 현재 페이지와 다르다면 URL 업데이트 (router.replace 사용 권장: 뒤로가기 시 불필요한 history 쌓임 방지)
        if (page !== newPage) {
            const current = new URLSearchParams(Array.from(searchParams.entries()));
            current.set("page", String(newPage));
            const search = current.toString();
            const query = search ? `?${search}` : '';
            router.replace(`${pathname}${query}`); // URL 업데이트
             setPage(newPage); // URL 업데이트 후 페이지 상태도 즉시 동기화
        } else {
             // pageSize만 바뀌고 page는 그대로인 경우 (예: 1페이지인데 pageSize만 바뀜)에도 pageSize 상태 업데이트
             // 페이지 상태는 그대로 두거나, URL 변경이 없으므로 setPage(page) 호출 필요 없음.
             // setPageSize(newPageSize); 는 위에서 이미 호출됨.
        }
    }
    // 이 effect는 isDeskTop, page, pageSize가 변경될 때 실행됩니다.
    // 내부에서 page와 pageSize를 업데이트하므로, 의존성 배열에 포함되어야 합니다.
    // eslint 규칙은 무한 루프를 방지하기 위해 이를 경고하지만, 여기서는 의도된 동작입니다.
    // 단, 불필요한 리렌더링이나 복잡성을 줄이기 위해 이 로직이 정말 필요한지 다시 검토해 볼 수 있습니다.
    // (이전 제안처럼 pageSize를 상태 없이 바로 계산하는 것이 더 간단할 수 있습니다.)
    // 여기서는 요청하신 ListFavoriteWorker 패턴을 충실히 따릅니다.
  }, [isDeskTop, page, pageSize, router, pathname, searchParams]); // 의존성 배열에 필요한 값들 추가

  // URL의 페이지 파라미터가 변경되었을 때 내부 page 상태를 동기화하는 useEffect
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    if (page !== pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [searchParams, page]); // searchParams 또는 내부 page 상태 변경 시 실행


  // useQuery를 사용하여 서버에서 데이터 가져오기 (page와 pageSize 상태 사용)
  const {
    data: reviewsData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<GetReviewableEstimatesResponse, Error>({
    // queryKey에 page와 **상태로 관리되는** pageSize 포함
    queryKey: ["pendingReviews", { page, pageSize }],
    queryFn: () => {
      console.log(`클라이언트 writableReviewApi.getReviewableEstimates 쿼리 실행됨! page: ${page}, pageSize: ${pageSize}`);
      return writableReviewApi.getReviewableEstimates({ page, pageSize });
    },
    placeholderData: (previousData) => previousData, // keepPreviousData 대체

    // keepPreviousData: true // TanStack Query v4 이하 사용 시
  });

  // API 응답에서 리뷰 목록과 전체 개수 가져오기
  const reviews = useMemo(() => reviewsData?.list || [], [reviewsData?.list]);
  const totalCount = reviewsData?.totalCount || 0;

  // 불러온 리뷰 데이터 로깅 (디버깅용, 필요없으면 삭제)
  useEffect(() => {
    if (reviewsData) {
      console.log("불러온 리뷰 데이터:", reviewsData);
    }
  }, [reviewsData]);

  // 후기 작성 버튼 클릭 핸들러
  const handleWriteReview = (reviewId: string) => {
    const selected = reviews.find((review) => review.id === reviewId);
    if (selected) {
      setSelectedReview(selected);
      setWorkerData({
        driverId: selected.workerId,
        estimateId: selected.id,
        movingDate: new Date(selected.movingDate),
        serviceType: selected.serviceType,
        price: selected.price,
      });
      setIsModalOpen(true);
    } else {
      console.log(`해당 ID(${reviewId})의 리뷰를 현재 페이지 목록에서 찾을 수 없습니다.`);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(
    (isReviewSubmitted: boolean = false) => {
      setIsModalOpen(false);
      setSelectedReview(null);
      setWorkerData(null);

      if (isReviewSubmitted) {
        queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
        console.log("리뷰 작성 완료. pendingReviews 쿼리 무효화.");
      }
    },
    [queryClient] // queryClient만 의존성 배열에 추가
  );

  // **페이지 변경 핸들러 (URL 업데이트)**
  // Pagination 컴포넌트에서 새 페이지 번호를 받아서 URL을 업데이트
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(newPage));
    const query = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
    router.push(`${pathname}${query}`); // URL 업데이트 (React Query는 URL 변경 감지 후 페이지 상태 동기화 -> 쿼리 재실행)
    // setPage는 searchParams 변경을 감지하는 useEffect에서 자동으로 호출됨
  };

  // 로딩 상태 처리 (초기 로딩만 해당)
  if (isLoading) {
    return (
      <div className="bg-background-100 flex items-center justify-center h-screen">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    return (
        <div className="bg-background-100 flex items-center justify-center h-screen">
           <div className="text-red-600">리뷰 목록을 불러오는 데 실패했습니다: {error.message}</div>
        </div>
    );
  }

  // UI 렌더링 부분
  return (
    <div className="bg-background-100 flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px] py-8">
        {/* isFetching && !isLoading 조건으로 데이터 업데이트 중 상태 표시 가능 */}
        {isFetching && !isLoading && (
            <div className="text-center text-gray-500 mb-4">데이터 업데이트 중...</div>
        )}

        <div className="flex flex-wrap w-full justify-center lg:justify-start">
          {/* 후기 목록이 비어있을 때 */}
          {reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]">
              <EmptyWritableReview text={"작성 가능한 리뷰가 없습니다."} />
            </div>
          ) : (
            // 후기 목록 렌더링
            reviews.map((review) => {
              return (
                <div key={review.id} className=" p-2 w-full lg:w-1/2 flex justify-center">
                  <WorkerCardInWritableReview
                    serviceType={review.serviceType}
                    profileImage={review.profileImage || avartation}
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

        {/* 페이지네이션 컴포넌트 */}
        {/* 전체 아이템 수가 0보다 크고, 총 페이지 수가 1보다 클 때만 페이지네이션 표시 */}
        {/* 총 페이지 수 계산 시 동적 pageSize 상태 사용 */}
        {totalCount > 0 && Math.ceil(totalCount / pageSize) > 1 && (
          <Pagination
            currentPage={page} // 페이지네이션 컴포넌트에 현재 페이지 상태 전달
            totalPages={Math.ceil(totalCount / pageSize)} // 총 페이지 수 계산 시 동적 pageSize 상태 사용
            onPageChange={handlePageChange} // 페이지 변경 핸들러 전달 (URL 업데이트)
            className="mt-8 mb-8"
          />
        )}

        {/* 후기 작성/수정 모달 */}
        {isModalOpen && selectedReview && workerData && (
            <GeneralModal
              onClose={() => handleCloseModal(false)}
              isOpen={isModalOpen}
            >
              <ReviewRegister
                onClose={() => handleCloseModal(true)} // 후기 제출 성공 시 true 전달
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