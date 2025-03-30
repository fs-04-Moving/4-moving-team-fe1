'use client';

import RegionDisplay from '@/components/molecules/RegionDisplay';
import RegionSelector from '@/components/molecules/RegionSelector';
import { useState } from 'react';

function Page() {
  const [selectedRegion, setSelectedRegion] = useState<string>('서울');

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-8'>컴포넌트 테스트페이지입니다.</h1>

      {/* RegionDisplay 컴포넌트 예시 */}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          지역표시: 상세페이지에서 Chip으로 표시 될 때
        </h2>
        <div className='p-4 '>
          <RegionDisplay region={selectedRegion} />
        </div>
      </section>

      {/* RegionDisplay 컴포넌트 예시 */}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          프로필 입력에서 : 지역 선택 할 때
        </h2>
        <div className='p-4'>
          <h4 className='font-medium mb-2'>내가 사는 지역</h4>
          <p className='text-sm text-gray-400 pb-7'>
            *내가 사는 지역은 언제든 수정 가능해요!
          </p>

          <RegionSelector
            onRegionSelect={handleRegionSelect}
            selectedRegion={selectedRegion}
          />
        </div>
      </section>
    </div>
  );
}

export default Page;
