"use client";

import {
  DEFAULT_SORT_OPTION,
  sortOption,
} from "@/constants/dropdownSortConstants";
import { useEffect, useRef, useState } from "react";
import DropdownButtonSort from "../atoms/DropdownButtonSort";
import DropdownListSort from "../atoms/DropdownListSort";

interface Props {
  options: sortOption[];
  defaultValue?: sortOption;
  onChange?: (value: sortOption) => void;
  className?: string;
}

function DropdownSort({
  options,
  defaultValue = DEFAULT_SORT_OPTION,
  onChange,
  className = "",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<sortOption>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: sortOption) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <DropdownButtonSort
        selectedValue={selectedValue}
        isOpen={isOpen}
        onClick={handleToggle}
      />
      <DropdownListSort
        options={options}
        selectedValue={selectedValue}
        isOpen={isOpen}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default DropdownSort;
