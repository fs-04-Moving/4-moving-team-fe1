import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: { default: '이사할 땐, 무빙', template: '무빙 | %s' },
  description: '소형이사, 가정이사, 사무실이사, 모든이사는 무빙',
  
  openGraph: {
    title: '이사할땐, 무빙',
    description: '이사를 하시나요? 어떤 이사든 다양한 기사님에게 견적을 받아보고 원하는 기사님과 이사해보세요! 무:무조건 무빙에서 이사하면 빙:빙그레 웃게 됩니다! ',
    siteName: '이사할땐, 무빙',
    type: 'website',
    images: [
      {
        url: 'https://i.postimg.cc/zfmnrJ0F/moving.jpg',
        width: 1017,
        height: 570,
        alt: '무빙 런칭',
      },
    ],
  },
};

export default function HTMLLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 네이버,구글 SEO관련 메타태그 */}
        <meta name="naver-site-verification" content="46bab8b6ca60571db84f8af0ee365b807ae64516" /> 
        <meta name="google-site-verification" content="471LgwbTeMLuTPz0jqO5LEb9jrlggmWf39JYiLPsxvo" /> 
        <Script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="lazyOnload" // 헤드에서 가장 먼저 로딩
        />
        
      </head>
      <body className={'font-pretendard'}>{children}</body>
    </html>
  );
}
