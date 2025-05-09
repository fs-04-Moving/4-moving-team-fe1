'use client';

import favoriteApi from '@/api/favorite/favorite.api';
import ROUTES from '@/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Label from '../atoms/Label';
import SkeletonFavoriteList from '../atoms/SkeletonFavoriteList';
import EmptyListMessage from '../molecules/EmptyListMessage';
import WorkerCardInLiked, { WorkerCardInLikedProps } from './WorkerCardInLiked';

function ListFavoriteWorker() {
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => {
      console.log('클라이언트 favorites 쿼리 실행됨!');
      return favoriteApi.getFavoriteWorkers();
    },
    // queryFn: favoriteApi.getFavoriteWorkers,
  });

  const router = useRouter();

  const handleClickCard = (workerId: string) => {
    router.push(ROUTES.WORKER.DETAIL(workerId));
  };

  if (isLoading) return <SkeletonFavoriteList />;
  if (isError || !favorites) return <div>오류 발생!</div>;
  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
        <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
          <Label intent="md">찜한 기사님</Label>
        </div>
      </div>
      {favorites.totalCount === 0 ? (
        <EmptyListMessage message="찜한 기사님이 없습니다." />
      ) : (
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
      )}
    </div>
  );
}

export default ListFavoriteWorker;
