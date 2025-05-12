import imgEmptyList from '@/assets/images/img-empty-review.svg';
import Image from 'next/image';
import Link from 'next/link';
import ButtonSolid from '../atoms/ButtonSolid';

interface Props {
  message: string;
  isUsingButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

/**
 *
 * @param param0 message: 표시되는 메시지입니다. (e.g. "찜한 기사님이 없습니다.")
 * @param param1 buttonText: 버튼에 표시되는 텍스트입니다. (e.g. "리뷰 작성하러 가기")
 * @param param2 isButton: 버튼을 표시할지 여부입니다. 기본값은 false입니다.
 * @param param3 link: 버튼 클릭 시 이동할 링크입니다. (e.g. "ROUTES.REVIEW.PENDING")
 * @returns
 */
function EmptyListMessage({ message, buttonText, isUsingButton = false, buttonLink }: Props) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center mt-20 lg:mt-30">
        <div className="w-[110px] h-[82px] lg:w-[185px] lg:h-[136px]">
          <Image src={imgEmptyList} alt="목록없음" layout="responsive" />
        </div>
        <h1 className="mt-6 mb-6 lg:mt-8 lg:mb-8 text-center text-gray-400 text-[12px] lg:text-[24px] ">
          {message}
        </h1>
        {isUsingButton && (
          <Link href={`${buttonLink}`} passHref>
            <div className="w-[151px] h-[54px] lg:w-[180px] lg:h-[64px] ">
              <ButtonSolid className="w-full h-full flex items-center justify-center text-[16px] lg:text-[20px]">
                {buttonText}
              </ButtonSolid>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default EmptyListMessage;
