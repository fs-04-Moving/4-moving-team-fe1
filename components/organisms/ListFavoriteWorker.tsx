'use client';

import favoriteApi from '@/api/favorite/favorite.api';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../atoms/LoadingSpinner';
import DriverCardInLiked, { DriverCardInLikedProps } from './DriverCardInLiked';

function ListFavoriteWorker() {
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: favoriteApi.getFavoriteWorkers,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !favorites) return <div>오류 발생!</div>;
  console.log(favorites);
  return (
    <div className="md:w-[600px] lg:w-[1400px] flex flex-wrap gap-x-6 gap-y-12">
      {favorites.list.map((worker: DriverCardInLikedProps) => {
        console.log(worker.profileImage);
        return (
          <div key={worker.id} className="shrink-0">
            <DriverCardInLiked {...worker} />
          </div>
        );
      })}
    </div>
  );
}

export default ListFavoriteWorker;
