'use client';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import Error from '@/components/molecules/Error';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const doLogin = async () => {
      // 에러가 있을 경우 백엔드에서 url 쿼리 스트링으로 error를 전달
      const error = searchParams.get('error');
      if (error) {
        // 에러 메시지 설정 후 로그인 시도 중단
        setErrorMessage(error);
        return;
      }

      if (logIn) {
        console.log('callback login 실행');
        await logIn(); // me 쿼리 실행/세팅
        router.replace(ROUTES.HOME); // 또는 이전 페이지로 리다이렉트
      }
    };
    doLogin();
  }, [logIn, searchParams, router]);

  // 에러 메시지가 있는 경우: 메시지 + 로그인 페이지 이동 버튼 표시
  if (errorMessage) {
    return (
      <Error
        message={errorMessage}
        onRetry={() => router.push(ROUTES.LOG_IN)}
      />
    );
  }

  // 에러 메시지가 없는 경우: 소셜 로그인 로딩 화면
  return (
    <div className="flex flex-col items-center justify-center">
      <LoadingSpinner size="md" />
      <p className="text-3xl mt-10">소셜 로그인 중입니다...</p>
    </div>
  );
}
