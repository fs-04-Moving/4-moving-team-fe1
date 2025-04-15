import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function SlideMenuItem({ children, onClick }: Props) {
  return (
    <div className="pl-5 py-6" onClick={onClick}>
      {children}
    </div>
  );
}

export default SlideMenuItem;
