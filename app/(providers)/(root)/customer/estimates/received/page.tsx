'use client';

import estimateRequestApi from '@/api/estimate-request/estimateRequest.api';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import { InactiveEstimateRequest } from '@/types/dtos/estimateRequest.dto';
import { useEffect, useState } from 'react';
import EstimateCardList from './(components)/EstimateCardList';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

function ReceivedPage() {
  const [requests, setRequests] = useState<InactiveEstimateRequest[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchInactiveRequests = async () => {
      try {
        setIsLoading(true); // 시작 시 로딩 true
        const response = await estimateRequestApi.getInactiveEstimateRequests({
          page: 1,
          pageSize: 10,
        });
        setRequests(response.list);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error('견적 요청 목록 조회 실패', error);
      } finally {
        setIsLoading(false); // 완료 시 로딩 false
      }
    };

    fetchInactiveRequests();
  }, []);

  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="p-8 lg:p-10 bg-BackGround-200"></div>

      <div
        className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] 
      flex flex-col gap-y-8 lg:gap-y-10 "
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner size="md" />
            <p className="text-3xl mt-10">상세 견적 불러오는 중입니다...</p>
          </div>
        ) : totalCount === 0 ? (
          <EmptyListMessage message={'대기중인 견적이 없습니다.'} />
        ) : (
          requests.map((req) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default ReceivedPage;
