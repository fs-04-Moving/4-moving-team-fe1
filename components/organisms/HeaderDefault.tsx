'use client';

import Image from 'next/image';
import LogoIconText from '../atoms/LogoIconText';
import NavigationText from '../atoms/NavigationText';
import IconButton from '../atoms/IconButton';
import HeaderTab from '../atoms/HeaderTab';
import icAlarm from '@/assets/images/ic-alarm.svg';
import icProfile from '@/assets/images/ic-profile.svg';
import icMenu from '@/assets/images/ic-menu.svg';
import icMobileLogo from '@/assets/images/logo-only-icon.svg';

interface HeaderDefaultProps {
  onMenuClick?: () => void;
  userName?: string;
}

const HeaderDefault = ({ onMenuClick, userName }: HeaderDefaultProps) => {
  const navItems = [
    { text: '견적 요청', to: '/quote-request' },
    { text: '기사님 찾기', to: '/find-technician' },
    { text: '내 견적 관리', to: '/my-quotes' },
  ];

  return (
    <>
      <header className="w-full flex justify-between items-center px-4 lg:px-[120px] py-3">
        <div className="flex items-center gap-6" style={{ width: 527 }}>
          <div className="block sm:hidden">
            <Image
              src={icMobileLogo}
              alt="모바일 로고"
              width={88}
              height={34}
              className="w-[88px] h-[34px] md:w-[88px] md:h-[34px] lg:w-[116px] lg:h-[44px]"
            />
          </div>

          <div className="hidden sm:block">
            <LogoIconText className="w-[88px] h-[34px] md:w-[88px] md:h-[34px] lg:w-[116px] lg:h-[44px]" />
          </div>

          <nav className="hidden sm:flex gap-6 text-sm">
            {navItems.map(({ text, to }) => (
              <NavigationText key={to} to={to} text={text} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <IconButton src={icAlarm.src} alt="알림" />
          <IconButton src={icProfile.src} alt="프로필" />
          <span className="text-sm text-gray-800 hidden lg:inline">
            {userName}
          </span>

          <div className="block lg:hidden">
            <IconButton src={icMenu.src} alt="메뉴" onClick={onMenuClick} />
          </div>
        </div>
      </header>

      <div className="mt-3 px-4 lg:px-[120px] lg:hidden">
        <HeaderTab
          items={[
            { label: '대기 중인 견적', isActive: true, onClick: () => {} },
            { label: '받았던 견적', isActive: false, onClick: () => {} },
          ]}
        />
      </div>
    </>
  );
};

export default HeaderDefault;
