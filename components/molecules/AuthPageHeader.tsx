import useDeviceSize from '@/hooks/useDeviceSize';
import Link from 'next/link';
import LogoText from '../atoms/LogoText';

interface Props {
  userType: string | null;
  isSignUpPage: boolean;
}

function AuthPageHeader({ isSignUpPage, userType }: Props) {
  const { isDeskTop } = useDeviceSize();

  const text1: string =
    userType === 'user' ? '기사님이신가요?' : '일반 유저라면?';
  const text2: string =
    userType === 'user' ? '기사님 전용 페이지' : '일반 유저 전용 페이지';

  const pageLink: string = isSignUpPage ? '/auth/sign-up' : '/auth/log-in';
  const linkQuery: string = userType === 'user' ? '?type=worker' : '?type=user';

  return (
    <div className="flex flex-col items-center mb-10 lg:mb-18">
      <div className="w-full h-[84px] lg:h-[100px] flex justify-center items-center lg:mb-2">
        <LogoText width={isDeskTop ? 140 : 112} />
      </div>
      <div className="flex justify-center">
        <p className="mr-2 text-xs lg:text-xl text-[#525252]">{text1}</p>
        <Link href={`${pageLink}${linkQuery}`}>
          <p className="text-xs lg:text-xl text-[#4890f9] font-semibold underline">
            {text2}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AuthPageHeader;
