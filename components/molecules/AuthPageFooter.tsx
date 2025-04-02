import { Role } from '@/types/dtos/user.dto';
import Link from 'next/link';
import SocialLogIn from './SocialLogIn';

interface Props {
  userType: Role | null;
  isSignUpPage: boolean;
}

function AuthPageFooter({ isSignUpPage, userType }: Props) {
  const text1: string = isSignUpPage
    ? '이미 무빙 회원이신가요?'
    : '아직 무빙 회원이 아니신가요?';
  const text2: string = isSignUpPage ? '로그인' : '이메일로 회원가입하기';

  const pageLink: string = isSignUpPage ? '/auth/log-in' : '/auth/sign-up';
  const linkQuery: string =
    userType === 'customer' ? '?type=customer' : '?type=worker';

  return (
    <div>
      <div className="flex justify-center mt-4 lg:mt-6">
        <p className="mr-2 text-xs lg:text-xl text-Black-200">{text1}</p>
        <Link href={`${pageLink}${linkQuery}`}>
          <p className="text-xs lg:text-xl text-Primay-Blue-300 font-semibold underline">
            {text2}
          </p>
        </Link>
      </div>
      <SocialLogIn />
    </div>
  );
}

export default AuthPageFooter;
