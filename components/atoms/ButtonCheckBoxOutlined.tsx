import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  intent?: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * outlined button 컴포넌트를 복제한 체크박스용 아웃라인입니다.
 * - UI상태: default, hover, disabled
 * @param
 * - children: 버튼명
 * - onClick?: 클릭 시 실행 함수
 * @returns
 */
function ButtonOutlined({ intent = 'default', children, onClick }: Props) {
  const defaultClassName = clsx(
    'w-full h-13 lg:h-21 flex items-center border border-Primay-Blue-300 cursor-pointer rounded-2xl text-Black-400 text-[14px] lg:text-[18px] font-semibold hover:bg-[#f3f3f3]'
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
