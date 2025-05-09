import favoriteServerApi from '@/api/favorite/favorite.server.api';
import ListFavoriteWorker from '@/components/organisms/ListFavoriteWorker';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜한 기사님 목록',
  description: '고객이 찜한 기사님 목록을 확인하는 페이지입니다.',
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
      queryKey: ['favorites'],
      queryFn: () => favoriteServerApi.getFavoriteWorkersServer(),
    },
  ]);

  const dehydrateState = dehydrate(queryClient);
  console.log('dehydrateState', dehydrateState);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListFavoriteWorker />
    </HydrationBoundary>
  );
}

export default FavoriteWorkersPage;
