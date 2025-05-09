'use client';

import EstimateSummaryCard from '@/components/organisms/EstimateSummaryCard';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import ButtonShareKakao from '@/components/atoms/ButtonShareKakao';
import ButtonShareFacebook from '@/components/atoms/ButtonShareFacebook';
import { EstimateStatus, ServiceType } from '@/types/move.type';

type Props = {
  estimate: {
    customerName: string;
    status: EstimateStatus;
    movingDate: string;
    requestDate: string;
    departure: string;
    destination: string;
    serviceType: ServiceType;
    price: number;
  };
};

export default function EstimateDetailContent({ estimate }: Props) {
  return (
    <div className="px-6 md:px-18 lg:px-[200px]">
      <h1 className="text-[24px] font-semibold mb-12">견적 상세</h1>
      <div className="flex flex-col gap-8">
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
              <ButtonShareKakao onClick={() => {}} />
              <ButtonShareFacebook onClick={() => {}} />
            </div>
          </div>
        </div>

        <hr className="border-t border-GrayScale-100 lg:hidden" />

        <div className="flex flex-col lg:gap-[32px] md:gap-3 lg:mb-8">
          <h3 className="lg:text-[24px] md:text-[16px] font-semibold">
            견적가
          </h3>
          <p className="lg:text-[32px] md:text-[20px] font-bold">
            {estimate.price.toLocaleString()}원
          </p>
        </div>

        <hr className="border-t border-GrayScale-100 lg:hidden" />

        <EstimateDetailInfo
          requestDate={new Date(estimate.requestDate)}
          serviceType={estimate.serviceType}
          movingDate={new Date(estimate.movingDate)}
          departure={estimate.departure}
          destination={estimate.destination}
        />
      </div>
    </div>
  );
}
