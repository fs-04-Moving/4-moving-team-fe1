import icChevronDownBlack from '@/assets/images/ic-chevron-down-black.svg';
import icChevronDown from '@/assets/images/ic-chevron-down.svg';
import clsx from 'clsx';
import Image from 'next/image';

// DropdownArea에서만 사용할 상태 타입 정의
export type AreaDropdownButtonStatus = 'default' | 'active' | 'done';

interface Props {
  selectedValue: string;
  status: AreaDropdownButtonStatus;
  onClick: () => void;
}

/**
 * DropdownArea 컴포넌트에서 사용하는 드롭다운 버튼 컴포넌트
 * @param selectedValue 선택된 값을 표시
 * @param status 버튼의 상태 (default, active, done)
 * @param onClick 버튼 클릭 시 실행할 함수
 */
function DropdownButtonArea({
  selectedValue,
  status = 'default',
  onClick,
}: Props) {
  const isActive = status === 'active';
  const isDone = status === 'done';

  const defaultClassName = clsx(
    'w-full flex items-center justify-between px-4 h-[54px] lg:h-16 border border-GrayScale-100 cursor-pointer rounded-2xl lg:text-lg font-medium text-Black-400'
  );

  const activeClassName = clsx({
    'border-Primay-Blue-300 bg-Primay-Blue-50': isActive,
  });

  const doneClassName = clsx({
    'border-Primay-Blue-300': isDone,
  });

  return (
    <button
      className={clsx(defaultClassName, activeClassName, doneClassName)}
      onClick={onClick}
    >
      <div className='w-full flex items-center justify-between'>
        <span>{selectedValue}</span>
        <Image
          src={isActive ? icChevronDown : icChevronDownBlack}
          alt='펼치기 아이콘'
          className={`w-6 lg:w-8 ${
            isActive ? 'rotate-180 transition' : 'rotate-0 transition'
          }`}
        />
      </div>
    </button>
  );
}

export default DropdownButtonArea;
