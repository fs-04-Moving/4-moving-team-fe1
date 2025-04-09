'use client';
import { useState } from 'react';
import GNBMenu from '@/components/molecules/GNBMenu';
import HeaderDefault from '@/components/organisms/HeaderDefault';
import HeaderLanding from '@/components/organisms/HeaderLanding';
import HeaderDefaultTech from '@/components/organisms/HeaderDefaultTech';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import DatePicker from '@/components/atoms/datepicker';

function Page() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const mockEstimateData = {
    requestDate: new Date('2024-08-26'),
    serviceType: 'officeMove',
    movingDate: new Date('2024-08-26T10:00:00'),
    departure: '서울 중구 삼일대로 343',
    destination: '서울 강남구 선릉로 428',
  } as const;

  return (
    <div>
      <HeaderLanding onMenuClick={() => setMenuOpen(true)} />
      <HeaderDefault userName="임시" onMenuClick={() => setMenuOpen(true)} />
      <HeaderDefaultTech
        userName="임시"
        onMenuClick={() => setMenuOpen(true)}
      />
      컴포넌트 테스트페이지입니다.
      <div className="px-6 md:px-[72px] lg:px-[260px] flex flex-col gap-8 items-center">
        <div className="w-full">
          <DatePicker />
        </div>
        <EstimateDetailInfo {...mockEstimateData} />
      </div>
      {isMenuOpen && (
        <GNBMenu
          items={[
            { text: '견적 요청', to: '/견적' },
            { text: '기사님 찾기', to: '/기사님' },
          ]}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default Page;
