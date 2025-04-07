"use client";

import CheckLists from "@/components/organisms/CheckLists";
import X from "@/assets/images/ic-X2.svg";
import ButtonSolid from "../atoms/ButtonSolid";
import Image from "next/image";

interface Props {
  closeModal: () => void; // 모달을 닫는 함수
}

function CheckModalRoot(props: Props) {
  return (
    <div className="relative w-full h-full flex flex-col gap-y-5">
      {/* 리스트 */}
      <CheckLists isModalType={true} />
      <button
        className="cursor-pointer absolute top-[6px] right-[6px]"
        onClick={props.closeModal} // 모달을 닫는 함수
      >
        <Image src={X} alt="창닫기" width={18} />
      </button>
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
