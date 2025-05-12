/**
 * - 인터페이스 속성 설명
 * @property {string} text - 칩 버블 내부 텍스트
 * @property {boolean} [isSelected=false] - 선택 상태값
 * @property {() => void} [onClick] - 클릭 이벤트 핸들러
 * @property {boolean} [canClick=true] - 선택가능여부(상세에서false/입력페이지 true)
 */

import clsx from 'clsx';

interface ChipBubbleTypeBoxProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  canClick?: boolean;
}
function ChipBubbleTypeBox({
  text,
  isSelected = false,
  onClick,
  canClick = true,
}: ChipBubbleTypeBoxProps) {
  return (
    <div
      className={clsx(
        'rounded-full px-3 lg:px-5 py-1.5 lg:py-2.5 text-sm lg:text-lg font-medium transition-colors duration-200 border',
        canClick &&
          !isSelected &&
          'cursor-pointer hover:border-Primay-Blue-300 hover:text-Primay-Blue-300 hover:bg-Primay-Blue-300/10',
        canClick &&
          isSelected &&
          'cursor-pointer hover:border-[#FF4F64] hover:text-[#FF4F64] hover:bg-[#FF4F6410]',
        isSelected
          ? 'border-Primay-Blue-300 text-Primay-Blue-300 bg-Primay-Blue-300/10'
          : 'border-GrayScale-100 text-black bg-BackGround-100/10',
      )}
      onClick={canClick ? onClick : undefined}
      role={canClick ? 'button' : 'presentation'}
    >
      {text}
    </div>
  );
}

export default ChipBubbleTypeBox;
