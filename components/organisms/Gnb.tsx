import LogoIconText from "../atoms/LogoIconText";
import NavMenuGnb from "../molecules/NavMenuGnb";
import SubTab from "../molecules/SubTab";
import ButtonAuth from "./ButtonAuth";

interface GnbProps {
  onOpenMenu: () => void;
}

/**
 * 상단 Gnb 메뉴(헤더)
 * @param param0 onOpenMenu: 태블릿/모바일에서 사용하는 우측 슬라이드 메뉴 토글 함수
 * @returns
 */
function Gnb({ onOpenMenu }: GnbProps) {
  return (
    <header className="flex flex-col items-center justify-center sticky z-20 top-0 backdrop-blur-3xl border-b-1 border-GrayScale-100">
      <div
        className="flex justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px] h-16 lg:h-22"
        // className={`flex justify-between items-center h-22 ${
        //   !isLoggedIn
        //     ? 'px-6 md:px-8 lg:px-[120px]'
        //     : 'px-6 md:px-18 lg:px-[260px]'
        // }`}
      >
        <LogoIconText className="w-[88px] lg:w-[116px]" />
        <NavMenuGnb />
        <div className="shrink-0">
          <ButtonAuth onOpenMenu={onOpenMenu} />
        </div>
      </div>
      <SubTab />
    </header>
  );
}

export default Gnb;
