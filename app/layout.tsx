import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: { default: '이사할 땐, 무빙', template: '무빙 | %s' },
};

export default function HTMLLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Script
          src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
          strategy='lazyOnload' // 헤드에서 가장 먼저 로딩
        />
      </head>
      <body className={'font-pretendard'}>{children}</body>
    </html>
  );
}
