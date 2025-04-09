'use client';
import IconButton from '../atoms/IconButton';
import NavigationText from '../atoms/NavigationText';
import LogoIconText from '../atoms/LogoIconText';
import icMenu from '@/assets/images/ic-menu.svg';
import { useRouter } from 'next/navigation';

interface HeaderLandingProps {
  onMenuClick?: () => void;
}

const HeaderLanding = ({ onMenuClick }: HeaderLandingProps) => {
  const router = useRouter();

  return (
    <header className="w-full flex justify-between items-center px-4 lg:px-[120px] py-3">
      <div className="flex items-center gap-4">
        <LogoIconText className="w-[88px] h-[34px] lg:w-[116px] lg:h-[44px]" />

        <div className="hidden lg:block">
          <NavigationText
            to="/find-technician"
            text="기사님 찾기"
            className="text-[14px] font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="block lg:hidden">
          <IconButton src={icMenu.src} alt="메뉴" onClick={onMenuClick} />
        </div>

        <div className="hidden lg:block">
          <button
            onClick={() => router.push('/login')}
            className="w-[116px] h-[44px] bg-Primay-Blue-300 hover:bg-Primay-Blue-200 text-GrayScale-50 font-semibold text-[16px] rounded-[16px]"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLanding;
