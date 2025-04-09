'use client';

import Gnb from '@/components/organisms/Gnb';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { ReactNode } from 'react';

function RootLayout({ children }: { children: ReactNode }) {
  useAuthRedirect();
  return (
    <div>
      <Gnb />
      {children}
    </div>
  );
}

export default RootLayout;
