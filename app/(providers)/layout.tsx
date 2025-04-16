import { getUserMeServer } from '@/api/user/user.api';
import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';
import { createServerQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { getAccessTokenFromRefresh } from '@/utils/jwtUtils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

async function ProvidersLayout({ children }: { children: ReactNode }) {
  const accessToken = await getAccessTokenFromRefresh();
  const userQueryClient = createServerQueryClient({
    queries: {
      staleTime: Infinity, // 사용자가 로그아웃 후 재로그인하거나 정보를 변경할 때에만 갱신,
      retry: 0,
    },
  });

  if (accessToken) {
    await userQueryClient.prefetchQuery({
      queryKey: ['me'],
      queryFn: () => getUserMeServer(accessToken),
    });
  }
  return (
    <TanstackQueryProvider>
      <HydrationBoundary state={dehydrate(userQueryClient)}>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </HydrationBoundary>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
