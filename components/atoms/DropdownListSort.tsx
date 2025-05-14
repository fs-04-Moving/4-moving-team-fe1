import { sortOption as T } from '@/constants/dropdownSortConstants';
import clsx from 'clsx';

interface Props<T extends string> {
  options: T[];
  selectedValue: T;
  isOpen: boolean;
  onSelect: (value: T) => void;
}

function DropdownListSort<T extends string>({
  options,
  selectedValue,
  isOpen,
  onSelect,
}: Props<T>) {
  if (!isOpen) return null;

  return (
    <ul className="absolute mt-1 bg-white rounded-lg shadow-md overflow-hidden text-xs md:text-sm lg:text-sm">
      {options.map((option) => (
        <li
          key={option}
          className={clsx(
            'w-[91px] md:w-[114px] lg:w-[114px] h-[32px] md:h-[40px] lg:h-[40px] px-1.5 md:px-2.5 lg:px-2.5 flex items-center cursor-pointer hover:bg-Primay-Blue-50 transition-colors',
            {
              'font-medium': option === selectedValue,
            },
          )}
          onClick={() => onSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

export default DropdownListSort;
