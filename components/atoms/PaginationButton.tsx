/**
 * 페이지네이션에서 사용되는 숫자 버튼 컴포넌트
 * @param page 페이지 번호
 * @param isActive 활성화 상태 (현재 페이지 여부)
 * @param onClick 클릭 이벤트 핸들러
 */

import clsx from 'clsx';

interface PaginationButtonProps {
  page: number;
  isActive?: boolean;
  onClick: () => void;
}

function PaginationButton({ page, isActive = false, onClick }: PaginationButtonProps) {
  // 버튼 스타일
  const buttonClass = clsx(
    'flex items-center justify-center rounded-md transition-colors',
    'w-[34px] h-[34px] bg-GrayScale-50 text-base lg:w-[48px] lg:h-[48px] lg:text-lg font-semibold',
    {
      ' text-black': isActive,
      'text-GrayScale-200 hover:bg-Primay-Blue-50': !isActive,
    },
  );

  return (
    <button className={buttonClass} onClick={onClick} aria-current={isActive ? 'page' : undefined}>
      {page}
    </button>
  );
}

export default PaginationButton;
