import clsx from 'clsx';

interface ChipBubbleTypeBoxProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  isSelectable?: boolean;
}

function ChipBubbleTypeBox({
  text,
  isSelected = false,
  onClick,
  isSelectable = true,
}: ChipBubbleTypeBoxProps) {
  return (
    <div
      className={clsx(
        'rounded-full px-3 lg:px-5 py-1.5 lg:py-2.5 text-sm lg:text-lg font-medium transition-colors duration-200 border',
        isSelectable &&
          'cursor-pointer hover:border-[#1B92FF] hover:text-[#1B92FF] hover:bg-[#1B92FF10]',
        isSelected
          ? 'border-[#1B92FF] text-[#1B92FF] bg-[#1B92FF10]'
          : 'border-[#DEDEDE] text-black bg-[#FAFAFA]'
      )}
      onClick={isSelectable ? onClick : undefined}
      role={isSelectable ? 'button' : 'presentation'}
    >
      {text}
    </div>
  );
}

export default ChipBubbleTypeBox;
