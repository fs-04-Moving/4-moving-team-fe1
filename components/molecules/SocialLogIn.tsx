import icSocialGoogle from '@/assets/images/ic-social-google.svg';
import icSocialKakao from '@/assets/images/ic-social-kakao.svg';
import icSocialNaver from '@/assets/images/ic-social-naver.svg';
import Image from 'next/image';

function SocialLogIn() {
  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8 mt-12 lg:mt-18 text-xs lg:text-xl text-[#525252]">
      <p>SNS 계정으로 간편하게 시작하기</p>
      <div className="flex gap-8">
        <Image src={icSocialGoogle} alt="구글" />
        <Image src={icSocialKakao} alt="카카오" />
        <Image src={icSocialNaver} alt="네이버" />
      </div>
    </div>
  );
}

export default SocialLogIn;
