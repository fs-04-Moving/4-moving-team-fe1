import icClip from '@/assets/images/ic-clip.svg';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

/**
 * 링크 복사 등에 사용됩니다.
 * @param param0
 * - onClick: 클릭 시 실행 함수
 * @returns
 */
function ButtonClipOutlined({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex justify-center border border-Line-200 cursor-pointer md:rounded-2xl lg:rounded-2xl rounded-lg  items-center w-10 h-10 md:w-[54px] md:h-[54px] lg:w-16 lg:h-16 bg-GrayScale-50"
    >
      <Image src={icClip} alt="클립아이콘" className="w-6 lg:w-9" />
    </div>
  );
}

export default ButtonClipOutlined;
