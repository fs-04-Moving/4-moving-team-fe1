import Image from 'next/image';
import avatar_1 from '@/assets/images/avatartion-1.svg';

/**
 * 사용자 프로필 이미지 컴포넌트
 *
 * 사용자 이미지 URL(`imgUrl`)을 받아 원형으로 렌더링하며,
 * 이미지가 없을 경우 기본 아바타 이미지로 대체됩니다.
 * 반응형 사이즈(모바일: 46x46, 데스크탑: 56x56)로 자동 적용됩니다.
 *
 *  @param {string} [imgUrl] - 사용자 프로필 이미지 URL. 없으면 기본 이미지로 대체됨.
 *
 * @example <UserAvatar imgUrl="https://example.com/profile.jpg" />
 *
 * @example
 * //이미지가 없을 경우 기본 이미지가 렌더링됨
 * <UserAvatar />
 */
function UserAvartar({ imgUrl }: { imgUrl?: string }) {
  return (
    <Image
      className="inline-block rounded-full border-2 border-Primay-Blue-400 w-[46px] h-[46px] lg:w-[56px] lg:h-[56px] object-cover"
      src={imgUrl || avatar_1}
      width={56}
      height={56}
      alt="기사 프로필 사진"
    />
  );
}

export default UserAvartar;
