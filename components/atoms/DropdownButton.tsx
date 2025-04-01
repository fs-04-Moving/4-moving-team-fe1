import icChevronDownBlack from '@/assets/images/ic-chevron-down-black.svg';
import icChevronDown from '@/assets/images/ic-chevron-down.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { DropdownButtonStatus } from '../molecules/Dropdown';

interface Props<T> {
  selectedValue: T;
  status?: DropdownButtonStatus;
  onClick: () => void;
}

/**
 * dropdown button(상단부) 컴포넌트입니다.
 *  - UI상태: default, active, done(default상태 사용 케이스가 없음)
 * @param param0
 * - selectedValue: 현재 선택된 값(제네릭 타입)
 * - status: UI상태(DropdownButtonStatus)
 * - onClick: 버튼 클릭 시 실행 함수(void)
 * @returns
 */
function DropdownButton<T extends string>({
  selectedValue,
  status = 'default',
  onClick,
}: Props<T>) {
  const isActive = status === 'active';
  const isDone = status === 'done';

  const defaultClassName = clsx(
    'w-full flex items-center px-6 h-[54px] lg:h-16 border border-Primay-Blue-300 cursor-pointer rounded-2xl lg:text-lg font-semibold text-Primay-Blue-300'
  );

  const activeClassName = clsx({
    '!bg-Primay-Blue-50': isActive,
  });

  const doneClassName = clsx({
    '!border-GrayScale-100 !text-Black-400': isDone,
  });

  return (
    <button
      className={clsx(defaultClassName, activeClassName, doneClassName)}
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-between">
        <span>{selectedValue}</span>
        <Image
          src={isActive ? icChevronDown : icChevronDownBlack}
          alt="펼치기 아이콘"
          className={`w-6 lg:w-9 ${
            status === 'active'
              ? 'rotate-180 transition'
              : 'rotate-0 transition'
          }`}
        />
      </div>
    </button>
  );
}

export default DropdownButton;
