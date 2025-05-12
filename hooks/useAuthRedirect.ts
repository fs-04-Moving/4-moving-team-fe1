'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/', '/auth/log-in', '/auth/sign-up'];
const PROFILE_ROUTES = ['/customer/profile', '/worker/profile'];
// 테스트 라우트 임시 등록
// TODO: 추후 삭제
const TEST_ROUTES = [
  '/test/jhm',
  '/test/jjh',
  '/test/kem',
  '/test/khj',
  '/test/khju',
  '/test/kjy',
  '/test/usm',
];

/**
 * 로그인, 프로필 입력 여부에 따라 리다이렉트
 * - 현재 모든 페이지에 적용하기 위해 RootLayout에 적용
 * - 2025.04.15 기준: middleware에서 모든 리다이렉트를 처리하여 필요없는 hook
 */
export function useAuthRedirect() {
  const { isLoggedIn, isAuthInitialized, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthInitialized) return; // 로그인 상태 초기화가 된 경우만

    const isPublic = PUBLIC_ROUTES.includes(pathname) || TEST_ROUTES.includes(pathname);
    const isProfilePage = PROFILE_ROUTES.includes(pathname);
    const isPrivate = !isPublic;

    // 1. 퍼블릭 페이지에서 로그인한 경우
    if (isPublic && isLoggedIn) {
      if (!user?.role) return;
      const target = user?.hasProfile ? `/${user?.role}` : `/${user?.role}/profile`;
      router.replace(target);
      return;
    }

    // 2. 프로필 페이지에 접근한 경우
    if (isProfilePage) {
      if (!isLoggedIn) {
        router.replace('/');
        return;
      }
      if (user?.hasProfile && user?.role) {
        router.replace(`/${user?.role}`);
        return;
      }
      return; // 프로필 없으면 유지
    }

    // 3. 그 외의 프라이빗 페이지
    if (isPrivate) {
      if (!isLoggedIn) {
        router.replace('/');
        return;
      }

      if (!user?.hasProfile && user?.role && pathname !== `/${user?.role}/profile`) {
        router.replace(`/${user?.role}/profile`);
        return;
      }

      return; // hasProfile && isLoggedIn -> 유지
    }
  }, [pathname, isLoggedIn, isAuthInitialized, user, router]);
}
