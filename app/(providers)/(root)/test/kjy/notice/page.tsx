'use client';

import DropdownNotification from '@/components/molecules/DropdownNotifications';
import DropdownProfile from '@/components/molecules/DropdownProfile';
import PageContainer from '@/components/templates/PageContainer';
import { useState } from 'react';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    message: '김코드 기사님의 소형이사 견적이 도착했어요',
    time: '10분 전',
    isRead: false,
  },
  {
    id: '2',
    message: '김코드 기사님의 견적이 확정 되었어요',
    time: '1시간 전',
    isRead: false,
  },
  {
    id: '3',
    message: '내일은 경기(일산) -> 서울(영등포) 이사 예정일이에요.',
    time: '어제',
    isRead: true,
  },
  {
    id: '4',
    message: '김코드 기사님의 소형이사 견적이 도착했어요.',
    time: '2일 전',
    isRead: true,
  },
  {
    id: '5',
    message: '내일은 경기(일산) -> 서울(영등포) 이사 예정일이에요.',
    time: '2일 전',
    isRead: true,
  },
];

function Page() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // 버튼 클릭 이벤트 핸들러
  const handleProfileButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

    // 다른 드롭다운이 열려있으면 닫기
    if (isNotificationDropdownOpen) {
      setIsNotificationDropdownOpen(false);
    }
  };

  const handleNotificationButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);

    // 다른 드롭다운이 열려있으면 닫기
    if (isProfileDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  // 알림 읽음 처리
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;
  return (
    <PageContainer>
      <div className='w-full flex justify-between m-0 px-[45px] py-6 border-b-[1px] border-GrayScale-100'>
        <section>
          <h2 className='text-3xl font-extrabold text-blue-400'>MOVING</h2>
        </section>
        <section className='flex gap-3 items-center'>
          <div className='relative'>
            <button
              data-button-id='notification-button'
              className='w-fit px-3 py-1.5 text-white bg-blue-400 hover:bg-blue-300 rounded-[100px] text-[30px] cursor-pointer relative'
              onClick={handleNotificationButtonClick}
              aria-label='알림'
            >
              🔔
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {unreadCount}
                </span>
              )}
            </button>
            <DropdownNotification
              notifications={notifications}
              isOpen={isNotificationDropdownOpen}
              onClose={() => setIsNotificationDropdownOpen(false)}
              onMarkAsRead={handleMarkAsRead}
            />
          </div>
          <div className='relative'>
            {/* 기존 버튼에 onClick만 사용 */}
            <button
              data-button-id='profile-button'
              className='w-fit px-3 py-1.5 text-white bg-blue-400 hover:bg-blue-300 rounded-[100px] text-[30px] cursor-pointer'
              onClick={handleProfileButtonClick}
              aria-label='사용자 메뉴'
            >
              🧑🏻‍💻
            </button>
            <DropdownProfile
              username='김기린'
              isOpen={isProfileDropdownOpen}
              onClose={() => setIsProfileDropdownOpen(false)}
              role='customer'
            />
          </div>
          <p className='font-semibold text-[20px]'>김기린님</p>
        </section>
        <div className='relative'>
          {/* 기존 버튼에 onClick만 사용 */}
          <button
            data-button-id='profile-button'
            className='w-fit px-3 py-1.5 text-white bg-blue-400 hover:bg-blue-300 rounded-[100px] text-[30px] cursor-pointer'
            onClick={handleProfileButtonClick}
            aria-label='사용자 메뉴'
          >
            🧑🏻‍💻
          </button>
          <DropdownProfile
            username='김기린'
            isOpen={isProfileDropdownOpen}
            onClose={() => setIsProfileDropdownOpen(false)}
            role='worker'
          />
        </div>
      </div>
    </PageContainer>
  );
}

export default Page;
