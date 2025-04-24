import React from 'react';
import profilesApi from '@/api/profiles/profiles.api';
import FindWorkerClient from './FindWorkerClient';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { WorkerPage, WorkerSearchParams } from '@/types/dtos/Worker.dto';

async function FindWorkerPage() {
  console.log('[SSR] FindWorkerPage 서버 사이드 렌더링 중');
  // 토근 받아서 토큰 넘겨주기

  // const workers = await profilesApi.getWorkerProfiles({ pageSize: 5 });

  const queryParams = {
    serviceArea: '',
    serviceType: '',
    orderBy: '',
    page: 1,
    pageSize: 5,
  } as WorkerSearchParams;

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery<
    WorkerPage,
    Error,
    WorkerPage,
    [string, WorkerSearchParams]
  >({
    queryKey: ['workers', queryParams],
    queryFn: ({
      pageParam = 1,
    }: {
      pageParam: number;
    }): Promise<WorkerPage> => {
      console.log(
        '[SSR] queryFn 서버에서 params:',
        queryParams,
        'pageParam:',
        pageParam
      );
      return profilesApi.getWorkerProfiles({ ...queryParams, page: pageParam });
    },
    getNextPageParam: (lastPage: WorkerPage, allPages: WorkerPage[]) => {
      const loaded = allPages.flatMap((page) => page.list).length;
      return loaded < lastPage.totalCount ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <div className="hidden lg:flex justify-center">
        <h2 className="font-semibold text-2xl py-8 w-[1400px]">기사님 찾기</h2>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <FindWorkerClient />
      </HydrationBoundary>
    </main>
  );
}

export default FindWorkerPage;
