'use client';

import {
  confirmEstimate,
  getEstimateDetailByCustomer,
} from '@/api/estimate/customerOnly/estimate.api';
import favoriteApi from '@/api/favorite/favorite.api';
import FavoriteButton from '@/app/(providers)/(root)/worker/_components/FavoriteButton';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import ShareSocial from '@/components/molecules/ShareSocial';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import WorkerCardInDetail from '@/components/organisms/WorkerCardInDetail';
import { Estimate } from '@/types/entities/estimate.entity';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const ShareButtons = (
    <div className="flex flex-col">
      <ShareSocial text="견적 공유하기" />
    </div>
  );

  // 견적 정보 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchEstimate = async () => {
      setLoading(true);
      try {
        const data = await getEstimateDetailByCustomer(id);
        if (data) {
          setEstimate(data);
          setLikeCount(data.favoritesCount);
        } else {
          setEstimate(null);
        }
      } catch (err) {
        console.error('견적 정보 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [id]);

  // 좋아요 정보 쿼리
  const { data: favoriteData } = useQuery({
    queryKey: ['worker', estimate?.workerId],
    queryFn: async () => {
      if (!estimate?.workerId) return;
      const [count, favoriteList] = await Promise.all([
        favoriteApi.getFavoriteCountByWorkerId(estimate.workerId),
        favoriteApi.getFavoriteWorkers(),
      ]);

      const isLiked = favoriteList?.list.some(
        (worker: { id: string }) => worker.id === estimate.workerId,
      );

      return { count, isLiked };
    },
    enabled: !!estimate?.workerId,
  });

  useEffect(() => {
    if (favoriteData) {
      setLiked(favoriteData.isLiked);

      if (isFirstLoad) {
        setLikeCount(favoriteData.count);
        setIsFirstLoad(false);
      } else {
        setLikeCount((prev) => (favoriteData.isLiked ? prev + 1 : Math.max(0, prev - 1)));
      }
    }
  }, [favoriteData, isFirstLoad]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner size="md" />
        <p className="text-3xl mt-10">상세 견적 불러오는 중입니다...</p>
      </div>
    );
  if (!estimate) return <EmptyListMessage message={'대기중인 견적이 없습니다.'} />;

  return (
    <div className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row lg:gap-x-[117px] gap-10 mt-10">
      {/* 왼쪽 영역 */}
      <div
        className="flex-1 flex flex-col 
        gap-y-6 lg:gap-y-8 
        gap-x-8 lg:gap-x-10"
      >
        <h1 className="text-[#2B2B2B] text-[16px] lg:text-[24px] font-[600]">견적 상세</h1>
        <div className="backdrop-blur-[#DCDCDC] shadow-[10%]">
          <WorkerCardInDetail
            id={estimate.id}
            profileImage={estimate.profileImage}
            nickname={estimate.nickname}
            confirmedEstimatesCount={estimate.confirmedEstimatesCount}
            isFavorite={liked}
            favoritesCount={likeCount ?? 0}
            services={[estimate.serviceType]}
            reviewsAverage={estimate.rating ?? 0}
            reviewsCount={estimate.reviewsCount}
            summary={estimate.summary}
            experience={estimate.experience.toString()}
          />
        </div>

        <div className="border-[#F2F2F2] border-[1px] sm:my-6 lg:my-10"></div>

        <div className="flex flex-col gap-y-4 lg:gap-y-8">
          <p className="text-[#1F1F1F] text-[16px] lg:text-[24px] font-[600]">견적가</p>
          <p className="text-[#1F1F1F] text-[20px] lg:text-[32px] font-[700]">
            {(estimate.price ?? 0).toLocaleString()} 원
          </p>
        </div>
        <div className="block lg:hidden border-[#F2F2F2] border-[1px] sm:my-6 lg:my-10"></div>

        {/* Mobile/Tablet 공유 버튼 */}
        <div className="block lg:hidden">{ShareButtons}</div>

        <div className="hidden md:block border-[#F2F2F2] border-[1px] sm:my-6 lg:my-10"></div>
        <EstimateDetailInfo
          requestDate={estimate.requestDate}
          serviceType={estimate.serviceType}
          movingDate={estimate.movingDate}
          departure={estimate.departure}
          destination={estimate.destination}
        />
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex-1 gap-x-2 mt-6 gap-y-6 lg:gap-y-10">
        <div className="w-full hidden lg:block">
          <div className="w-full flex flex-row lg:flex-col gap-x-2 gap-y-10">
            <div className="w-[54px] h-[54px] lg:w-auto lg:h-auto">
              <FavoriteButton workerId={estimate.workerId} isFavorite={liked} />
            </div>

            <ButtonSolid
              disabled={estimate.isConfirmed}
              onClick={async () => {
                if (!estimate.price || estimate.price < 0) {
                  alert('아직 가격이 등록되지 않아 확정할 수 없습니다.');
                  return;
                }

                try {
                  await confirmEstimate(estimate.id);
                  alert('견적이 확정되었습니다.');
                } catch (error) {
                  alert('견적 확정에 실패했습니다.');
                  console.error(error);
                }
              }}
            >
              견적 확정하기
            </ButtonSolid>
          </div>

          <div className="border-[#F2F2F2] border-[1px] sm:my-6 lg:my-10"></div>

          {/* Desktop 공유 버튼 */}
          <div className="hidden lg:block">{ShareButtons}</div>
        </div>

        {/* sm~md 뷰에서만 보여지는 고정 하단 버튼 */}
        <div className="w-full ">
          <div
            className="mx-auto bg-white z-[9999] h-auto w-[327px] md:w-[600px] lg:w-[1400px]
           fixed bottom-0 left-0 right-0 p-4  flex gap-x-2 items-center lg:hidden"
          >
            <div className="w-[54px] h-[54px] lg:w-auto lg:h-auto">
              <FavoriteButton workerId={estimate.workerId} isFavorite={liked} />
            </div>
            <ButtonSolid
              disabled={estimate.isConfirmed}
              onClick={async () => {
                if (!estimate.price || estimate.price < 0) {
                  alert('아직 가격이 등록되지 않아 확정할 수 없습니다.');
                  return;
                }

                try {
                  await confirmEstimate(estimate.id);
                  alert('견적이 확정되었습니다.');
                } catch (error) {
                  alert('견적 확정에 실패했습니다.');
                  console.error(error);
                }
              }}
            >
              견적 확정
            </ButtonSolid>
          </div>
        </div>
      </div>
    </div>
  );
}
