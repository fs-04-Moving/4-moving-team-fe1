'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AllChoiceCheckBoxInWorkerPage from './AllChoiceCheckBoxInWorkerPage';
import TypeCheckBox from './IndividualTypeCheckBoxInWorkerPage';

const movingTypes = [
  { id: 1, name: '소형이사', value: 'smallMove', count: 4 },
  { id: 2, name: '가정이사', value: 'homeMove', count: 2 },
  { id: 3, name: '사무실이사', value: 'officeMove', count: 10 },
];

const filterLists = [
  { id: 1, name: '서비스 가능 지역', value: 'area', count: 6 },
  { id: 2, name: '지정 견적 요청', value: 'assigned', count: 10 },
];

function LeftMenuInWorkerPage() {
  const [movingSelected, setMovingSelected] = useState<Record<number, boolean>>(
    {}
  );
  const [filterSelected, setFilterSelected] = useState<Record<number, boolean>>(
    {}
  );
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    []
  );
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedServiceTypes.length > 0) {
      newParams.set('serviceType', selectedServiceTypes.join(','));
    } else {
      newParams.delete('serviceType');
    }

    if (selectedFilters.length > 0) {
      newParams.set('filter', selectedFilters.join(','));
    } else {
      newParams.delete('filter');
    }

    router.replace(`?${newParams.toString()}`);
  }, [selectedServiceTypes, selectedFilters, searchParams, router]);

  useEffect(() => {
    setMovingSelected({});
    setFilterSelected({});
    setSelectedServiceTypes([]);
    setSelectedFilters([]);
  }, []);

  const toggleCheckboxMovingTypes = (id: number) => {
    setMovingSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selected = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map(
          (key) => movingTypes.find((type) => type.id === Number(key))?.value
        )
        .filter(Boolean) as string[];
      setSelectedServiceTypes(selected);
      return updated;
    });
  };

  const toggleCheckboxFilterLists = (id: number) => {
    setFilterSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selected = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map(
          (key) => filterLists.find((type) => type.id === Number(key))?.value
        )
        .filter(Boolean) as string[];
      setSelectedFilters(selected);
      return updated;
    });
  };

  const toggleAllMovingTypes = () => {
    const isAllSelected =
      Object.keys(movingSelected).length === movingTypes.length &&
      Object.values(movingSelected).every(Boolean);

    if (isAllSelected) {
      setMovingSelected({});
      setSelectedServiceTypes([]);
    } else {
      const newSelection = movingTypes.reduce((acc, type) => {
        acc[type.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setMovingSelected(newSelection);
      setSelectedServiceTypes(movingTypes.map((type) => type.value));
    }
  };

  const toggleAllFilterLists = () => {
    const isAllSelected =
      Object.keys(filterSelected).length === filterLists.length &&
      Object.values(filterSelected).every(Boolean);

    if (isAllSelected) {
      setFilterSelected({});
      setSelectedFilters([]);
    } else {
      const newSelection = filterLists.reduce((acc, type) => {
        acc[type.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setFilterSelected(newSelection);
      setSelectedFilters(filterLists.map((type) => type.value));
    }
  };

  return (
    // hidden 추가하기
    <aside className="hidden w-full max-w-[328px] lg:w-[32%] lg:block  gap-[52px]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center py-4 px-[10px] border-b-[1px] border-[#F2F2F2]">
          <button className="text-[20px] font-[500]">이사 유형</button>

          <AllChoiceCheckBoxInWorkerPage
            BoxClassName="flex flex-row gap-4"
            onClickTotalCheck={toggleAllMovingTypes}
            isAllSelected={
              Object.keys(movingSelected).length === movingTypes.length &&
              Object.values(movingSelected).every(Boolean)
            }
          />
        </div>
        <div>
          <TypeCheckBox
            items={movingTypes}
            selected={movingSelected}
            toggleCheckbox={toggleCheckboxMovingTypes}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* 개별 체크박스 (컴포넌트화) */}

        <div className="flex justify-between items-center py-4 px-[10px] border-b-[1px] border-[#F2F2F2] ">
          <button className="text-[20px] font-[500]">필터</button>
          <AllChoiceCheckBoxInWorkerPage
            BoxClassName="flex flex-row gap-4"
            onClickTotalCheck={toggleAllFilterLists}
            isAllSelected={
              Object.keys(filterSelected).length === filterLists.length &&
              Object.values(filterSelected).every(Boolean)
            }
          />
        </div>

        <TypeCheckBox
          items={filterLists}
          selected={filterSelected}
          toggleCheckbox={toggleCheckboxFilterLists}
        />
      </div>
    </aside>
  );
}

export default LeftMenuInWorkerPage;
