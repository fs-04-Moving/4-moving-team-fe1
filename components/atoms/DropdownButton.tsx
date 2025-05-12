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

  // selectedValue의 길이에 따라 모바일/태블릿에서만 버튼 너비 클래스 결정
  // 더 세밀하게 너비 값 조정
  const mobileButtonWidthClass = clsx({
    // 매우 짧은 텍스트 (1-3글자)
    'min-w-[6rem]': selectedValue.length <= 3,

    // 짧은 텍스트 (4-5글자)
    'min-w-[7.5rem]': selectedValue.length > 3 && selectedValue.length <= 5,

    // 중간 텍스트 (6-8글자)
    'min-w-[8rem]': selectedValue.length > 5 && selectedValue.length <= 8,
  });

  const defaultClassName = clsx(
    'flex items-center justify-between px-4 h-[36px] border border-GrayScale-100 cursor-pointer rounded-lg font-medium text-Black-400',
    // 모바일/태블릿에서는 동적 너비, PC에서는 원래 스타일로 적용
    mobileButtonWidthClass,
    'lg:w-full lg:h-16 lg:rounded-2xl',
  );

  const activeClassName = clsx({
    '!bg-Primay-Blue-50': isActive,
  });

  const doneClassName = clsx({
    '!border-GrayScale-100 !text-Black-400': isDone,
  });

  return (
    <button className={clsx(defaultClassName, activeClassName, doneClassName)} onClick={onClick}>
      <div className="w-full flex items-center justify-between">
        <span className="text-sm lg:text-lg lg:whitespace-normal">{selectedValue}</span>
        <Image
          src={isActive ? icChevronDown : icChevronDownBlack}
          alt="펼치기 아이콘"
          className={`w-6 lg:w-9 ${
            status === 'active' ? 'rotate-180 transition' : 'rotate-0 transition'
          }`}
        />
      </div>
    </button>
  );
}

export default DropdownButton;
