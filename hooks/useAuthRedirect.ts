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
 */
export function useAuthRedirect() {
  const { isLoggedIn, isAuthInitialized, hasProfile, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthInitialized) return; // 로그인 상태 초기화가 된 경우만

    const isPublic =
      PUBLIC_ROUTES.includes(pathname) || TEST_ROUTES.includes(pathname);
    const isProfilePage = PROFILE_ROUTES.includes(pathname);
    const isPrivate = !isPublic;

    // 1. 퍼블릭 페이지에서 로그인한 경우
    if (isPublic && isLoggedIn) {
      if (!role) return;
      const target = hasProfile ? `/${role}` : `/${role}/profile`;
      router.replace(target);
      return;
    }

    // 2. 프로필 페이지에 접근한 경우
    if (isProfilePage) {
      if (!isLoggedIn) {
        router.replace('/');
        return;
      }
      if (hasProfile && role) {
        router.replace(`/${role}`);
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

      if (!hasProfile && role && pathname !== `/${role}/profile`) {
        router.replace(`/${role}/profile`);
        return;
      }

      return; // hasProfile && isLoggedIn -> 유지
    }
  }, [pathname, isLoggedIn, isAuthInitialized, hasProfile, role, router]);
}
