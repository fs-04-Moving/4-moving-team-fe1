'use client';

import icFilterOff from '@/assets/images/ic-filter-off.svg';
import icFilter from '@/assets/images/ic-filter.svg';
import Image from 'next/image';

interface Props {
  isActive?: boolean;
  onClick: () => void;
}

/**
 * 현재 확인된 사용처는 필터 모달을 여는 용도입니다.
 * 그러나 onClick 정의에 따라 다른 용도로 사용될 수 있습니다.
 * @param param0
 * - isActive?: 활성화/비활성화(기본값: false)
 * - onClick: 클릭 실행 함수
 * @returns
 */
function ButtonPopFilter({ isActive = false, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center w-8 h-8 border rounded-lg cursor-pointer ${
        isActive
          ? 'bg-Primay-Blue-50 border-Primay-Blue-200'
          : 'bg-GrayScale-50 border-Line-200'
      }`}
    >
      <Image src={isActive ? icFilter : icFilterOff} alt="필터 아이콘" />
    </div>
  );
}

export default ButtonPopFilter;
