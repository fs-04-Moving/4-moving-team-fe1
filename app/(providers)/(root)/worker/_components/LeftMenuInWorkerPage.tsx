"use client";

import { useState } from "react";
import AllChoiceCheckBoxInWorkerPage from "./AllChoiceCheckBoxInWorkerPage";
import { movingTypes, filterLists } from "@/libs/mockData";
import TypeCheckBox from "./TypeCheckBox";

function LeftMenu() {
  const [movingSelected, setMovingSelected] = useState<Record<number, boolean>>(
    {}
  );
  const [filterSelected, setFilterSelected] = useState<Record<number, boolean>>(
    {}
  );
  // 개별 체크박스 토글
  const toggleCheckboxMovingTypes = (id: number) => {
    setMovingSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheckboxFilterLists = (id: number) => {
    setFilterSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 전체 선택/해제 기능
  const toggleAllMovingTypes = () => {
    const isAllSelected =
      Object.keys(movingSelected).length === movingTypes.length &&
      Object.values(movingSelected).every(Boolean);

    if (isAllSelected) {
      setMovingSelected({});
    } else {
      const newSelection = movingTypes.reduce((acc, movingType) => {
        acc[movingType.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setMovingSelected(newSelection);
    }
  };

  const toggleAllFilterLists = () => {
    const isAllSelected =
      Object.keys(filterSelected).length === filterLists.length &&
      Object.values(filterSelected).every(Boolean);

    if (isAllSelected) {
      setFilterSelected({});
    } else {
      const newSelection = filterLists.reduce((acc, filterList) => {
        acc[filterList.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setFilterSelected(newSelection);
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

export default LeftMenu;
