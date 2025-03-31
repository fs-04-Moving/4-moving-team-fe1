'use client';

import RegionDisplay from '@/components/molecules/RegionDisplay';
import RegionSelector from '@/components/molecules/RegionSelector';
import { useState } from 'react';

function Page() {
  // 일반 사용자용 (단일 선택)
  const [selectedRegion, setSelectedRegion] = useState<string>('서울');

  // 기사님용 (다중 선택)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleMultipleRegionSelect = (regions: string | string[]) => {
    if (Array.isArray(regions)) {
      setSelectedRegions(regions);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-8'>컴포넌트 테스트페이지입니다.</h1>

      {/* RegionDisplay 컴포넌트 단일 */}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          지역표시: 상세페이지에서 단일 Chip으로 표시 될 때
        </h2>
        <div className='p-4 '>
          <RegionDisplay region={selectedRegion} />
        </div>
      </section>

      {/* 일반 사용자용 RegionSelector 컴포넌트 */}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          일반 사용자용 지역 선택 (단일 선택)
        </h2>
        <div className='p-4'>
          <RegionSelector
            onRegionSelect={(region) => handleRegionSelect(region as string)}
            selectedRegion={selectedRegion}
          />
        </div>
      </section>

      {/* RegionDisplay 컴포넌트 다중선택*/}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          지역표시: 상세페이지에서 다중 Chip으로 표시 될 때
        </h2>
        <div className='p-4'>
          <RegionDisplay region={selectedRegions} />
        </div>
      </section>

      {/* 기사님용 RegionSelector 컴포넌트 */}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold mb-4'>
          기사님용 지역 선택 (다중 선택, 초기 선택 값 없음, 선택취소 가능)
        </h2>
        <div className='p-4'>
          <RegionSelector
            onRegionSelect={handleMultipleRegionSelect}
            selectedRegion={selectedRegions}
            multipleSelect={true}
          />
        </div>
      </section>
    </div>
  );
}

export default Page;
