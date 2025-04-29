import userApi from '@/api/user/user.api';
import { User } from '@/types/entities/user.entity';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * 프로필 작성 완료 후의 공통 처리
 * - accessToken이 이미 갱신되어 있다고 가정
 */
export async function handleProfileSuccess({
  router,
  queryClient,
}: {
  router: AppRouterInstance;
  queryClient: QueryClient;
}) {
  // accessToken은 이미 헤더에 실렸다고 가정
  await queryClient.invalidateQueries({ queryKey: ['me'] });
  await queryClient.invalidateQueries({ queryKey: ['profile'] });

  const newUser: User = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () => userApi.getUserMe(),
    staleTime: Infinity,
  });

  router.push(`/${newUser.role}`);
}
