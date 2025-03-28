import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: '이사할 땐, 무빙',
};

export default function HTMLLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={'font-pretenard'}>{children}</body>
    </html>
  );
}
