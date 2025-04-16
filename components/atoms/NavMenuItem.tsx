import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
}

function NavMenuItem({ children, onClick, isSelected = false }: Props) {
  return (
    <p
      className={`text-lg cursor-pointer active:opacity-50 ${
        isSelected
          ? 'text-black font-bold' // 선택된 경우: 검정색 + hover 없음
          : 'text-GrayScale-400 font-semibold hover:opacity-70' // 선택되지 않은 경우: 회색 + hover
      }`}
      onClick={onClick}
    >
      {children}
    </p>
  );
}

export default NavMenuItem;
