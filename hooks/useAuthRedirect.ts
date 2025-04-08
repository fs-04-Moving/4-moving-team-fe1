'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseAuthRedirectOptions {
  requireAuth: boolean; // true면 로그인 필요, false면 비로그인 유저만 접근 가능
  redirectTo: string;
}

export function useAuthRedirect({
  requireAuth,
  redirectTo,
}: UseAuthRedirectOptions) {
  const { isLoggedIn, isAuthInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthInitialized) return;

    if (requireAuth && !isLoggedIn) {
      router.replace(redirectTo);
    }

    if (!requireAuth && isLoggedIn) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, isAuthInitialized, requireAuth, redirectTo, router]);
}
