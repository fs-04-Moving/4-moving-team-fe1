import serverApi from '@/api/server.api';
import ListFavoriteWorker from '@/components/organisms/ListFavoriteWorker';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜한 기사님 목록',
  description: '고객이 찜한 기사님 목록을 확인하는 페이지입니다.',
};

const defaultPageParams = {
  page: 1,
  // 이 값이 ListFavoriteWorker에서 설정되는 값과 같으면 refetch하지 않고, 다르면 refetch됨
  // 그러므로 데스크탑보다 모바일에서 더 자주 사용될 것으로 예상될 경우 '4'로 변경하는 것이 SSR에 유리함
  pageSize: 6,
};

async function FavoriteWorkersPage() {
  const { queryClient } = await handleSSRPrefetch([
    // layout(ProvidersLayout)에서 user를 setQueryData로 캐싱하고 있으므로 현재 구조에선 불필요
    // 쿼리 함수가 1개라면 굳이 핸들러를 따로 뺄 필요가 없었으나 학습을 위해 핸들러 유지
    // {
    //   queryKey: ['me'],
    //   queryFn: () => userApi.getUserMeServer(accessToken),
    // },
    {
      queryKey: [
        'favorites',
        { page: defaultPageParams.page, pageSize: defaultPageParams.pageSize },
      ],
      queryFn: () =>
        serverApi.getFavoriteWorkersServer({
          page: defaultPageParams.page,
          pageSize: defaultPageParams.pageSize,
        }),
    },
  ]);

  const dehydratedState = dehydrate(queryClient);
  console.log('dehydratedState', dehydratedState);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListFavoriteWorker />
    </HydrationBoundary>
  );
}

export default FavoriteWorkersPage;
