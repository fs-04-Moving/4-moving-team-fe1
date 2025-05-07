import { User } from '@/types/entities/user.entity';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * 프로필 작성 완료 후의 공통 처리
 */
export async function handleProfileSuccess({
  router,
  queryClient,
}: {
  router: AppRouterInstance;
  queryClient: QueryClient;
}) {
  await queryClient.refetchQueries({ queryKey: ['me'] });
  await queryClient.invalidateQueries({ queryKey: ['profile'] });

  const user: User | undefined = queryClient.getQueryData(['me']);

  if (!user) return;
  router.push(`/${user.role}`);
}
