'use client';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import Error from '@/components/molecules/Error';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessageFromQuery } from '@/utils/getErrorMessageFromQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const doLogin = async () => {
      const errorCode = searchParams.get('errorCode');
      // 에러 발생 시 url 쿼리 스트링으로 errorCode, provider, role을 전달받고
      // 그것을 이용하여 에러 메시지를 생성
      if (errorCode) {
        const message = getErrorMessageFromQuery(searchParams);
        setErrorMessage(message);
        return;
      }

      // 에러가 없으면 로그인
      if (logIn) {
        await logIn(); // me 쿼리 실행/세팅
        router.replace(ROUTES.HOME); // 또는 이전 페이지로 리다이렉트 등 가능
      }
    };
    doLogin();
  }, [logIn, searchParams, router]);

  // 에러가 있는 경우: 메시지 + 로그인 페이지 이동 버튼 표시
  if (errorMessage) {
    return (
      <Error
        message={errorMessage}
        onRetry={() => router.push(ROUTES.LOG_IN)}
      />
    );
  }

  // 에러가 없는 경우: 소셜 로그인 로딩 화면
  return (
    <div className="flex flex-col items-center justify-center">
      <LoadingSpinner size="md" />
      <p className="text-3xl mt-10">소셜 로그인 중입니다...</p>
    </div>
  );
}
