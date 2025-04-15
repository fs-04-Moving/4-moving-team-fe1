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
 *   logOut={handleLogOut}
 *   ref={dropdownRef}
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
import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';
import { Role } from '../../types/entities/user.entity';

interface DropdownProfileProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
  logOut: () => void;
  role: Role; // 기존 타입 정의 사용: 'customer' 또는 'worker'
}

const DropdownProfile = forwardRef<HTMLDivElement, DropdownProfileProps>(
  function DropdownProfile({ username, isOpen, onClose, logOut, role }, ref) {
    const router = useRouter();

    const handleClickFavorite = () => {
      router.push('/customer/favorites');
      onClose();
    };

    const handleClickReview = () => {
      router.push('/customer/reviews/pending');
      onClose();
    };

    // 외부 클릭 감지용 useEffect를 사용할 수 있습니다.
    // const dropdownRef = useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //   const handleClickOutside = (event: MouseEvent) => {
    //     const target = event.target as HTMLElement;
    //     if (target.closest('[data-button-id="profile-button"]')) {
    //       return;
    //     }
    //     if (dropdownRef.current && !dropdownRef.current.contains(target)) {
    //       onClose();
    //     }
    //   };
    //   if (isOpen) {
    //     setTimeout(() => {
    //       document.addEventListener('mousedown', handleClickOutside);
    //     }, 0);
    //   }
    //   return () => {
    //     document.removeEventListener('mousedown', handleClickOutside);
    //   };
    // }, [isOpen, onClose]);

    // 로그아웃 처리
    const handleClickLogout = () => {
      console.log('로그아웃 처리');
      logOut();
    };

    if (!isOpen) return null;

    // 메뉴들 공통 스타일, 마진은 박스 패딩에서 조절했습니다
    const menuItemClass =
      'cursor-pointer w-[140px] lg:w-[240px] h-[42px] lg:h-[54px] flex items-center px-3 lg:px-6 text-Black-400 hover:bg-Primay-Blue-50 transition-colors';

    return (
      // 감싸는 div에 필요시 z-index 추가해야 할 수도 있음
      <div
        ref={ref}
        className={clsx(
          'absolute top-8 lg:top-13 right-10 lg:right-0 bg-white rounded-xl shadow-md px-1.5 lg:px-1 pt-2.5 lg:pt-4',
          'border border-GrayScale-100 overflow-hidden z-50'
        )}
      >
        <div className={clsx(menuItemClass)}>
          <p className="font-bold text-base lg:text-lg text-Black-400">
            {username} {role === 'customer' ? '고객님' : '기사님'}
          </p>
        </div>

        <div className="py-2">
          {role === 'customer' ? (
            // 고객용 메뉴
            <>
              <Link href="/mypage/profile" className={menuItemClass}>
                프로필 수정
              </Link>
              <div className={menuItemClass} onClick={handleClickFavorite}>
                찜한 기사님
              </div>
              <div className={menuItemClass} onClick={handleClickReview}>
                이사 리뷰
              </div>
            </>
          ) : (
            // 기사님용 메뉴
            <>
              <Link href="/worker/profile" className={menuItemClass}>
                프로필 수정
              </Link>
              <Link href="/worker/mypage" className={menuItemClass}>
                마이페이지
              </Link>
              <Link href="/worker/quotes" className={menuItemClass}>
                받은 견적
              </Link>
            </>
          )}
        </div>

        <div className="border-t border-GrayScale-100">
          <button
            onClick={handleClickLogout}
            className="text-GrayScale-400 text-xs lg:text-sm font-medium w-[140px] lg:w-[240px] h-[38px] lg:h-[45px] hover:bg-Primay-Blue-50 transition-colors cursor-pointer"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }
);

export default DropdownProfile;
