import favoriteApi from '@/api/favorite/favorite.api';
import ListFavoriteWorker from '@/components/organisms/ListFavoriteWorker';
import { createServerQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function FavoriteWorkersPage() {
  const favoritesQueryClient = createServerQueryClient();
  await favoritesQueryClient.prefetchQuery({
    queryKey: ['favorites'],
    queryFn: favoriteApi.getFavoriteWorkers,
  });
  return (
    <HydrationBoundary state={dehydrate(favoritesQueryClient)}>
      <ListFavoriteWorker />
    </HydrationBoundary>
  );
}

export default FavoriteWorkersPage;
