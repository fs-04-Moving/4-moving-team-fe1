import { getUserMeServer } from '@/api/user/user.api';
import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';
import { getAccessTokenFromRefresh } from '@/utils/jwtUtils';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

async function ProvidersLayout({ children }: { children: ReactNode }) {
  const accessToken = await getAccessTokenFromRefresh();
  const queryClient = new QueryClient();

  if (accessToken) {
    await queryClient.prefetchQuery({
      queryKey: ['me'],
      queryFn: () => getUserMeServer(accessToken),
      staleTime: Infinity, // 사용자가 로그아웃 후 재로그인하거나 정보를 변경할 때에만 갱신
    });
  }
  const dehydratedState = dehydrate(queryClient);
  console.log(
    '🧊 SSR dehydratedState',
    JSON.stringify(dehydratedState, null, 2)
  );
  return (
    <TanstackQueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </HydrationBoundary>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
