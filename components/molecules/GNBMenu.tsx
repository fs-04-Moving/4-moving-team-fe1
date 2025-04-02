'use client';
import NavigationText from '../atoms/NavigationText';
import CloseButton from '../atoms/CloseButton';

interface GNBMenuProps {
  items: { text: string; to: string }[];
  onClose: () => void;
}

const GNBMenu = ({ items = [], onClose }: GNBMenuProps) => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transition-transform transform translate-x-0">
      <div className="p-4">
        <CloseButton onClick={onClose} />
        <div className="mt-4 flex flex-col ">
          {items.map(({ text, to }) => (
            <div key={to} className="w-[220px] h-[74px] flex items-center">
              <NavigationText to={to} text={text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GNBMenu;
