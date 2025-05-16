'use client'; // App Router 환경에서 클라이언트 전용으로 선언

import authApi from '@/api/auth/auth.api';
import { getBrowserQueryClient } from '@/libs/tanstack-query/reactQueryConfig';

/**
 * 전역 로그아웃 로직 (Interceptor 등 React Context 밖에서 사용)
 * @param onAfterLogout - 로그아웃 후 실행할 콜백 (라우팅 등)
 */
export const logoutHelper = async (onAfterLogout?: () => void) => {
  try {
    await authApi.logOut();
  } catch (e) {
    console.error('서버 로그아웃 실패', e);
  }

  const queryClient = getBrowserQueryClient();
  queryClient.removeQueries({ queryKey: ['me'] });

  if (typeof window !== 'undefined') {
    // 강제 fallback: onAfterLogout이 없으면 그냥 홈으로 리다이렉트
    if (onAfterLogout) {
      onAfterLogout();
    } else {
      window.location.href = '/';
    }
  }
};
