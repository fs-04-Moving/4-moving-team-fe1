import favoriteApi from '@/api/favorite/favorite.api';
import userApi from '@/api/user/user.api';
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
    {
      queryKey: ['me'],
      queryFn: () => userApi.getUserMeServer(accessToken),
    },
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
