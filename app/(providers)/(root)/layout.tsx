'use client';

import Gnb from '@/components/organisms/Gnb';
import { ReactNode } from 'react';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Gnb />
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

export default RootLayout;
