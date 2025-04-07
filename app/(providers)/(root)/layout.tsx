'use client';

import Gnb from '@/components/organisms/Gnb';
import { ReactNode } from 'react';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Gnb />
      {children}
    </div>
  );
}

export default RootLayout;
