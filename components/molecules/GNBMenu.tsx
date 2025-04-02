'use client';
import NavigationText from '../atoms/NavigationText';
import CloseButton from '../atoms/CloseButton';

interface GNBMenuProps {
  items: { text: string; to: string }[];
  onClose: () => void;
}

const GNBMenu = ({ items = [], onClose }: GNBMenuProps) => {
  return (
    <div>
      <CloseButton onClick={onClose} />
      {items.map(({ text, to }) => (
        <NavigationText key={to} to={to} text={text} />
      ))}
    </div>
  );
};

export default GNBMenu;
