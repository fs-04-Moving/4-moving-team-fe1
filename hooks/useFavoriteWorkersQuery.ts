import favoriteApi, { GetFavoriteWorkersParams } from '@/api/favorite/favorite.api';
import { Worker } from '@/types/dtos/Worker.dto';
import { useQuery } from '@tanstack/react-query';

type FavoriteWorkersResponse = {
  list: Worker[];
  totalCount: number;
};

export function useFavoriteWorkersQuery(params: GetFavoriteWorkersParams) {
  return useQuery<FavoriteWorkersResponse>({
    queryKey: ['favoriteWorkers'],
    queryFn: () => favoriteApi.getFavoriteWorkers(params),
  });
}
