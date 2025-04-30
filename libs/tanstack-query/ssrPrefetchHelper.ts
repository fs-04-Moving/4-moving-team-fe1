import { createServerQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { QueryClient } from '@tanstack/react-query';

export interface PrefetchQuery<T> {
  queryKey: unknown[];
  queryFn: () => Promise<T>;
}

// /**
//  * SSR 단계에서 여러 쿼리를 prefetch하는 유틸 함수
//  * - 쿼리 함수 실패 시 개별 에러를 무시하고 전체 SSR을 막지 않음(Promise.allSettled)
//  */
export async function handleSSRPrefetch(queries: PrefetchQuery<unknown>[]) {
  const queryClient: QueryClient = createServerQueryClient();

  await Promise.allSettled(
    queries.map(async ({ queryKey, queryFn }) => {
      try {
        await queryClient.prefetchQuery({ queryKey, queryFn });
      } catch (e) {
        console.error(`SSR prefetch failed for [${queryKey}]:`, e);
      }
    })
  );

  return {
    queryClient,
  };
}
