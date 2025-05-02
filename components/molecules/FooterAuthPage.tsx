import ROUTES from '@/constants/routes';
import { Role } from '@/types/entities/user.entity';
import Link from 'next/link';
import AuthSocialLogIn from './AuthSocialLogIn';

interface Props {
  role: Role | null;
  isSignUpPage: boolean;
}

/**
 * 로그인/회원가입 페이지 하단
 * @param param0
 * @returns
 */
function FooterAuthPage({ isSignUpPage, role }: Props) {
  const text1: string = isSignUpPage
    ? '이미 무빙 회원이신가요?'
    : '아직 무빙 회원이 아니신가요?';
  const text2: string = isSignUpPage ? '로그인' : '이메일로 회원가입하기';

  const pageLink: string = isSignUpPage ? ROUTES.LOG_IN : ROUTES.SIGN_UP;
  const linkQuery: string =
    role === 'customer' ? '?role=customer' : '?role=worker';

  return (
    <div>
      <div className="flex justify-center mt-4 lg:mt-6">
        <p className="mr-2 text-xs lg:text-xl text-Black-200">{text1}</p>
        <p className="text-xs lg:text-xl text-Primay-Blue-300 font-semibold underline">
          <Link href={`${pageLink}${linkQuery}`}>{text2}</Link>
        </p>
      </div>
      <AuthSocialLogIn role={role} />
    </div>
  );
}

export default FooterAuthPage;
