'use client';
import IconButton from '../atoms/IconButton';
import NavigationText from '../atoms/NavigationText';
import LogoIconText from '../atoms/LogoIconText';
import icMenu from '@/assets/images/ic-menu.svg';

interface HeaderLandingProps {
  onMenuClick?: () => void;
}

const HeaderLanding = ({ onMenuClick }: HeaderLandingProps) => {
  return (
    <header className="w-full">
      <div className="flex items-center gap-">
        <LogoIconText className="w-auto h-6" />
      </div>
      <div className="block sm:hidden md:hidden">
        <NavigationText to="/기사님페이지" text="기사님 찾기" />
      </div>
      <div className="block lg:hidden">
        <IconButton src={icMenu.src} alt="메뉴" onClick={onMenuClick} />
      </div>
      <div className="hidden lg:block">로그인버튼 넣어야함</div>
    </header>
  );
};

export default HeaderLanding;
