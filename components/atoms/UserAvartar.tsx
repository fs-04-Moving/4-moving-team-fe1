import avatar_1 from '@/assets/images/avatartion-1.svg';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  imgUrl: string;
  sizeInLarge?: number;
  isResponsive?: boolean;
};
/**
 * UserAvartar 컴포넌트
 *
 * 사용자 이미지 URL(`imgUrl`)을 받아 원형으로 렌더링하며,
 * 이미지가 없을 경우 기본 아바타 이미지로 대체됩니다.
 *
 *  @param {string} [imgUrl] - 사용자 프로필 이미지 URL. 없으면 기본 이미지로 대체됨.
 *  @param {number} [sizeInLarge] - screen 사이즈가 lg 일때의 크기, ( 기본값 56, 80, 96 중 택1)
 *  @param {boolean} isResponsive - 기본값:true, false면 반응형을 적용하지 않고, 크기를 sm으로 고정
 *
 * @example <UserAvatar imgUrl="https://example.com/profile.jpg" sizeInLarge={80} isResponsive={false} />
 *
 */

function UserAvartar({ imgUrl, sizeInLarge = 56, isResponsive = true }: Props) {
  const sizeClassNames = clsx({
    'lg:h-[56px] lg:w-[56px]': sizeInLarge === 56,
    'lg:h-[80px] lg:w-[80px]': sizeInLarge === 80,
    'lg:h-[96px] lg:w-[96px]': sizeInLarge === 96,
  });
  return (
    <Image
      className={clsx(
        isResponsive ? sizeClassNames : '',
        'inline-block rounded-full border-2 border-Primay-Blue-400 w-[46px] h-[46px] object-cover',
      )}
      src={imgUrl || avatar_1}
      width={isResponsive ? 56 : 46}
      height={isResponsive ? 56 : 46}
      alt="기사 프로필 사진"
    />
  );
}

export default UserAvartar;
