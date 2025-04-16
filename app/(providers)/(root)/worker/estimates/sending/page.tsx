'use client';

import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import ButtonShareKakao from '@/components/atoms/ButtonShareKakao';
import ButtonShareFacebook from '@/components/atoms/ButtonShareFacebook';
import EstimateSummaryCard from '@/components/organisms/EstimateSummaryCard';

const mockEstimate = {
  requestDate: new Date('2024-08-26'),
  serviceType: 'smallMove',
  movingDate: new Date('2024-08-26T10:00:00'),
  departure: '서울 중구 삼일대로 343',
  destination: '서울 강남구 선릉로 428',
  price: 180000,
  customerName: '김인서',
  status: 'confirmed' as const,
};

export default function SendingEstimatesPage() {
  return (
    <div className="w-full min-h-screen bg-BackGround-100 py-10">
      <div className="px-6 md:px-18 lg:px-[200px]">
        <h1 className="text-[24px] font-semibold mb-12">견적 상세</h1>
        <div className="flex flex-col gap-8">
          {/* 카드 정보 + 공유하기 */}
          <div className="flex lg:flex-row lg:gap-40 md:flex-col">
            <EstimateSummaryCard
              status={mockEstimate.status}
              customerName={mockEstimate.customerName}
              movingDate={mockEstimate.movingDate}
              departure={mockEstimate.departure}
              destination={mockEstimate.destination}
              serviceType={mockEstimate.serviceType}
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

          {/* 공유와 견적가 사이 선 */}
          <hr className="border-t border-GrayScale-100 lg:hidden" />

          {/* 견적가 */}
          <div className="flex flex-col lg:gap-[32px] md:gap-3 lg:mb-8">
            <h3 className="lg:text-[24px] md:text-[16px] font-semibold">
              견적가
            </h3>
            <p className="lg:text-[32px] md:text-[20px] font-bold">
              {mockEstimate.price.toLocaleString()}원
            </p>
          </div>

          {/* 견적가와 상세정보 사이 선 */}
          <hr className="border-t border-GrayScale-100 lg:hidden" />

          {/* 견적 상세 정보 */}
          <EstimateDetailInfo
            requestDate={mockEstimate.requestDate}
            serviceType={mockEstimate.serviceType}
            movingDate={mockEstimate.movingDate}
            departure={mockEstimate.departure}
            destination={mockEstimate.destination}
          />
        </div>
      </div>
    </div>
  );
}
