'use client';
import { useState } from 'react';
import GNBMenu from '@/components/molecules/GNBMenu';
import HeaderDefault from '@/components/organisms/HeaderDefault';
import HeaderLanding from '@/components/organisms/HeaderLanding';
import HeaderDefaultTech from '@/components/organisms/HeaderDefaultTech';

function Page() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <HeaderLanding onMenuClick={() => setMenuOpen(true)} />
      <HeaderDefault userName="임시" onMenuClick={() => setMenuOpen(true)} />
      <HeaderDefaultTech
        userName="임시"
        onMenuClick={() => setMenuOpen(true)}
      />
      컴포넌트 테스트페이지입니다.
      {isMenuOpen && (
        <GNBMenu
          items={[
            { text: '견적 요청', to: '/견적' },
            { text: '기사님 찾기', to: '/기사님' },
          ]}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default Page;
