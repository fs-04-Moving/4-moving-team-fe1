import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function FilterArea() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleAreaSelect = (area: string, code?: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (code) {
      newParams.set('serviceArea', code);
      router.push(`?${newParams.toString()}`);
    }
  };

  const handleFilterReset = () => {
    router.push(pathname);
  };

  return (
    <aside className="hidden w-full max-w-[328px] lg:w-[32%] lg:block">
      <div className="flex flex-col gap-11">
        <div className="flex justify-between px-2.5 py-4 border-b-[1px] border-Line-200">
          <span className="text-xl">필터</span>
          <span className="text-GrayScale-300" onClick={handleFilterReset}>
            초기화
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold">지역을 선택해 주세요</label>
          <div className="z-10">
            <DropdownArea defaultValue="지역" onSelect={handleAreaSelect} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold">
            어떤 서비스가 필요하세요?
          </label>
          <DropdownService />
        </div>
      </div>
    </aside>
  );
}

export default FilterArea;
