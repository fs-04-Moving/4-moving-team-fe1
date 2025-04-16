import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function NavMenuItem({ children, onClick, ...props }: Props) {
  return (
    <p
      className="text-lg font-bold text-Black-400 cursor-pointer hover:opacity-40 active:opacity-20"
      onClick={onClick}
      {...props}
    >
      {children}
    </p>
  );
}

export default NavMenuItem;
