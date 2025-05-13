'use client';

import favoriteApi from '@/api/favorite/favorite.api';
import ROUTES from '@/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import useDeviceSize from '@/hooks/useDeviceSize';
import { useEffect, useState } from 'react';
import Label from '../atoms/Label';
import SkeletonFavoriteList from '../atoms/SkeletonFavoriteList';
import EmptyListMessage from '../molecules/EmptyListMessage';
import Pagination from '../molecules/Pagination';
import WorkerCardInLiked, { WorkerCardInLikedProps } from './WorkerCardInLiked';

export const PAGE_SIZE_DESKTOP = 6; // 데스크탑에서 한 페이지에 보여줄 목록 수
export const PAGE_SIZE_MOBILE = 4; // 모바일에서 한 페이지에 보여줄 목록 수

function ListFavoriteWorker() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP); // 디바이스 감지 후 설정됨
  const { isDeskTop } = useDeviceSize();

  // 디바이스에 따라 pageSize 설정
  useEffect(() => {
    setPageSize(isDeskTop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE);
  }, [isDeskTop]);

  // deviceSize변경으로 pageSize가 바뀔 경우의 문제 대응
  // e.g. 데이터가 5개일 경우 모바일에서 2페이지를 보고 있다가 데스크탑으로 전환되면 2페이지에 데이터가 없음
  useEffect(() => {
    // 현재 페이지에서 보고 있던 첫 데이터의 인덱스
    // const currentItemStartIndex = (pageRef.current - 1) * pageSizeRef.current;
    const currentItemStartIndex = (page - 1) * pageSize;

    // 새로운 pageSize 결정
    const newPageSize = isDeskTop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE;

    // 새 page 계산
    const newPage = Math.floor(currentItemStartIndex / newPageSize) + 1;

    setPageSize(newPageSize);
    setPage(newPage);

    // 불필요한 리렌더링 혹은 무한 루프 발생 가능성때문에 page, pageSize를 넣지 않음
    // 아래는 경고 메지지 방지용 주석
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeskTop]);

  /**
   * @description
   * 찜한 기사님 목록 조회 API
   * CSR 시 디바이스별 pageSize에 따라 호출됨
   * placeholderData를 통해 이전 페이지 데이터를 유지하여 깜빡임 방지
   */
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['favorites', { page, pageSize }],
    queryFn: () => {
      console.log('클라이언트 favorites 쿼리 실행됨!');
      return favoriteApi.getFavoriteWorkers({ page, pageSize });
    },
    placeholderData: (prev) => prev, // keepPreviousData 대체
  });

  const router = useRouter();

  const handleClickCard = (workerId: string) => {
    router.push(ROUTES.WORKER.DETAIL(workerId));
  };

  if (isLoading) return <SkeletonFavoriteList />;
  if (isError || !favorites) return <div>오류 발생!</div>;

  const totalPages = Math.ceil(favorites.totalCount / pageSize);
  console.log('render!!!');

  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
        <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
          <Label intent="md">찜한 기사님</Label>
        </div>
      </div>
      {favorites.totalCount === 0 ? (
        <EmptyListMessage message="찜한 기사님이 없습니다." />
      ) : (
        <>
          <div className="flex justify-center">
            <div className="md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row flex-wrap gap-x-6 gap-y-6 md:gap-y-8 lg:gap-y-12">
              {favorites.list.map((worker: WorkerCardInLikedProps) => {
                return (
                  <div
                    key={worker.id}
                    className="shrink-0 cursor-pointer hover:opacity-60 active:opacity-80"
                    onClick={() => handleClickCard(worker.id)}
                  >
                    <WorkerCardInLiked {...worker} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 페이지네이션 컴포넌트: 현재 페이지 및 전체 페이지 수 전달 */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mt-8 mb-10"
          />
        </>
      )}
    </div>
  );
}

export default ListFavoriteWorker;

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