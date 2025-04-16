'use client';

import { isServer, QueryClientProvider } from '@tanstack/react-query';
import {
  createServerQueryClient,
  getBrowserQueryClient,
} from './reactQueryConfig';

// 간단한 구조의 프로젝트에서는 provider에서만 구분하여 생성하고 내려줘도 되지만
// 규모가 커질 경우 지금처럼 별도 함수로 분리하여 관리하는 것이 좋음
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = isServer
    ? createServerQueryClient()
    : getBrowserQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
