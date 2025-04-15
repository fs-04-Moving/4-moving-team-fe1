/**
 * @description
 * 알림 드롭다운 컴포넌트
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * const notifications = [{ id: '1', message: '새 알림', time: '방금 전', isRead: false }];
 *
 * <DropdownNotification
 *   notifications={notifications}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onMarkAsRead={(id) => console.log(`알림 ${id} 읽음 처리`)}
 * />
 *
 * @param {NotificationItem[]} props.notifications - 알림 목록
 * @param {boolean} props.isOpen - 드롭다운 표시 여부
 * @param {Function} props.onClose - 드롭다운 닫기 함수
 * @param {Function} props.onMarkAsRead - 알림 읽음 처리 함수 (선택적)
 */

'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface DropdownNotificationProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead?: (id: string) => void;
}

function DropdownNotification({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
}: DropdownNotificationProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 밖에 클릭했을때
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-button-id="notification-button"]')) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 알림 클릭 처리
  const handleNotificationClick = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'absolute top-16 right-0 w-[312px] lg:w-[359px] bg-white rounded-xl shadow-md',
        'border border-GrayScale-100 overflow-hidden z-50 max-h-[314px] lg:max-h-[352px] overflow-y-auto'
      )}
    >
      <div className='p-4 flex justify-between items-center'>
        <h3 className='font-bold text-base lg:text-lg text-Black-400'>알림</h3>
        <button
          onClick={onClose}
          className='text-GrayScale-400 hover:text-Black-400 transition-colors'
          aria-label='알림 닫기'
        >
          ✕
        </button>
      </div>
      <div className='py-2'>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={clsx(
                'p-4 border-b border-Line-200 cursor-pointer hover:bg-Primay-Blue-50 transition-colors',
                { 'bg-Primay-Blue-50': !notification.isRead }
              )}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className='flex justify-between items-start mb-2'>
                <p
                  className={clsx(
                    'text-Black-400 font-medium text-sm lg:text-base',
                    {
                      'font-bold': !notification.isRead,
                    }
                  )}
                >
                  {notification.message}
                </p>
                {!notification.isRead && (
                  <span className='w-2 h-2 rounded-full bg-Primay-Blue-300 flex-shrink-0 mt-1'></span>
                )}
              </div>
              <p className='text-sm text-GrayScale-400'>{notification.time}</p>
            </div>
          ))
        ) : (
          <div className='py-8 text-center text-GrayScale-400'>
            새로운 알림이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownNotification;
