"use client";

import { useState } from "react";

interface MovingTypes {
  id: number;
  name: string;
  count: number;
}

interface FilterLists {
  id: number;
  name: string;
}

interface Props {
  items?: MovingTypes[] | FilterLists[]; // ✅ 배열로 수정
  countOnOff: boolean; // ✅ countOnOff 추가
}

export default function CheckLists({ items = [], countOnOff }: Props) {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

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
      // 모든 항목이 선택되어 있으면 전체 해제
      setSelected({});
    } else {
      // 하나라도 선택 안 되어 있으면 전체 선택
      const newSelection = items.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setSelected(newSelection);
    }
  };

  function Totalitems(): number {
    if (!countOnOff) return 0; // ✅ countOnOff가 false면 count 계산 안 함
    return (items as MovingTypes[]).reduce((sum, item) => sum + item.count, 0);
  }

  return (
    <div className="p-0 w-full mx-auto text-[16px] bg-white shadow-md rounded-lg">
      {/* 전체 선택 체크박스 */}
      <div
        className="flex justify-between items-center text-[16px] text-[#ABABAB] px-[10px] py-[8px] border-b-[1px] border-[#F2F2F2] cursor-pointer"
        onClick={toggleAll}
      >
        <p>{`전체선택${countOnOff ? `(${Totalitems()})` : ""}`}</p>
        <input
          type="checkbox"
          className="w-6 h-6 text-blue-500 border-[#E6E6E6] rounded focus:ring-[#1B92FF]"
          checked={
            Object.keys(selected).length === items.length &&
            Object.values(selected).every(Boolean)
          }
          onChange={toggleAll}
        />
      </div>

      {/* 개별 체크박스 */}
      {items.map((item) => (
        <label
          key={item.id}
          className="flex justify-between items-center p-4 border-b-[2px] border-[#F2F2F2] last:border-b-0 cursor-pointer"
        >
          <span className="text-lg">
            {countOnOff
              ? `${item.name} (${(item as MovingTypes).count})`
              : item.name}
          </span>
          <input
            type="checkbox"
            className="w-6 h-6 text-blue-500 border-[#E6E6E6] rounded focus:ring-[#1B92FF]"
            checked={selected[item.id] || false}
            onChange={() => toggleCheckbox(item.id)}
          />
        </label>
      ))}
    </div>
  );
}
