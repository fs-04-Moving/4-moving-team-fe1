'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

interface TabItem {
  label: string;
  route: string;
}

interface TabMenuProps {
  tabs: TabItem[];
}

/**
 * Gnb하단의 서브 메뉴에 사용되는 탭 메뉴입니다.
 * @param tabs: TabItem형태를 배열로 받습니다.
 * - label: 탭 메뉴 명칭
 * - route: 탭 메뉴 클릭 시 이동할 경로
 * @returns
 */
function TabMenu({ tabs }: TabMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (route: string) => {
    if (pathname !== route) router.push(route);
  };

  return (
    <div className="flex items-center gap-8 h-16">
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;

        return (
          <button
            key={tab.route}
            onClick={() => handleClick(tab.route)}
            className={clsx(
              'relative flex items-center h-16 text-xl font-semibold transition-colors duration-200 cursor-pointer active:opacity-70',
              isActive ? 'text-Black-400' : 'text-GrayScale-400'
            )}
          >
            <p>{tab.label}</p>
            {isActive && (
              <div className="absolute bottom-0 bg-Black-400 w-full h-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TabMenu;
