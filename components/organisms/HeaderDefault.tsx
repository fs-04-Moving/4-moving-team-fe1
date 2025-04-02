// components/organisms/HeaderDefault.tsx
'use client';

import LogoText from '../atoms/LogoText';
import Image from 'next/image';
import NavigationText from '../atoms/NavigationText';
import IconButton from '../atoms/IconButton';
import LogoIconText from '../atoms/LogoIconText';
import HeaderTab from '../atoms/HeaderTab';
import icAlarm from '@/assets/images/ic-alarm.svg';
import icProfile from '@/assets/images/ic-profile.svg';
import icMenu from '@/assets/images/ic-menu.svg';

interface HeaderDefaultProps {
  onMenuClick?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const HeaderDefault = ({
  onMenuClick,
  isLoggedIn = false,
  userName,
}: HeaderDefaultProps) => {
  const navItems = isLoggedIn
    ? [
        { text: '받은 요청', to: '/received-quotes' },
        { text: '내 견적 관리', to: '/my-quotes' },
      ]
    : [
        { text: '견적 요청', to: '/quote-request' },
        { text: '기사님 찾기', to: '/find-technician' },
        { text: '내 견적 관리', to: '/my-quotes' },
      ];

  return (
    <header className="w-full border-b bg-white px-4 py-3 lg:px-[260px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6" style={{ width: 527 }}>
          <LogoIconText className="w-auto h-6" />

          <nav className="hidden sm:flex gap-6 text-sm">
            {navItems.map(({ text, to }) => (
              <NavigationText key={to} to={to} text={text} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <IconButton src={icAlarm.src} alt="알림" />
          <IconButton src={icProfile.src} alt="프로필" />
          <span className="text-sm text-gray-800 hidden sm:inline">
            {userName}
          </span>

          <div className="sm:block lg:hidden">
            <IconButton src={icMenu.src} alt="메뉴" onClick={onMenuClick} />
          </div>
        </div>
      </div>

      <div className="mt-3 lg:hidden">
        <HeaderTab
          items={[
            { label: '대기 중인 견적', isActive: true, onClick: () => {} },
            { label: '받았던 견적', isActive: false, onClick: () => {} },
          ]}
        />
      </div>
    </header>
  );
};

export default HeaderDefault;
