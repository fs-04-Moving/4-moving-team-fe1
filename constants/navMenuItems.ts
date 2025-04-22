import { Role } from '@/types/entities/user.entity';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ROUTES from './routes';

interface NavMenuItemData {
  label: string;
  href?: string; // ✅ 선택적으로 추가
  condition: (
    role: Role | null,
    hasProfile: boolean,
    isLoggedIn: boolean
  ) => boolean;
  onClick: (router: AppRouterInstance, role: Role | null) => void;
  showIn?: ('gnb' | 'slide')[];
}

export const navMenuItems: NavMenuItemData[] = [
  {
    label: '견적 요청',
    href: ROUTES.CUSTOMER.ROOT,
    condition: (role, hasProfile) => hasProfile && role === 'customer',
    onClick: (router) => router.push(ROUTES.CUSTOMER.ROOT),
    showIn: ['gnb', 'slide'],
  },
  {
    label: '받은 요청',
    href: ROUTES.WORKER.ROOT,
    condition: (role, hasProfile) => hasProfile && role === 'worker',
    onClick: (router) => router.push(ROUTES.WORKER.ROOT),
    showIn: ['gnb', 'slide'],
  },
  {
    label: '기사님 찾기',
    href: ROUTES.FIND_WORKER,
    condition: (role) => role !== 'worker',
    onClick: (router) => router.push(ROUTES.FIND_WORKER),
    showIn: ['gnb', 'slide'],
  },
  {
    label: '로그인',
    href: ROUTES.LOG_IN,
    condition: (_, __, isLoggedIn) => !isLoggedIn,
    onClick: (router) => router.push(ROUTES.LOG_IN),
    showIn: ['slide'],
  },
  {
    label: '내 견적 관리',
    // 각 role에 따라 예상 prefix 경로를 지정
    href: ROUTES.CUSTOMER.ESTIMATES.ROOT, // 기본값
    condition: (_, hasProfile) => hasProfile,
    onClick: (router, role) => {
      if (role === 'customer') {
        router.push(ROUTES.CUSTOMER.ESTIMATES.PENDING);
      } else if (role === 'worker') {
        router.push(ROUTES.WORKER.ESTIMATES.SENDING);
      }
    },
    showIn: ['gnb', 'slide'],
  },
];
