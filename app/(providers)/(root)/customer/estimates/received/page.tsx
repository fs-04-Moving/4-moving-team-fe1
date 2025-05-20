'use client';

import estimateRequestApi from '@/api/estimate-request/estimateRequest.api';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import { InactiveEstimateRequest } from '@/types/dtos/estimateRequest.dto';
import EstimateCardList from './(components)/EstimateCardList';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const PAGE_SIZE = 1000; // 충분히 큰 숫자로 한 번에 전체 데이터를 받아오도록 설정

function ReceivedPage() {
  const { data, isLoading, isError, error } = useQuery<{
    list: InactiveEstimateRequest[];
    totalCount: number;
  }>({
    queryKey: ['inactive-estimate-requests'],
    queryFn: () =>
      estimateRequestApi.getInactiveEstimateRequests({
        page: 1,
        pageSize: PAGE_SIZE,
      }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const requests = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner size="md" />
        <p className="text-3xl mt-10">상세 견적 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError) {
    console.error('에러 발생:', error);
    return <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]"></div>;
  }

  if (totalCount === 0) {
    return (
      <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]">
        <EmptyListMessage message="진행중인 견적이 없습니다." />
      </div>
    );
  }

  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="p-8 lg:p-10 bg-BackGround-200"></div>

      <div
        className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] 
        flex flex-col gap-y-8 lg:gap-y-10 "
      >
        {requests.map((req) => (
          <div
            key={req.id}
            className="
              w-full flex flex-col
              px-4 py-6 lg:px-10 lg:py-12 md:px-8 md:py-4
              gap-y-[16px] lg:gap-y-[32px]
              bg-[#FFFFFF]
              shadow-[2px_0px_10px_#DCDCDC24,0px_2px_10px_#DCDCDC24,-2px_0px_10px_#DCDCDC24,0px_-2px_10px_#DCDCDC24]
              rounded-0 md:rounded-[24px] lg:rounded-[40px]
              border-[#F2F2F2] border-[0.5px]
            "
          >
            <EstimateDetailInfo
              requestDate={new Date(req.requestDate)}
              serviceType={req.serviceType}
              movingDate={new Date(req.movingDate)}
              departure={req.departure}
              destination={req.destination}
            />
            <EstimateCardList estimateRequestId={req.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceivedPage;
