"use client";

import CheckLists from "@/components/organisms/CheckLists";

import ButtonSolid from "../atoms/ButtonSolid";

function CheckModalRoot() {
  return (
    <div className="w-full m-auto">
      {/**버튼과 리스트 사이 간격 */}
      <div className="mb-5">
        {/* countOnOff 값에 따라 movingTypes 또는 filterLists 전달 */}
        <CheckLists
          isModalType={false}
          // type true => 전체선택 가로배치
          // type false => 전체선택 헤더 옆에 배치
        />
      </div>
      <ButtonSolid onClick={() => alert("버튼 클릭됨!")}>선택 하기</ButtonSolid>
    </div>
  );
}

export default CheckModalRoot;
