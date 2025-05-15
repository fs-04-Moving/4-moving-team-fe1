'use client';

import { useEffect, useState } from 'react';
import AllChoiceCheckBox from '../molecules/AllChoiceCheckBox';
import IndividualTypeCheckBox from '../molecules/IndividualTypeCheckBox';
import Image from 'next/image';
import X from '@/assets/images/ic-X2.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilter } from '@/contexts/FilterContext';

interface Props {
  isModalType: boolean;
  smallMove: number;
  officeMove: number;
  homeMove: number;
  serviceAreaCount: number;
  assignedCount: number;
  closeModal: () => void;
}

export default function CheckLists({
  isModalType = true,
  smallMove,
  officeMove,
  homeMove,
  serviceAreaCount,
  assignedCount,
  closeModal,
}: Props) {
  const movingTypes = [
    { id: 1, name: '소형이사', value: 'smallMove', count: smallMove },
    { id: 2, name: '가정이사', value: 'homeMove', count: homeMove },
    { id: 3, name: '사무실이사', value: 'officeMove', count: officeMove },
  ];

  const filterLists = [
    { id: 1, name: '서비스 가능 지역', value: 'area', count: serviceAreaCount },
    { id: 2, name: '지정 견적 요청', value: 'assigned', count: assignedCount },
  ];

  const [isMovingType, setIsMovingType] = useState(true); // 현재 선택된 탭 상태

  const items = isMovingType ? movingTypes : filterLists;

  // 전체 count 값 합산

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    movingSelected,
    setMovingSelected,
    filterSelected,
    setFilterSelected,
    selectedServiceTypes,
    setSelectedServiceTypes,
    selectedFilters,
    setSelectedFilters,
  } = useFilter();

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

  const getMovingTypesTotalCount = () => {
    return movingTypes.reduce((sum, item) => sum + item.count, 0);
  };

  const toggleCheckboxMovingTypes = (id: number) => {
    setMovingSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selected = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map((key) => movingTypes.find((type) => type.id === Number(key))?.value)
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
        .map((key) => filterLists.find((type) => type.id === Number(key))?.value)
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
      const newSelection = movingTypes.reduce(
        (acc, type) => {
          acc[type.id] = true;
          return acc;
        },
        {} as Record<number, boolean>,
      );
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
      const newSelection = filterLists.reduce(
        (acc, type) => {
          acc[type.id] = true;
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setFilterSelected(newSelection);
      setSelectedFilters(filterLists.map((type) => type.value));
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-row justify-between p-2 items-center gap-x-6">
        <div className="flex flex-row gap-x-4 items-center">
          <button
            className={`text-[18px] border-0 bg-white cursor-pointer ${
              isMovingType ? 'text-[#1F1F1F] font-bold' : 'text-[#ABABAB]'
            }`}
            onClick={() => setIsMovingType(true)}
          >
            이사 유형
          </button>
          <button
            className={`text-[18px] border-0 bg-white cursor-pointer ${
              !isMovingType ? 'text-[#1F1F1F] font-bold' : 'text-[#ABABAB]'
            }`}
            onClick={() => setIsMovingType(false)}
          >
            필터
          </button>
        </div>
        <button type="button" onClick={closeModal} className="cursor-pointer">
          <Image src={X} alt="창닫기" width={12} />
        </button>
      </div>
      {items === movingTypes ? (
        <div className="w-full flex flex-col gap-2">
          {/* 전체 선택 체크박스 */}
          {isModalType && (
            <AllChoiceCheckBox
              BoxClassName="flex flex-row justify-between gap-[10px]"
              onClickTotalCheck={toggleAllMovingTypes}
              totalQuantity={getMovingTypesTotalCount()}
              isAllSelected={
                Object.keys(movingSelected).length === movingTypes.length &&
                Object.values(movingSelected).every(Boolean)
              }
            />
          )}
          {/* 개별 체크박스 (컴포넌트화) */}
          <IndividualTypeCheckBox
            items={movingTypes}
            selected={movingSelected}
            toggleCheckbox={toggleCheckboxMovingTypes}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {/* 전체 선택 체크박스 */}
          {isModalType && (
            <AllChoiceCheckBox
              BoxClassName="flex flex-row justify-between gap-[10px]"
              onClickTotalCheck={toggleAllFilterLists}
              totalQuantity={getMovingTypesTotalCount()}
              isAllSelected={
                Object.keys(filterSelected).length === filterLists.length &&
                Object.values(filterSelected).every(Boolean)
              }
            />
          )}
          {/* 개별 체크박스 (컴포넌트화) */}
          <IndividualTypeCheckBox
            items={filterLists}
            selected={filterSelected}
            toggleCheckbox={toggleCheckboxFilterLists}
          />
        </div>
      )}
    </div>
  );
}
