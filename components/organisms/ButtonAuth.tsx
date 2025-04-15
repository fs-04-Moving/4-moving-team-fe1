'use client';

import { useQuery } from '@tanstack/react-query';

import userApi from '@/api/user/user.api';
import { useAuth } from '@/contexts/AuthContext';
import { getBrowserQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { GetUserMe } from '@/types/dtos/user.dto';
import GuestMenu from '../molecules/GuestMenu';
import LoggedInMenu from '../molecules/LoggedInMenu';

interface Props {
  onOpenMenu: () => void;
}

/**
 * 상단 Gnb 메뉴(헤더) 우측에 있는 버튼 컴포넌트
 * - 로그인 시에는 사용자 정보와 알람 버튼을, 비로그인 시에는 로그인 버튼을 표시
 * - 태블릿/모바일에서는 메뉴 버튼 표시
 * @param param0 onOpenMenu: 태블릿/모바일에서 사용하는 우측 슬라이드 메뉴 토글 함수
 * @returns
 */
function ButtonAuth({ onOpenMenu }: Props) {
  const { data: user } = useQuery<GetUserMe>({
    queryKey: ['me'],
    queryFn: userApi.getUserMe,
    initialData: () => getBrowserQueryClient().getQueryData(['me']),
  });

  const { isLoggedIn } = useAuth();

  return isLoggedIn && user ? (
    <LoggedInMenu user={user} onOpenMenu={onOpenMenu} />
  ) : (
    <GuestMenu onOpenMenu={onOpenMenu} />
  );
}

export default ButtonAuth;
