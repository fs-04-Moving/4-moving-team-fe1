'use client';

import GnbLanding from '@/components/organisms/GnbLanding';
import dynamic from 'next/dynamic';
import { useState } from 'react';

/**
 * 그냥 import해도 현재 구조에서는 잘 작동한다.
 * 그러나 SSG중 이 컴포넌트를 서버가 렌더링하는 일이 발생한다거나..
 * hydration이 서버와 다를 때, 컴포넌트가 복잡해질때 등..미래를 고려해 안전하게!!
 */
const SlideMenuLanding = dynamic(
  () => import('@/components/organisms/SlideMenuLanding'),
  {
    ssr: false,
  }
);

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <GnbLanding onOpenMenu={() => setIsOpen(true)} />
      <SlideMenuLanding isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main>{children}</main>
    </>
  );
}
