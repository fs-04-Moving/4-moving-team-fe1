'use client';

import favoriteApi from '@/api/favorite/favorite.api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Label from '../atoms/Label';
import SkeletonFavoriteList from '../atoms/SkeletonFavoriteList';
import WorkerCardInLiked, { WorkerCardInLikedProps } from './WorkerCardInLiked';

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
    router.push(`/worker/${workerId}`);
  };

  if (isLoading) return <SkeletonFavoriteList />;
  if (isError || !favorites) return <div>오류 발생!</div>;
  if (favorites && favorites.totalCount === 0)
    return <div>찜한 기사님이 없습니다</div>;
  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
        <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
          <Label intent="md">찜한 기사님</Label>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row flex-wrap gap-x-6 gap-y-6 md:gap-y-8 lg:gap-y-12">
          {favorites.list.map((worker: WorkerCardInLikedProps) => {
            return (
              <div
                key={worker.id}
                className="shrink-0 cursor-pointer hover:opacity-60 active:opacity-80"
                onClick={() => handleClickCard(worker.id)}
              >
                <WorkerCardInLiked {...worker} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListFavoriteWorker;
