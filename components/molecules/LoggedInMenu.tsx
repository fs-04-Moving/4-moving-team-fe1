'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import icMenu from '@/assets/images/ic-menu.svg';
import { useAuth } from '@/contexts/AuthContext';
import useOutsideClick from '@/hooks/useOutsideClick';
import { getBrowserQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { GetUserMe } from '@/types/dtos/user.dto';

import IconAlarm from '../atoms/IconAlarm';
import Portal from '../atoms/Portal';
import DropdownNotification from './DropdownNotifications';
import DropdownProfile from './DropdownProfile';
import UserProfile from './UserProfile';

interface Props {
  user: GetUserMe;
  onOpenMenu: () => void;
}

export default function LoggedInMenu({ user, onOpenMenu }: Props) {
  const { logOut } = useAuth();
  const [isShowProfilePopup, setIsShowProfilePopup] = useState(false);
  const [isShowNotificationsPopup, setIsShowNotificationsPopup] =
    useState(false);

  const popupProfileRef = useRef<HTMLDivElement | null>(null);
  const popupNotificationRef = useRef<HTMLDivElement | null>(null);
  const buttonProfileRef = useRef<HTMLDivElement | null>(null);
  const alarmButtonRef = useRef<HTMLImageElement | null>(null);

  const [profilePopupPos, setProfilePopupPos] = useState({ top: 0, right: 0 });
  const [notificationPopupPos, setNotificationPopupPos] = useState({
    top: 0,
    right: 0,
  });

  const queryClient = getBrowserQueryClient();

  // 자주 사용되진 않으나 Dropdown컴포넌트에 전달되어 사용되므로
  // useCallback을 사용해서 문제될 것은 없다고 판단하여 일단 적용해 봄(추후 자세히 분석해보자)
  const handleClickLogOut = useCallback(() => {
    setIsShowNotificationsPopup(false);
    setIsShowProfilePopup(false);
    logOut?.();
    queryClient.removeQueries({ queryKey: ['me'] });
  }, [logOut, queryClient]);

  const handleClickAlarm = () => {
    if (alarmButtonRef.current) {
      const rect = alarmButtonRef.current.getBoundingClientRect();
      setNotificationPopupPos({
        top: rect.bottom + 8, // 아이콘 아래에 띄우기
        right: window.innerWidth - rect.right - 110, // 오른쪽 기준 위치
      });
    }
    setIsShowNotificationsPopup((prev) => !prev);
    setIsShowProfilePopup(false);
  };

  const handleClickProfile = () => {
    if (buttonProfileRef.current) {
      const rect = buttonProfileRef.current.getBoundingClientRect();
      setProfilePopupPos({
        top: rect.bottom + 8, // 버튼 아래 간격
        right: window.innerWidth - rect.right - 10, // 오른쪽 위치 계산
      });
    }
    setIsShowProfilePopup((prev) => !prev);
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

  interface Notification {
    id: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  }

  ////////////////////////////알림 구현//////////////////////////// SSE
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/notification`,
      {
        withCredentials: true,
      }
    );
    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      //맨처음 알림은 10개 배열로 받아오고 그 이후 알람은 배열이 아니여서 처리가 필요함
      const newNotifications = Array.isArray(parsedData.notification)
        ? parsedData.notification
        : [parsedData.notification];

      setNotifications((prevNotifications) => [
        ...newNotifications,
        ...prevNotifications,
      ]);
    };

    eventSource.onerror = () => {
      console.error('SSE 연결 실패');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  /////////////////////////////////////////////////////////////

  return (
    <div className="flex items-center relative overflow-visible">
      <IconAlarm onClick={handleClickAlarm} ref={alarmButtonRef} />
      <UserProfile
        onClick={handleClickProfile}
        name={user.name}
        profileImage={user.profileImage}
        ref={buttonProfileRef} // 위치 추적용 ref 전달
      />
      {isShowProfilePopup && (
        <Portal>
          <DropdownProfile
            username={user.name}
            role={user.role}
            isOpen={isShowProfilePopup}
            onClose={() => setIsShowProfilePopup(false)}
            logOut={handleClickLogOut}
            ref={popupProfileRef}
            position={profilePopupPos} // 위치 정보 전달
          />
        </Portal>
      )}
      {isShowNotificationsPopup && (
        <Portal>
          <DropdownNotification
            isOpen={isShowNotificationsPopup}
            notifications={notifications}
            onClose={() => setIsShowNotificationsPopup(false)}
            ref={popupNotificationRef}
            position={notificationPopupPos} // 위치 전달
          />
        </Portal>
      )}
      <Image
        src={icMenu}
        alt="메뉴 아이콘"
        className="w-6 h-6 ml-6 cursor-pointer lg:hidden"
        onClick={onOpenMenu}
      />
    </div>
  );
}
