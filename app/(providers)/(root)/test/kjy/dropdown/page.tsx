'use client';

import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import DropdownSort from '@/components/molecules/DropdownSort';
import PageContainer from '@/components/templates/PageContainer';
import { SORT_OPTIONS, sortOption } from '@/constants/dropdownSortConstants';

function page() {
  const handleAreaSelect = (area: string, code?: string) => {
    console.log('Selected area:', area, 'code:', code);
    //API 호출, 다른 로직 처리 등
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value: sortOption) => {
    console.log(`정렬 방식 변경: ${value}`);
    // 여기에 정렬 로직 추가
  };

  return (
    <PageContainer>
      <div className='container mx-auto p-6 flex flex-col '>
        <h1 className='text-2xl font-bold mb-6'>드랍다운 필터</h1>
        <section className='max-w-md pb-80'>
          <h2 className='text-lg font-medium mb-2'>지역을 선택해주세요</h2>
          <DropdownArea
            includeAll={true}
            defaultValue='전체'
            onSelect={handleAreaSelect}
          />
        </section>
        <section className='max-w-md '>
          <h2 className='text-lg font-medium mb-2'>
            서비스유형을 선택해주세요
          </h2>
          <DropdownService />
        </section>
        <section>
          <DropdownSort
            options={SORT_OPTIONS}
            onChange={handleSortChange}
            className='w-40'
          />
        </section>
      </div>
    </PageContainer>
  );
}
export default page;
