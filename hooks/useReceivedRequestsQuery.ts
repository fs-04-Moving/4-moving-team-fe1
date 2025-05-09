'use cliet';

import estimateRequestApi from '@/api/estimate-request/estimateRequest.api';
import { ReceivedEstimateRequestSearchParams } from '@/types/dtos/estimateRequest.dto';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useReceivedRequestsQuery(params: ReceivedEstimateRequestSearchParams) {
  return useInfiniteQuery({
    queryKey: ['ReceivedEstimateRequests', params],
    queryFn: ({ pageParam = 1 }) => {
      return estimateRequestApi.getReceivedEstimateRequests({
        ...params,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((p) => p.list).length;
      return totalLoaded < lastPage.totalCount ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
