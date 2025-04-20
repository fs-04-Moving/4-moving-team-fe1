'use client';

import userApi from '@/api/user/user.api';
import icAlarm from '@/assets/images/ic-alarm.svg';
import icMenu from '@/assets/images/ic-menu.svg';
import icProfile from '@/assets/images/ic-profile.svg';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ButtonSolid from '../atoms/ButtonSolid';

function ButtonAuth() {
  const { logOut } = useAuth();

  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: userApi.getUserMe,
    initialData: () => queryClient.getQueryData(['me']),
    staleTime: Infinity, // 5분 동안은 재요청 안함 (CSR 시 중복 방지)
    enabled: typeof window !== 'undefined', // CSR에서만 실행되게
  });

  const router = useRouter();
  const handleClickLogIn = () => {
    router.push('/auth/log-in');
  };

  const handleClickLogOut = () => {
    logOut?.();
    queryClient.removeQueries({ queryKey: ['me'] });
  };

  console.log(user);

  if (user) {
    return (
      <div className="flex items-center">
        <Image
          src={icAlarm}
          alt="알림"
          className="w-6 h-6 lg:w-9 lg:h-9 cursor-pointer"
        />

        <div className="flex items-center relative w-6 h-6 lg:w-9 lg:h-9 ml-6 lg:ml-8 cursor-pointer">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt="프로필 이미지"
              fill
              className="rounded-full"
            />
          ) : (
            <Image
              src={icProfile}
              alt="빈 프로필"
              className="w-6 h-6 lg:w-9 lg:h-9"
            />
          )}
        </div>
        <p className="hidden ml-4 lg:block text-lg font-medium text-Black-400 cursor-pointer">
          {user.name}
        </p>
        <Image
          src={icMenu}
          alt="메뉴 아이콘"
          className="w-6 h-6 ml-6 cursor-pointer lg:hidden"
        />
        <p onClick={handleClickLogOut} className="ml-4 hidden lg:inline">
          로그아웃
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-[116px]">
        <ButtonSolid onClick={handleClickLogIn} isGnb={true}>
          로그인
        </ButtonSolid>
      </div>
    );
  }
}

export default ButtonAuth;
