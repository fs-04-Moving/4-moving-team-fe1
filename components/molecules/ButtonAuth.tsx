'use client';

import userApi from '@/api/user/user.api';
import icMenu from '@/assets/images/ic-menu.svg';
import { useAuth } from '@/contexts/AuthContext';
import useOutsideClick from '@/hooks/useOutsideClick';
import { getBrowserQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { GetUserMe } from '@/types/dtos/user.dto';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import ButtonSolid from '../atoms/ButtonSolid';
import IconAlarm from '../atoms/IconAlarm';
import DropdownNotification from './DropdownNotifications';
import DropdownProfile from './DropdownProfile';
import UserProfile from './UserProfile';

interface Props {
  onOpenMenu: () => void;
}

function ButtonAuth({ onOpenMenu }: Props) {
  const { logOut } = useAuth();
  const [isShowProfilePopup, setIsShowProfilePopup] = useState(false);
  const [isShowNotificationsPopup, setIsShowNotificationsPopup] =
    useState(false);

  const popupProfileRef = useRef<HTMLDivElement | null>(null);
  const popupNotificationRef = useRef<HTMLDivElement | null>(null);

  const userQueryClient = getBrowserQueryClient({
    queries: {
      staleTime: Infinity, // 사용자가 로그아웃 후 재로그인하거나 정보를 변경할 때에만 갱신,
      retry: 0,
    },
  });
  const { data: user } = useQuery<GetUserMe>({
    queryKey: ['me'],
    queryFn: userApi.getUserMe,
    initialData: () => userQueryClient.getQueryData(['me']),
  });

  const router = useRouter();
  const handleClickLogIn = () => {
    router.push('/auth/log-in');
  };

  // 자주 사용되진 않으나 Dropdown컴포넌트에 전달되어 사용되므로
  // useCallback을 사용해서 문제될 것은 없다고 판단하여 일단 적용해 봄(추후 자세히 분석해보자)
  const handleClickLogOut = useCallback(() => {
    setIsShowNotificationsPopup(false);
    setIsShowProfilePopup(false);
    logOut?.();
    userQueryClient.removeQueries({ queryKey: ['me'] });
  }, [logOut, userQueryClient]);

  const handleClickAlarm = () => {
    setIsShowNotificationsPopup(!isShowNotificationsPopup);
    setIsShowProfilePopup(false);
  };

  const handleClickProfile = () => {
    setIsShowProfilePopup(!isShowProfilePopup);
    setIsShowNotificationsPopup(false);
  };

  // 외부 영역 클릭 감지 훅 적용
  useOutsideClick(
    popupProfileRef,
    () => setIsShowProfilePopup(false),
    isShowProfilePopup
  );
  useOutsideClick(
    popupNotificationRef,
    () => setIsShowNotificationsPopup(false),
    isShowNotificationsPopup
  );

  if (user) {
    return (
      <div className="flex items-center relative">
        <IconAlarm onClick={handleClickAlarm} />
        <UserProfile
          onClick={handleClickProfile}
          name={user.name}
          profileImage={user.profileImage}
        />
        {isShowProfilePopup && (
          <DropdownProfile
            username={user.name}
            role={user.role}
            isOpen={isShowProfilePopup}
            onClose={() => setIsShowProfilePopup(false)}
            logOut={handleClickLogOut}
            ref={popupProfileRef}
          />
        )}
        {isShowNotificationsPopup && (
          <DropdownNotification
            isOpen={isShowNotificationsPopup}
            notifications={[]}
            onClose={() => setIsShowNotificationsPopup(false)}
            ref={popupNotificationRef}
          />
        )}
        <Image
          src={icMenu}
          alt="메뉴 아이콘"
          className="w-6 h-6 ml-6 cursor-pointer lg:hidden"
          onClick={onOpenMenu}
        />
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
