'use client';

import CheckLists from '@/components/organisms/CheckLists';
import ButtonSolid from '../atoms/ButtonSolid';

interface Props {
  closeModal: () => void; // 모달을 닫는 함수
  smallMove: number;
  officeMove: number;
  homeMove: number;
  serviceAreaCount: number;
  assignedCount: number;
}

function CheckModalRoot(props: Props) {
  return (
    <div className="relative w-full h-full flex flex-col gap-y-5">
      {/* 리스트 */}
      <CheckLists isModalType={true} {...props} />
      <button
        className="cursor-pointer absolute top-[6px] right-[6px]"
        onClick={props.closeModal} // 모달을 닫는 함수
      ></button>
      {/* 버튼 */}
      <ButtonSolid
        onClick={() => {
          props.closeModal();
        }}
      >
        조회 하기
      </ButtonSolid>
    </div>
  );
}

export default CheckModalRoot;
