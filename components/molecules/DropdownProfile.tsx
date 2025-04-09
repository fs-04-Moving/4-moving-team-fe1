/**
 * @description
 * 사용자 프로필 드롭다운 컴포넌트
 * 사용자 역할(고객/기사)에 따라 다른 메뉴 항목을 표시합니다.
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <DropdownProfile
 *   username="김기린"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   role="customer"
 * />
 *
 * @param {string} props.username - 사용자 이름
 * @param {boolean} props.isOpen - 드롭다운 표시 여부
 * @param {Function} props.onClose - 드롭다운 닫기 함수
 * @param {Role} props.role - 사용자 역할 (사용자'customer' 기사님'worker')
 */

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Role } from '../../types/entities/user.entity';

interface DropdownProfileProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
  role: Role; // 기존 타입 정의 사용: 'customer' 또는 'worker'
}

function DropdownProfile({
  username,
  isOpen,
  onClose,
  role,
}: DropdownProfileProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-button-id="profile-button"]')) {
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

  // 로그아웃 처리 일단 요기에 자리 만들었습니다
  const handleLogout = () => {
    console.log('로그아웃 처리');
    onClose();
  };

  if (!isOpen) return null;

  // 메뉴들 공통 스타일, 마진은 박스 패딩에서 조절했습니다
  const menuItemClass =
    'w-[140px] lg:w-[240px] h-[42px] lg:h-[54px] flex items-center px-3 lg:px-6 text-Black-400 hover:bg-Primay-Blue-50 transition-colors';

  return (
    // 감싸는 div에 필요시 z-index 추가해야 할수도 있음 추후?
    <div
      ref={dropdownRef}
      className={clsx(
        'absolute top-16 right-0 bg-white rounded-xl shadow-md  px-1.5 lg:px-1 pt-2.5 lg:pt-4',
        'border border-GrayScale-100 overflow-hidden'
      )}
    >
      <div className={clsx(menuItemClass)}>
        <p className='font-bold text-base lg:text-lg text-Black-400'>
          {username} {role === 'customer' ? '고객님' : '기사님'}
        </p>
      </div>
      <div className='py-2'>
        {role === 'customer' ? (
          // 일반 사용자용 메뉴
          <>
            <Link href='/mypage/profile' className={menuItemClass}>
              프로필 수정
            </Link>
            <Link href='/mypage/favorites' className={menuItemClass}>
              찜한 기사님
            </Link>
            <Link href='/mypage/reviews' className={menuItemClass}>
              이사 리뷰
            </Link>
          </>
        ) : (
          // 기사님용 메뉴 :('worker')
          <>
            <Link href='/worker/profile' className={menuItemClass}>
              프로필 수정
            </Link>
            <Link href='/worker/mypage' className={menuItemClass}>
              마이페이지
            </Link>
            <Link href='/worker/quotes' className={menuItemClass}>
              받은 견적
            </Link>
          </>
        )}
      </div>

      <div className='border-t border-GrayScale-100'>
        <button
          onClick={handleLogout}
          className='text-GrayScale-400 text-xs lg:text-sm font-medium w-[140px] lg:w-[240px] h-[38px] lg:h-[45px] hover:bg-Primay-Blue-50 transition-colors'
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default DropdownProfile;
