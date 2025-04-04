import icKakaoBubble from '@/assets/images/ic-kakao-bubble.svg';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

/**
 * 카카오 공유하기 버튼입니다.
 * 기사님 공유 등에 사용됩니다.
 * @param param0
 * - onClick: 클릭 시 실행 함수
 * @returns
 */
function ButtonShareKakao({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex justify-center cursor-pointer md:rounded-2xl lg:rounded-2xl rounded-lg  items-center w-10 h-10 md:w-[54px] md:h-[54px] lg:w-16 lg:h-16 bg-[#fae100]"
    >
      <Image src={icKakaoBubble} alt="카카오아이콘" className="w-6 lg:w-7" />
    </div>
  );
}

export default ButtonShareKakao;
