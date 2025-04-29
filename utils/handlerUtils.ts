import { getUserMeServer } from '@/api/user/user.api';
import { User } from '@/types/entities/user.entity';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * 프로필 작성 완료 후의 로직 분리
 * @param param0
 */
export async function handleProfileSuccess({
  accessToken,
  router,
  queryClient,
}: {
  accessToken: string;
  router: AppRouterInstance;
  queryClient: QueryClient;
}) {
  if (accessToken) {
    // 1. Axios 헤더와 로컬스토리지에 저장
    // client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    // localStorage.setItem('accessToken', accessToken);
  }

  // 2. 쿼리 무효화 후 refetch
  await queryClient.invalidateQueries({ queryKey: ['me'] });
  await queryClient.invalidateQueries({ queryKey: ['profile'] });

  const newUser: User = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () => getUserMeServer(), //getUserMe를 사용해도 무방(위에서 토큰을 실었으니)
    staleTime: Infinity,
  });

  // 3. 리다이렉트
  router.push(`/${newUser.role}`);
}
