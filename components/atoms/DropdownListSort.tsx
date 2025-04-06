import { SortOption } from '@/constants/DropdownSort';
import clsx from 'clsx';

interface Props {
  options: SortOption[];
  selectedValue: SortOption;
  isOpen: boolean;
  onSelect: (value: SortOption) => void;
}

function DropdownListSort({ options, selectedValue, isOpen, onSelect }: Props) {
  if (!isOpen) return null;

  return (
    <ul className='absolute z-10 w-full mt-1 bg-white rounded-lg shadow-md overflow-hidden'>
      {options.map((option) => (
        <li
          key={option}
          className={clsx(
            'px-4 py-3 cursor-pointer hover:bg-Primay-Blue-50 transition-colors',
            {
              'font-medium': option === selectedValue,
            }
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
