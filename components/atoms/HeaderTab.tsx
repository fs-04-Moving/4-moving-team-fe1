'use client';

import { useState } from 'react';

interface HeaderTabItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface HeaderTabProps {
  items: HeaderTabItem[];
  onChange?: (selected: string) => void;
}

const HeaderTab = ({ items, onChange }: HeaderTabProps) => {
  const [active, setActive] = useState(items[0]?.label);

  return (
    <div className="flex gap-6 text-sm">
      {items.map(({ label }) => (
        <button
          key={label}
          onClick={() => {
            setActive(label);
            onChange?.(label);
          }}
          className={`pb-1 border-b-2 transition-colors duration-200 ${
            active === label
              ? 'font-semibold border-blue-500 text-basalack'
              : 'border-transparent text-gray-400'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default HeaderTab;
