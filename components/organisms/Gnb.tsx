'use client';

import { useAuth } from '@/contexts/AuthContext';
import LogoIconText from '../atoms/LogoIconText';
import ButtonAuth from '../molecules/ButtonAuth';

function Gnb() {
  const { isAuthInitialized } = useAuth();

  return (
    <div
      className="flex justify-between items-center h-22 px-6 md:px-18 lg:px-[260px]"
      // className={`flex justify-between items-center h-22 ${
      //   !isLoggedIn
      //     ? 'px-6 md:px-8 lg:px-[120px]'
      //     : 'px-6 md:px-18 lg:px-[260px]'
      // }`}
    >
      <LogoIconText className="w-[116px]" />
      {isAuthInitialized && <ButtonAuth />}
    </div>
  );
}

export default Gnb;
