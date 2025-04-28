"use client";

import { useState } from "react";
import AllChoiceCheckBoxInWorkerPage from "./AllChoiceCheckBoxInWorkerPage";
import { movingTypes, filterLists } from "@/libs/mockData";
import TypeCheckBox from "./TypeCheckBox";

function LeftMenu() {
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [isMovingType, setIsMovingType] = useState(true); // 현재 선택된 탭 상태

  const items = isMovingType ? movingTypes : filterLists;

  // 개별 체크박스 토글
  const toggleCheckbox = (id: number) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 전체 선택/해제 기능
  const toggleAll = () => {
    const isAllSelected =
      Object.keys(selected).length === items.length &&
      Object.values(selected).every(Boolean);

    if (isAllSelected) {
      setSelected({});
    } else {
      const newSelection = items.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setSelected(newSelection);
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
            onClickTotalCheck={toggleAll}
            isAllSelected={
              Object.keys(selected).length === items.length &&
              Object.values(selected).every(Boolean)
            }
          />
        </div>
        <div>
          <TypeCheckBox
            items={movingTypes}
            selected={selected}
            toggleCheckbox={toggleCheckbox}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* 개별 체크박스 (컴포넌트화) */}

        <div className="flex justify-between items-center py-4 px-[10px] border-b-[1px] border-[#F2F2F2] ">
          <button className="text-[20px] font-[500]">필터</button>
          <AllChoiceCheckBoxInWorkerPage
            BoxClassName="flex flex-row gap-4"
            onClickTotalCheck={toggleAll}
            isAllSelected={
              Object.keys(selected).length === items.length &&
              Object.values(selected).every(Boolean)
            }
          />
        </div>

        <TypeCheckBox
          items={filterLists}
          selected={selected}
          toggleCheckbox={toggleCheckbox}
        />
      </div>
    </aside>
  );
}

export default LeftMenu;
