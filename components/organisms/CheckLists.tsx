'use client';

import { useState } from 'react';
import AllChoiceCheckBox from '../molecules/AllChoiceCheckBox';
import { movingTypes, filterLists } from '@/libs/mockData';
import IndividualTypeCheckBox from '../molecules/IndividualTypeCheckBox';

interface Props {
  isModalType: boolean;
}

export default function CheckLists({ isModalType = true }: Props) {
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [isMovingType, setIsMovingType] = useState(true); // 현재 선택된 탭 상태

  const items = isMovingType ? movingTypes : filterLists;

  // 전체 count 값 합산
  const getTotalCount = () => {
    return items.reduce((sum, item) => sum + item.count, 0);
  };

  // 개별 체크박스 토글
  const toggleCheckbox = (id: number) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 전체 선택/해제 기능
  const toggleAll = () => {
    const isAllSelected =
      Object.keys(selected).length === items.length && Object.values(selected).every(Boolean);

    if (isAllSelected) {
      setSelected({});
    } else {
      const newSelection = items.reduce(
        (acc, item) => {
          acc[item.id] = true;
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setSelected(newSelection);
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row justify-between items-center gap-x-6">
        <div className="flex flex-row gap-x-4">
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
        {!isModalType && (
          <AllChoiceCheckBox
            BoxClassName="flex flex-row gap-x-2"
            onClickTotalCheck={toggleAll}
            totalQuantity={getTotalCount()}
            isAllSelected={
              Object.keys(selected).length === items.length &&
              Object.values(selected).every(Boolean)
            }
          />
        )}
      </div>
      <div className="p-0 w-full mx-auto text-[16px] bg-white shadow-md rounded-lg">
        {/* 전체 선택 체크박스 */}
        {isModalType && (
          <AllChoiceCheckBox
            BoxClassName="flex flex-row justify-between"
            onClickTotalCheck={toggleAll}
            totalQuantity={getTotalCount()}
            isAllSelected={
              Object.keys(selected).length === items.length &&
              Object.values(selected).every(Boolean)
            }
          />
        )}
        {/* 개별 체크박스 (컴포넌트화) */}
        <IndividualTypeCheckBox items={items} selected={selected} toggleCheckbox={toggleCheckbox} />
      </div>
    </div>
  );
}
