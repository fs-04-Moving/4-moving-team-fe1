import icChevronDownBlack from "@/assets/images/ic-chevron-down-black.svg";
import { sortOption } from "@/constants/dropdownSortConstants";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  selectedValue: sortOption;
  isOpen?: boolean;
  onClick: () => void;
}

function DropdownButtonSort({ selectedValue, isOpen = false, onClick }: Props) {
  // 아웃라인 스타일 없이 간단한 스타일 적용
  const buttonClassName = clsx(
    "w-[91px] md:w-[114px] lg:w-[114px] h-[32px] md:h-[40px] lg:h-[40px] px-1.5 md:px-2.5 lg:px-2.5 cursor-pointer rounded-lg text-xs md:text-sm lg:text-sm font-semibold text-Black-400"
  );

  return (
    <button className={buttonClassName} onClick={onClick}>
      <div className="w-full flex items-center justify-between">
        <span>{selectedValue}</span>
        <Image
          src={icChevronDownBlack}
          alt="펼치기 아이콘"
          className={`w-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </button>
  );
}

export default DropdownButtonSort;
