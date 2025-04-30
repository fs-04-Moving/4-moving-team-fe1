import authApi from '@/api/auth/auth.api';
import icSocialGoogle from '@/assets/images/ic-social-google.svg';
import icSocialKakao from '@/assets/images/ic-social-kakao.svg';
import icSocialNaver from '@/assets/images/ic-social-naver.svg';
import Image from 'next/image';

/**
 * 로그인/회원가입 페이지의 '소셜 로그인' 위젯
 * @returns
 */
function AuthSocialLogIn() {
  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8 mt-12 lg:mt-18 text-xs lg:text-xl text-Black-200">
      <p>SNS 계정으로 간편하게 시작하기</p>
      <div className="flex gap-8">
        <button
          onClick={() => authApi.handleOAuthLogin('google')}
          className="cursor-pointer hover:opacity-70"
        >
          <Image src={icSocialGoogle} alt="구글" />
        </button>
        <button
          onClick={() => authApi.handleOAuthLogin('kakao')}
          className="cursor-pointer hover:opacity-70"
        >
          <Image src={icSocialKakao} alt="카카오" />
        </button>
        <button
          onClick={() => authApi.handleOAuthLogin('naver')}
          className="cursor-pointer hover:opacity-70"
        >
          <Image src={icSocialNaver} alt="네이버" />
        </button>
      </div>
    </div>
  );
}

export default AuthSocialLogIn;
