import favoriteApi from '@/api/favorite/favorite.api';
import ListFavoriteWorker from '@/components/organisms/ListFavoriteWorker';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { getAccessTokenFromRefresh } from '@/utils/jwtUtils';
import { HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜한 기사님 목록',
  description: '고객이 찜한 기사님 목록을 확인하는 페이지입니다.',
};

async function FavoriteWorkersPage() {
  const accessToken = await getAccessTokenFromRefresh();

  if (!accessToken) {
    console.warn('No access token available during SSR.');
    return <ListFavoriteWorker />; // CSR fallback
  }

  const { dehydratedState } = await handleSSRPrefetch([
    // layout(ProvidersLayout)에서 user를 setQueryData로 캐싱하고 있으므로 현재 구조에선 불필요
    // {
    //   queryKey: ['me'],
    //   queryFn: () => userApi.getUserMeServer(accessToken),
    // },
    {
      queryKey: ['favorites'],
      queryFn: () => favoriteApi.getFavoriteWorkersServer(accessToken),
    },
  ]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListFavoriteWorker />
    </HydrationBoundary>
  );
}

export default FavoriteWorkersPage;
