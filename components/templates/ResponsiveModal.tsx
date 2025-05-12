'use client';

import estimateRequestApi from '@/api/estimate-request/estimateRequest.api';
import EstimateCardList from '@/app/(providers)/(root)/customer/estimates/received/(components)/EstimateCardList';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
// import { InactiveEstimateRequest } from '@/types/dtos/estimateRequest.dto';
// import EstimateCardList from './(components)/EstimateCardList';
import { useQuery } from '@tanstack/react-query';

function ReceivedPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['inactiveEstimateRequests', 1, 10], // 페이지 정보도 queryKey에 포함
    queryFn: () =>
      estimateRequestApi.getInactiveEstimateRequests({
        page: 1,
        pageSize: 10,
      }),
    select: (res) => res.list, // 필요한 데이터만 추출
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>견적 요청 목록 조회 실패</div>;
  if (!data || data.length === 0) return <div>견적 요청이 없습니다.</div>;

  return (
    <div className="mx-auto mt-12 w-[327px] md:w-[600px] lg:w-[1400px]">
      {data.map((req) => (
        <div
          key={req.id}
          className="w-full flex flex-col px-4 py-6 lg:px-10 lg:py-12 md:px-8 md:py-4 gap-y-8 lg:gap-y-12"
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
  );
}

export default ReceivedPage;
