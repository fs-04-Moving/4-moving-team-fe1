'use client';
import DatePicker from '@/components/atoms/datepicker';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';

function Page() {
  const mockEstimateData = {
    requestDate: new Date('2024-08-26'),
    serviceType: 'officeMove',
    movingDate: new Date('2024-08-26T10:00:00'),
    departure: '서울 중구 삼일대로 343',
    destination: '서울 강남구 선릉로 428',
  } as const;

  return (
    <div>
      컴포넌트 테스트페이지입니다.
      <div className="px-6 md:px-[72px] lg:px-[260px] flex flex-col gap-8 items-center">
        <div className="w-full">
          <DatePicker />
        </div>
        <EstimateDetailInfo {...mockEstimateData} />
      </div>
    </div>
  );
}

export default Page;
