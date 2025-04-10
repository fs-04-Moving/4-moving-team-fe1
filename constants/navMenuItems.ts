import { Role } from '@/types/entities/user.entity';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface NavMenuItemData {
  label: string;
  condition: (role: Role | null, hasProfile: boolean) => boolean;
  onClick: (router: AppRouterInstance, role: Role | null) => void;
}

export const navMenuItems: NavMenuItemData[] = [
  {
    label: '견적 요청',
    condition: (role, hasProfile) => hasProfile && role === 'customer',
    onClick: (router) => router.push('/customer'),
  },
  {
    label: '받은 요청',
    condition: (role, hasProfile) => hasProfile && role === 'worker',
    onClick: (router) => router.push('/worker'),
  },
  {
    label: '기사님 찾기',
    condition: (role) => role !== 'worker',
    onClick: (router) => router.push('/find-worker'),
  },
  {
    label: '내 견적 관리',
    condition: (_, hasProfile) => hasProfile,
    onClick: (router, role) => {
      if (role === 'customer') {
        router.push('/customer/estimates/pending');
      } else if (role === 'worker') {
        router.push('/worker/estimates/sending');
      }
    },
  },
];
