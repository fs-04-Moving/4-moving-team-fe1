import icLike from '@/assets/images/ic-like.svg';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

/**
 * 좋아요 버튼입니다.
 * @param param0
 * - onClick: 클릭 시 실행 함수
 * @returns
 */
function ButtonLikeOutlined({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center cursor-pointer w-[54px] lg:w-16 h-[54px] lg:h-16 rounded-2xl border border-Line-200"
    >
      <Image src={icLike} alt="좋아요" className="w-6 lg:w-9" />
    </div>
  );
}

export default ButtonLikeOutlined;
