import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';
import { QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

async function ProvidersLayout({
  children,
  client,
}: {
  children: ReactNode;
  client: QueryClient;
}) {
  console.log('client', client);
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
