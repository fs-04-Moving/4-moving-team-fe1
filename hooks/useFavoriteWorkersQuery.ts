import favoriteApi from '@/api/favorite/favorite.api';
import { Worker } from '@/types/dtos/Worker.dto';
import { useQuery } from '@tanstack/react-query';

type FavoriteWorkersResponse = {
  list: Worker[];
  totalCount: number;
};

export function useFavoriteWorkersQuery() {
  return useQuery<FavoriteWorkersResponse>({
    queryKey: ['favoriteWorkers'],
    queryFn: () => favoriteApi.getFavoriteWorkers(),
  });
}
