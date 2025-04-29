// SSR 구조
// 이 구조를 사용하면 CSR의 queryFn 로그가 찍히지 않습니다.

import profilesApi from '@/api/profiles/profiles.api';
import { createServerQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { WorkerPage, WorkerSearchParams } from '@/types/dtos/Worker.dto';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import FindWorkerClient from './FindWorkerClient';

const baseParams: WorkerSearchParams = {
  page: 1,
  pageSize: 5,
  serviceArea: undefined,
  serviceType: undefined,
  orderBy: undefined,
  search: undefined,
};

async function FindWorkerPage() {
  // const accessToken = await getAccessTokenFromRefresh();

  const queryClient = createServerQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['workers', baseParams],
    queryFn: ({ pageParam = 1 }) => {
      return profilesApi.getWorkerProfilesServer(
        { ...baseParams, page: pageParam }
        // accessToken
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: WorkerPage, allPages: WorkerPage[]) => {
      if (!lastPage || !Array.isArray(allPages)) return undefined;
      const totalLoaded = allPages.flatMap((p) => p.list ?? []).length;
      return totalLoaded < (lastPage.totalCount ?? 0)
        ? allPages.length + 1
        : undefined;
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

// CSR 구조
// 이 구조를 사용하면 클라이언트의 queryFn 실행 로그가 찍힙니다. 진호님 참고하세요.
// import FindWorkerClient from './FindWorkerClient';

// async function FindWorkerPage() {
//   return (
//     <main>
//       <div className="hidden lg:flex justify-center">
//         <h2 className="font-semibold text-2xl py-8 w-[1400px]">기사님 찾기</h2>
//       </div>
//       <FindWorkerClient />
//     </main>
//   );
// }

// export default FindWorkerPage;
