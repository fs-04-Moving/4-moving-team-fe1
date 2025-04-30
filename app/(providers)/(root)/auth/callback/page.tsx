'use client';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  console.log('callback login 실행');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logIn } = useAuth();

  useEffect(() => {
    const doLogin = async () => {
      const error = searchParams.get('error');
      if (error) {
        alert('소셜 로그인에 실패했습니다.');
        router.replace(ROUTES.LOG_IN);
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

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadingSpinner size="md" />
      <p className="text-3xl mt-10">소셜 로그인 중입니다...</p>
    </div>
  );
}
