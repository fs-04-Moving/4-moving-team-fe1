"use client";

import CheckLists from "@/components/organisms/CheckLists";

import ButtonSolid from "../atoms/ButtonSolid";

interface Props {
  closeModal: () => void; // 모달을 닫는 함수
}

function CheckModalRoot(props: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      {/* 리스트 */}
      <CheckLists isModalType={true} />

      {/* 버튼 */}
      <ButtonSolid
        onClick={() => {
          props.closeModal();
        }}
      >
        선택 하기
      </ButtonSolid>
    </div>
  );
}

export default CheckModalRoot;
