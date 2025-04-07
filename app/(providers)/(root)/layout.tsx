import { ReactNode } from 'react';

async function RootLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default RootLayout;
