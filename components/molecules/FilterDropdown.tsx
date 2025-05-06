// components/molecules/FilterDropdown.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  options: string[];
  onSelect: (selected: string) => void;
}

const FilterDropdown = ({ options, onSelect }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-[190px] h-[64px] px-6 py-4 text-[#1890FF] text-[18px] bg-[#F5FAFF] border border-[#1B92FF] rounded-xl shadow-sm"
      >
        {selected}
        <ChevronDown className="w-4 h-4 text-[#1890FF]" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-[328px] rounded-4 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="block w-full text-left text-4 px-6 py-4 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
