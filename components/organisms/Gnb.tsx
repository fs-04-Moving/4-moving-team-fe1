import LogoIconText from '../atoms/LogoIconText';
import ButtonAuth from '../molecules/ButtonAuth';
import NavMenuGnb from '../molecules/NavMenuGnb';
import SubTab from '../molecules/SubTab';

function Gnb() {
  return (
    <header className="sticky z-20 top-0 backdrop-blur-3xl border-b-1 border-GrayScale-100">
      <div
        className="flex justify-between items-center h-22 px-6 md:px-18 lg:px-[200px]"
        // className={`flex justify-between items-center h-22 ${
        //   !isLoggedIn
        //     ? 'px-6 md:px-8 lg:px-[120px]'
        //     : 'px-6 md:px-18 lg:px-[260px]'
        // }`}
      >
        <LogoIconText className="w-[88px] lg:w-[116px]" />
        <NavMenuGnb />
        <div className="shrink-0">
          <ButtonAuth />
        </div>
      </div>
      <SubTab />
    </header>
  );
}

export default Gnb;
