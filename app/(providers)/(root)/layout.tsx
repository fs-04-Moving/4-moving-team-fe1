import Gnb from '@/components/organisms/Gnb';
import { ReactNode } from 'react';

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Gnb />
      {children}
    </div>
  );
}

export default RootLayout;
