// libs/ssr/handleSSRPrefetch.ts

import { createServerQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { dehydrate, QueryFunction, QueryKey } from '@tanstack/react-query';

export interface PrefetchQuery {
  queryKey: QueryKey;
  queryFn: QueryFunction<unknown>;
}

export async function handleSSRPrefetch(queries: PrefetchQuery[]) {
  const queryClient = createServerQueryClient();

  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}
