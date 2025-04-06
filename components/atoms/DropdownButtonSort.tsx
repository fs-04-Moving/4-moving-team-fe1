import icChevronDownBlack from '@/assets/images/ic-chevron-down-black.svg';
import { SortOption } from '@/constants/DropdownSort';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  selectedValue: SortOption;
  isOpen?: boolean;
  onClick: () => void;
}

function DropdownButtonSort({ selectedValue, isOpen = false, onClick }: Props) {
  // 아웃라인 스타일 없이 간단한 스타일 적용
  const buttonClassName = clsx(
    'w-full flex items-center px-4 h-[40px] lg:h-12 cursor-pointer rounded-lg lg:text-base font-medium text-Black-400'
  );

  return (
    <button className={buttonClassName} onClick={onClick}>
      <div className='w-full flex items-center justify-between'>
        <span>{selectedValue}</span>
        <Image
          src={icChevronDownBlack}
          alt='펼치기 아이콘'
          className={`w-5 lg:w-6 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
    </button>
  );
}

export default DropdownButtonSort;
