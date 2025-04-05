'use client';

import { Role } from '@/types/entities/user.entity';
import Link from 'next/link';
import LogoText from '../atoms/LogoText';

interface Props {
  userType: Role | null;
  isSignUpPage: boolean;
}

/**
 * 로그인/회원가입 페이지 상단
 * @param param0
 * @returns
 */
function AuthPageHeader({ isSignUpPage, userType }: Props) {
  const text1: string =
    userType === 'customer' ? '기사님이신가요?' : '일반 유저라면?';
  const text2: string =
    userType === 'customer' ? '기사님 전용 페이지' : '일반 유저 전용 페이지';

  const pageLink: string = isSignUpPage ? '/auth/sign-up' : '/auth/log-in';
  const linkQuery: string =
    userType === 'customer' ? '?userType=worker' : '?userType=customer';

  return (
    <div className="flex flex-col items-center mb-10 lg:mb-18">
      <div className="w-full h-[84px] lg:h-[100px] flex justify-center items-center lg:mb-2">
        <LogoText className="w-[112px] lg:w-[140px]" />
      </div>
      <div className="flex justify-center">
        <p className="mr-2 text-xs lg:text-xl text-Black-200">{text1}</p>
        <Link href={`${pageLink}${linkQuery}`}>
          <p className="text-xs lg:text-xl text-Primay-Blue-300 font-semibold underline">
            {text2}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AuthPageHeader;
