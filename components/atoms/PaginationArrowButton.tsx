/**
 * 페이지네이션에서 사용되는 화살표 버튼 컴포넌트
 * left svg로 방향을 돌려서 사용중
 * @param direction 화살표 방향 ('left' 또는 'right')
 * @param disabled 비활성화 상태
 * @param onClick 클릭 이벤트 핸들러
 */

import icChevronLeftBlack from '@/assets/images/ic-chevron-left-black.svg';
import icChevronLeftGray from '@/assets/images/ic-chevron-left-gray.svg';
import clsx from 'clsx';
import Image from 'next/image';

interface PaginationArrowButtonProps {
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}

function PaginationArrowButton({
  direction,
  disabled = false,
  onClick,
}: PaginationArrowButtonProps) {
  // 버튼 스타일
  const buttonClass = clsx(
    'flex items-center justify-center rounded-md transition-colors',
    'w-[34px] h-[34px] lg:w-[48px] lg:h-[48px]',
    {
      'opacity-50 cursor-not-allowed': disabled,
      'hover:bg-Primay-Blue-50 cursor-pointer': !disabled,
    }
  );

  // 이미지 선택 (비활성화 상태에 따라)
  const imageSource = disabled ? icChevronLeftGray : icChevronLeftBlack;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? '이전 페이지' : '다음 페이지'}
    >
      <Image
        src={imageSource}
        alt={direction === 'left' ? '이전' : '다음'}
        className={clsx('w-2 h-3.5', { 'rotate-180': direction === 'right' })}
      />
    </button>
  );
}

export default PaginationArrowButton;
