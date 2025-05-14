'use client';

import { getEstimateDetailByWorker } from '@/api/estimate/workerOnly/estimate.api';

import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import { Estimate } from '@/types/entities/estimate.entity';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShareSocial from '@/components/molecules/ShareSocial';

export default function EstimatesDetailPage() {
  const params = useParams();
  const estimateId = params.id as string;
  const router = useRouter();

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);

  const safeDate = (date: Date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  useEffect(() => {
    if (!estimateId) return;

    const fetchEstimate = async () => {
      setLoading(true);
      try {
        const data = await getEstimateDetailByWorker(estimateId);
        if (data) {
          setEstimate(data); // 여기서 data가 undefined일 수 있으니 체크
        } else {
          setEstimate(null);
        }
      } catch (error) {
        console.error('Failed to fetch estimate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [estimateId]);

  if (loading) return <div>로딩 중...</div>;
  if (!estimate) return <div>견적을 불러오지 못했습니다.</div>;

  // return (
  //   <div>
  //     <h1>견적 상세</h1>
  //     <p>이사일: {new Date(estimate.movingDate).toLocaleString()}</p>
  //     <p>출발지: {estimate.departureArea}</p>
  //     <p>도착지: {estimate.destination}</p>
  //     <p>가격: {estimate.price}원</p>
  //     <p>작업자: {estimate.nickname}</p>
  //   </div>
  // );

  return (
    <div className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] flex flex-col">
      <div
        className="w-full
        font-[600]
        text-[18px] lg:text-[24px]
        py-4 md:py-4 lg:py-8
        "
      >
        견적 상세
      </div>
      <div className="w-full flex flex-row lg:flex-row lg:gap-x-20 gap-10">
        {/* 왼쪽 영역 */}
        <div className="w-full flex-1 flex flex-col gap-y-10 mt-4">
          <CustomerCardInEstimate
            id={estimate.id}
            key={estimate.id}
            serviceType={estimate.serviceType}
            status={estimate.status}
            customerName={estimate.customerName}
            movingDate={estimate.movingDate}
            departure={estimate.departure}
            destination={estimate.destination}
            isConfirmed={estimate.isConfirmed}
            requestDate={safeDate(estimate.requestDate)}
            showOverlay={false}
          />
          <div className="flex flex-col gap-y-4">
            <p className="text-[24px] font-[600]">견적가</p>
            <p className="text-[32px] font-[700]">{(estimate.price ?? 0).toLocaleString()}원</p>
          </div>

          {/* Mobile/Tablet 공유 버튼 */}
          <div className="block lg:hidden">
            <ShareSocial text="견적서 공유하기" />
          </div>

          <EstimateDetailInfo
            requestDate={estimate.requestDate}
            serviceType={estimate.serviceType}
            movingDate={estimate.movingDate}
            departure={estimate.departure}
            destination={estimate.destination}
          />
        </div>

        {/* 오른쪽 영역 */}
        <div className=" flex gap-x-2 ">
          <div className="hidden lg:block -mt-12">
            <ShareSocial text="견적서 공유하기" className="!mt-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
