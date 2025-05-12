'use client';

import { useEffect } from 'react';

// 카카오 SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
        sendCustom: (options: {
          templateId: number;
          templateArgs?: Record<string, string>;
        }) => void;
      };
    };
  }
}

export const useKakaoShare = () => {
  // SDK 로드
  useEffect(() => {
    // 이미 로드된 경우 중복 로드 방지
    if (document.getElementById('kakao-sdk')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-sdk';
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // 카카오 앱 키로 SDK 초기화
        window.Kakao.init('c1aa1146053b90a9921e40618f5bbc9a');
      }
    };
    document.body.appendChild(script);

    return () => {
      // 스크립트 제거는 필요하지 않음 (전역적으로 사용 가능하도록 유지)
    };
  }, []);

  // 카카오 공유하기 함수
  const shareToKakao = (
    url: string,
    title: string = '이사 기사님 정보',
    description: string = '이사 기사님 정보를 확인해보세요!',
  ) => {
    if (typeof window === 'undefined') return;

    // SDK가 로드되었는지 확인
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('c1aa1146053b90a9921e40618f5bbc9a');
      }

      // 기본 공유
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl:
            'https://4-moving-team-fe1.vercel.app/_next/static/media/logo-icon-text.c9cf4c9c.svg', // 대표 이미지 URL
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    } else {
      console.error('Kakao SDK not loaded');
    }
  };

  return { shareToKakao };
};
