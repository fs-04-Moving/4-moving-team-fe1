import { DefaultOptions, QueryClient } from '@tanstack/react-query';

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
    retry: 0,
  },
};

// 재사용 가능한 queryClient 생성 함수

// 서버용 QueryClient 생성
export function createServerQueryClient(options?: DefaultOptions) {
  return new QueryClient({
    defaultOptions: { ...defaultQueryOptions, ...options }, // 옵션 병합
  });
}

// 브라우저용 QueryClient 싱글턴 관리
let browserQueryClient: QueryClient | undefined;

export function getBrowserQueryClient(options?: DefaultOptions) {
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: { ...defaultQueryOptions, ...options },
    });
  }
  return browserQueryClient;
}
