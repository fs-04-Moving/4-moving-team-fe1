import profilesApi from '@/api/profiles/profiles.api';
import { Worker, WorkerSearchParams } from '@/types/dtos/Worker.dto';
import { useInfiniteQuery } from '@tanstack/react-query';

// 기사리스트 불러오는 hooks
export function useFindWorkerQuery(
  params: WorkerSearchParams,
  initialData: {
    list: Worker[];
    totalCount: number;
  }
) {
  return useInfiniteQuery({
    queryKey: ['workers', params],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      profilesApi.getWorkerProfiles({
        ...params,
        page: pageParam,
        pageSize: 3,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((p) => p.list).length;
      return totalLoaded < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    placeholderData: () => ({
      pages: [initialData],
      pageParams: [1],
    }),
  });
}
