import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  intent?: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * outlined button 컴포넌트입니다.
 * - UI상태: default, hover, disabled
 * @param
 * - children: 버튼명
 * - onClick?: 클릭 시 실행 함수
 * @returns
 */
function ButtonOutlined({ intent = 'default', children, onClick }: Props) {
  const defaultClassName = clsx(
    'w-full flex items-center justify-center h-[54px] lg:h-16 border border-Primay-Blue-300 cursor-pointer rounded-2xl lg:text-xl font-semibold text-Primay-Blue-300 hover:bg-[#f3f3f3]'
  );

  const activeClassName = clsx({
    '!bg-Primay-Blue-50 hover:!bg-Primay-Blue-100': intent === 'active',
  });

  const doneClassName = clsx({
    '!border-GrayScale-100 !text-GrayScale-300': intent === 'done',
  });

  return (
    <button
      className={clsx(defaultClassName, activeClassName, doneClassName)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonOutlined;
