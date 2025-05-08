import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';
import { createServerQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { getUserFromRequestLite } from '@/utils/getUserFromRequestLite';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

async function ProvidersLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromRequestLite();
  const queryClient = createServerQueryClient({
    queries: {
      staleTime: Infinity, // 사용자가 로그아웃 후 재로그인하거나 정보를 변경할 때에만 갱신,
      retry: 0,
    },
  });

  console.log('SSR user', user);
  if (user) {
    queryClient.setQueryData(['me'], user); // SSR 캐시 세팅
  }
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
