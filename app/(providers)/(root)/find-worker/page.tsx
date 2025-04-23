import React from 'react';
import profilesApi from '@/api/profiles/profiles.api';
import FindWorkerClient from './FindWorkerClient';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { WorkerSearchParams } from '@/types/dtos/Worker.dto';

async function FindWorkerPage() {
  console.log('[SSR] FindWorkerPage 서버 사이드 렌더링 중');
  // 토근 받아서 토큰 넘겨주기

  // const workers = await profilesApi.getWorkerProfiles({ pageSize: 5 });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['workers', { page: 1, pageSize: 5 }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, WorkerSearchParams];
      console.log('[SSR] queryFn 서버에서 params:', params);
      return profilesApi.getWorkerProfiles(params);
    },
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
