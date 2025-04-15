'use client';

import favoriteApi from '@/api/favorite/favorite.api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  const handleClickCard = (workerId: string) => {
    console.log(workerId, '기사님 상세로 이동');
    router.push(`/worker/${workerId}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !favorites) return <div>오류 발생!</div>;
  if (favorites && favorites.length === 0)
    return <div>찜한 기사님이 없습니다</div>;
  console.log(favorites);
  return (
    <div className="md:w-[600px] lg:w-[1400px] flex flex-wrap gap-x-6 gap-y-12">
      {favorites.list.map((worker: DriverCardInLikedProps) => {
        console.log(worker.profileImage);
        return (
          <div
            key={worker.id}
            className="shrink-0 cursor-pointer hover:opacity-60 active:opacity-80"
            onClick={() => handleClickCard(worker.id)}
          >
            <DriverCardInLiked {...worker} />
          </div>
        );
      })}
    </div>
  );
}

export default ListFavoriteWorker;
