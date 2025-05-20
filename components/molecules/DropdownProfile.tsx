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
 *   position={{ top: 100, right: 20 }}
 * />
 *
 * @param {string} props.username - 사용자 이름
 * @param {boolean} props.isOpen - 드롭다운 표시 여부
 * @param {Function} props.onClose - 드롭다운 닫기 함수
 * @param {Role} props.role - 사용자 역할 (사용자'customer' 기사님'worker')
 */

'use client';

import ROUTES from '@/constants/routes';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';
import { Role } from '../../types/entities/user.entity';

interface DropdownProfileProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
  logOut: () => void;
  role: Role; // 기존 타입 정의 사용: 'customer' 또는 'worker'
  position: { top: number; right: number }; // 추가된 위치 정보
}

const DropdownProfile = forwardRef<HTMLDivElement, DropdownProfileProps>(function DropdownProfile(
  { username, isOpen, onClose, logOut, role, position },
  ref,
) {
  const router = useRouter();

  const handleClickMoveToCustomerFavorites = () => {
    router.push(ROUTES.CUSTOMER.FAVORITES);
    onClose();
  };

  const handleClickMoveToCustomerReviews = () => {
    router.push(ROUTES.CUSTOMER.REVIEWS.PENDING);
    onClose();
  };

  // 로그아웃 처리
  const handleClickLogout = () => {
    logOut();
    router.replace(ROUTES.HOME);
  };

  const handleClickMoveToWorkerMypage = () => {
    router.push(ROUTES.WORKER.MY_PAGE);
    onClose();
  };

  const handleClickMoveToCustomerProfileEdit = () => {
    router.push(ROUTES.CUSTOMER.PROFILE_EDIT);
    onClose();
  };

  const handleClickMoveToWorkerProfileEdit = () => {
    router.push(ROUTES.WORKER.PROFILE_EDIT);
    onClose();
  };

  const handleClickMoveToCustomerInfoEdit = () => {
    router.push(ROUTES.CUSTOMER.INFO);
    onClose();
  };

  const handleClickMoveToWorkerInfoEdit = () => {
    router.push(ROUTES.WORKER.INFO);
    onClose();
  };

  if (!isOpen) return null;

  // 메뉴들 공통 스타일, 마진은 박스 패딩에서 조절했습니다
  const menuItemClass =
    'cursor-pointer w-[140px] lg:w-[240px] h-[42px] lg:h-[54px] flex items-center px-3 lg:px-6 text-Black-400 hover:bg-Primay-Blue-50 transition-colors';
  const menuItemClassName =
    'w-[140px] lg:w-[240px] h-[42px] lg:h-[54px] flex items-center px-3 lg:px-6 text-Black-400 ';

  return (
    <div
      ref={ref}
      style={{ top: position.top, right: position.right }}
      className={clsx(
        'fixed bg-white rounded-xl shadow-md px-1.5 lg:px-1 pt-2.5 lg:pt-4',
        'border border-GrayScale-100 overflow-hidden z-[100]',
      )}
    >
      <div className={clsx(menuItemClassName)}>
        <p className="font-bold text-base lg:text-lg text-Black-400">
          {username} {role === 'customer' ? '고객님' : '기사님'}
        </p>
      </div>

      <div className="py-2">
        {role === 'customer' ? (
          // 고객용 메뉴
          <>
            <div className={menuItemClass} onClick={handleClickMoveToCustomerInfoEdit}>
              기본 정보 수정
            </div>
            <div className={menuItemClass} onClick={handleClickMoveToCustomerProfileEdit}>
              프로필 수정
            </div>
            <div className={menuItemClass} onClick={handleClickMoveToCustomerFavorites}>
              찜한 기사님
            </div>
            <div className={menuItemClass} onClick={handleClickMoveToCustomerReviews}>
              이사 리뷰
            </div>
          </>
        ) : (
          // 기사님용 메뉴
          <>
            <div className={menuItemClass} onClick={handleClickMoveToWorkerInfoEdit}>
              기본 정보 수정
            </div>
            <div className={menuItemClass} onClick={handleClickMoveToWorkerProfileEdit}>
              프로필 수정
            </div>
            <div className={menuItemClass} onClick={handleClickMoveToWorkerMypage}>
              마이페이지
            </div>
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
});

export default DropdownProfile;
