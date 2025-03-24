import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: '이사할 땐, 무빙',
};

export default function HTMLLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${notoSansKr.className}`}>{children}</body>
    </html>
  );
}
