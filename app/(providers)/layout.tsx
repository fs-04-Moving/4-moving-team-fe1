import { getUserMeServer } from '@/api/users/getUserMeServer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';
import { getAccessTokenFromRefresh } from '@/utils/getAccessTokenFromRefresh';
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
