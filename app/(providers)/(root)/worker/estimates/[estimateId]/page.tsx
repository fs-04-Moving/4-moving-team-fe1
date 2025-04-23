'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import ButtonShareKakao from '@/components/atoms/ButtonShareKakao';
import ButtonShareFacebook from '@/components/atoms/ButtonShareFacebook';
import EstimateSummaryCard from '@/components/organisms/EstimateSummaryCard';
import { ServiceType } from '@/types/move.type';

type Estimate = {
  id: string;
  requestDate: string;
  serviceType: ServiceType;
  movingDate: string;
  departure: string;
  destination: string;
  price: number;
  customerName: string;
  status: 'confirmed' | 'assigned' | 'rejected';
};

export default function EstimateDetailPage() {
  const { estimateId } = useParams();
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/estimate/worker/detail/${estimateId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        setEstimate(res.data);
      } catch (err) {
        console.error('견적 상세 조회 실패:', err);
      }
    };

    if (estimateId) fetchEstimate();
  }, [estimateId]);

  if (!estimate) return <div className="p-8">불러오는 중...</div>;

  return (
    <div className="w-full min-h-screen bg-BackGround-100 py-10">
      <div className="px-6 md:px-18 lg:px-[200px]">
        <h1 className="text-[24px] font-semibold mb-12">견적 상세</h1>
        <div className="flex flex-col gap-8">
          {/* 카드 정보 + 공유하기 */}
          <div className="flex lg:flex-row lg:gap-40 md:flex-col">
            <EstimateSummaryCard
              status={estimate.status}
              customerName={estimate.customerName}
              movingDate={new Date(estimate.movingDate)}
              departure={estimate.departure}
              destination={estimate.destination}
              serviceType={estimate.serviceType}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">견적서 공유하기</h3>
              <div className="flex gap-4">
                <ButtonShareKakao
                  onClick={() => console.log('카카오톡 공유')}
                />
                <ButtonShareFacebook
                  onClick={() => console.log('페이스북 공유')}
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-GrayScale-100 lg:hidden" />

          {/* 견적가 */}
          <div className="flex flex-col lg:gap-[32px] md:gap-3 lg:mb-8">
            <h3 className="lg:text-[24px] md:text-[16px] font-semibold">
              견적가
            </h3>
            <p className="lg:text-[32px] md:text-[20px] font-bold">
              {estimate.price.toLocaleString()}원
            </p>
          </div>

          <hr className="border-t border-GrayScale-100 lg:hidden" />

          {/* 견적 상세 정보 */}
          <EstimateDetailInfo
            requestDate={new Date(estimate.requestDate)}
            serviceType={estimate.serviceType}
            movingDate={new Date(estimate.movingDate)}
            departure={estimate.departure}
            destination={estimate.destination}
          />
        </div>
      </div>
    </div>
  );
}
