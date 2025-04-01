import icWriting from '@/assets/images/ic-writing.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  disabled?: boolean;
  showIcon?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * 가장 많이 사용되는 solid button 컴포넌트입니다.
 * - UI상태: default, hover, disabled
 * @param
 * - children: 버튼명
 * - disabled?: 비활성 여부(기본값: false)
 * - showIcon?: 연필 아이콘 표시 여부(기본값: false)
 * - onClick?: 클릭 시 실행 함수
 * @returns
 */
function ButtonSolid({
  disabled = false,
  showIcon = false,
  children,
  onClick,
}: Props) {
  console.log(children);
  const defaultClassName = clsx(
    'flex justify-center items-center h-[54px] lg:h-16 bg-Primay-Blue-300 hover:bg-Primay-Blue-200 cursor-pointer rounded-2xl lg:text-xl text-GrayScale-50'
  );

  const disableClassName = clsx({
    '!bg-GrayScale-100 !cursor-default': disabled,
  });

  return (
    <button
      disabled={disabled}
      className={clsx(defaultClassName, disableClassName)}
      onClick={onClick}
    >
      <div className="flex">
        <span>{children}</span>
        {showIcon && (
          <Image src={icWriting} alt="dkd" className="ml:1 lg:ml-2" />
        )}
      </div>
    </button>
  );
}

export default ButtonSolid;
