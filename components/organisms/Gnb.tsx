'use client';

import LogoIconText from '../atoms/LogoIconText';
import ButtonAuth from '../molecules/ButtonAuth';
import NavMenuGnb from '../molecules/NavMenuGnb';

function Gnb() {
  return (
    <header className="sticky z-20 top-0">
      <div
        className="flex sticky justify-between items-center h-22 px-6 md:px-18 lg:px-[260px] backdrop-blur-3xl"
        // className={`flex justify-between items-center h-22 ${
        //   !isLoggedIn
        //     ? 'px-6 md:px-8 lg:px-[120px]'
        //     : 'px-6 md:px-18 lg:px-[260px]'
        // }`}
      >
        <LogoIconText className="w-[116px]" />
        <NavMenuGnb />
        <div className="shrink-0">
          <ButtonAuth />
        </div>
      </div>
    </header>
  );
}

export default Gnb;
