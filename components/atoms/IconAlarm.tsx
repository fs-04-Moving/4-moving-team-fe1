'use client';

import icAlarm from '@/assets/images/ic-alarm.svg';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  onClick: () => void;
}

/**
 * @description
 * 알림 아이콘 버튼
 * 클릭 시 드롭다운 토글
 * 포지션 계산을 위한 ref 전달 가능
 */
const IconAlarm = forwardRef<HTMLImageElement, Props>(function IconAlarm(
  { onClick },
  ref
) {
  return (
    <Image
      src={icAlarm}
      alt="알림"
      ref={ref}
      className="w-6 h-6 lg:w-9 lg:h-9 cursor-pointer hover:opacity-60 active:opacity-40"
      onClick={onClick}
    />
  );
});

export default IconAlarm;
