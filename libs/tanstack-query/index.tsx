'use client';

import { isServer, QueryClientProvider } from '@tanstack/react-query';
import {
  createServerQueryClient,
  getBrowserQueryClient,
} from './reactQueryConfig';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = isServer
    ? createServerQueryClient()
    : getBrowserQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
