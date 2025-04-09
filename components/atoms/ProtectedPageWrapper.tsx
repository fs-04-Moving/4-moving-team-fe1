'use client';

import { useAuth } from '@/contexts/AuthContext';
import useHasFinishedSsr from '@/hooks/useHasFinishedSsr';
import { Role } from '@/types/entities/user.entity';
import { ReactNode } from 'react';

interface ProtectedPageWrapperProps {
  children: ReactNode;
  requireLogin?: boolean;
  requireProfile?: boolean;
  requireRole?: Role;
  fallback?: ReactNode;
}

/**
//  * 유저 정보를 통한 조건부 렌더링 또는 리다이렉팅에 사용
//  * - 조건에 따라 렌더링이 변하는 것을 사용자에게 보여주지 않기 위함(깜박임 제거)
//  * - 현재는 middleware에서 리다이렉팅을 모두 처리하고 있어 사용하지 않아도 됨
//  * 
//  * 권장 사용 케이스
//  * - middleware: 페이지 보호가 단순하고 성능이 중요할 때
//  * - middleware + client: 조건이 복잡하거나 UI 조건 분기가 많을 때
//  * - client(middleware최소): 협업팀이 있고 유지보수가 중요할 때
 * @param param0 
 * @returns 
 */
function ProtectedPageWrapper({
  children,
  requireLogin = true,
  requireProfile = true,
  requireRole,
  fallback = null,
}: ProtectedPageWrapperProps) {
  const { isAuthInitialized, isLoggedIn, hasProfile, role } = useAuth();
  const hasFinishedSsr = useHasFinishedSsr();

  if (!hasFinishedSsr || !isAuthInitialized) {
    return fallback; // 초기 로딩 중
  }

  if (requireLogin && !isLoggedIn) {
    return fallback; // 로그인 안 됨
  }

  if (requireProfile && !hasProfile) {
    return fallback; // 프로필 없음
  }

  if (requireRole && role !== requireRole) {
    return fallback; // 권한 없음
  }

  return <>{children}</>;
}

export default ProtectedPageWrapper;
