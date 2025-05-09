'use client';

import icWriting from '@/assets/images/ic-writing.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
  children: ReactNode;
  isGnb?: boolean;
}

/**
 * solid button 컴포넌트의 복제 아웃라인 컴포넌트입니다.
 * - UI상태: default, hover, disabled
 * @param
 * - children: 버튼명
 * - showIcon?: 연필 아이콘 표시 여부(기본값: false)
 * - isGnb?: Gnb에 쓰이는 버튼인지(기본값: false)
 * @returns
 */
function ButtonSolid({ showIcon = false, children, isGnb = false, className, ...props }: Props) {
  const { disabled } = props;

  const defaultClassName = clsx(
    'w-full flex justify-center items-center h-[54px] lg:h-16 bg-Primay-Blue-300 hover:bg-Primay-Blue-200 cursor-pointer rounded-2xl lg:text-xl font-semibold text-GrayScale-50',
  );

  const disableClassName = disabled && '!bg-GrayScale-100 !cursor-default';
  const gnbClassName = isGnb && '!h-11 lg:!text-lg';

  return (
    <button
      className={clsx(defaultClassName, disableClassName, gnbClassName, className)}
      {...props}
    >
      <div className="flex">
        <span>{children}</span>
        {showIcon && <Image src={icWriting} alt="연필 아이콘" className="ml:1 lg:ml-2" />}
      </div>
    </button>
  );
}

export default ButtonSolid;
