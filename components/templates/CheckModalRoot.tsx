"use client";

import CheckLists from "@/components/organisms/CheckLists";
import { movingTypes, filterLists } from "@/libs/mockData";
import { useState } from "react";
import ButtonSolid from "../atoms/ButtonSolid";

function CheckModalRoot() {
  const [countOnOff, setCountOnOff] = useState(false);

  const onClickMovingType = () => {
    // 이사 유형 선택 시,
    setCountOnOff(true);
  };
  const onClickFilterType = () => {
    // 필터 선택 시,
    setCountOnOff(false);
  };

  return (
    <div className="w-full m-auto">
      <div className="flex flex-row itens-center gap-x-6">
        <button
          className="text-[18px] border-0 bg-white text-[#ABABAB] cursor-pointer focus:text-[#1F1F1F] focus:font-bold"
          onClick={onClickMovingType}
        >
          이사 유형
        </button>
        <button
          className="text-[18px] border-0 bg-white text-[#ABABAB] cursor-pointer focus:text-[#1F1F1F] focus:font-bold"
          onClick={onClickFilterType}
        >
          필터
        </button>
      </div>
      {/**버튼과 리스트 사이 간격 */}
      <div className="mb-5">
        {/* countOnOff 값에 따라 movingTypes 또는 filterLists 전달 */}
        <CheckLists
          items={countOnOff ? movingTypes : filterLists}
          type={true}
          // type true => 전체선택 가로배치
          // type false => 전체선택 헤더 옆에 배치
        />
      </div>
      <ButtonSolid onClick={() => alert("버튼 클릭됨!")}>선택 하기</ButtonSolid>
    </div>
  );
}

export default CheckModalRoot;
