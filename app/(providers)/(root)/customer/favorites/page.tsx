import favoriteApi from '@/api/favorite/favorite.api';
import Label from '@/components/atoms/Label';
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
      <div className="bg-BackGround-200 min-h-full">
        <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
          <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
            <Label intent="md">찜한 기사님</Label>
          </div>
        </div>
        <div className="flex justify-center">
          <ListFavoriteWorker />
        </div>
      </div>
    </HydrationBoundary>
  );
}

export default FavoriteWorkersPage;
