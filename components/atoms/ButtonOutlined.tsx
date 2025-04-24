'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'default' | 'active' | 'done';
  children: ReactNode;
}

/**
 * outlined button 컴포넌트입니다.
 * - UI상태: default, hover, disabled
 * @param
 * - intent?: UI상태 -> default(기본값), hover, disabled
 * - children: 버튼명
 * - type?: 'button' | 'submit' | 'reset'
 * @returns
 */
function ButtonOutlined({
  intent = 'default',
  children,
  className,
  ...props
}: Props) {
  const { disabled } = props;

  const baseClassName = clsx(
    'w-full flex items-center justify-center h-[54px] lg:h-16 border border-Primay-Blue-300 cursor-pointer rounded-2xl lg:text-xl font-semibold text-Primay-Blue-300 hover:bg-[#f3f3f3]'
  );

  const activeClassName =
    intent === 'active' && '!bg-Primay-Blue-50 hover:!bg-Primay-Blue-100';
  const doneClassName =
    intent === 'done' && '!border-GrayScale-100 !text-GrayScale-300';
  const disabledClassName = disabled && '!cursor-default opacity-50';

  return (
    <button
      className={clsx(
        baseClassName,
        activeClassName,
        doneClassName,
        disabledClassName,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonOutlined;
