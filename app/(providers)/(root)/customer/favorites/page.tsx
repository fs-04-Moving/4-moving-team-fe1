import favoriteApi from '@/api/favorite/favorite.api';
import userApi from '@/api/user/user.api';
import ListFavoriteWorker from '@/components/organisms/ListFavoriteWorker';
import { handleSSRPrefetch } from '@/libs/tanstack-query/ssrPrefetchHelper';
import { getAccessTokenFromRefresh } from '@/utils/jwtUtils';
import { HydrationBoundary } from '@tanstack/react-query';

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
