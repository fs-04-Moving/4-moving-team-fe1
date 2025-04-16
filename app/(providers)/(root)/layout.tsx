'use client';

import Gnb from '@/components/organisms/Gnb';
import SlideMenu from '@/components/organisms/SlideMenu';
import { ReactNode, useState } from 'react';

function RootLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <Gnb onOpenMenu={() => setIsOpen(true)} />
      <SlideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

export default RootLayout;
