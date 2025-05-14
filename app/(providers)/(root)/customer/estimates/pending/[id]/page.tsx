'use client';

import {
  confirmEstimate,
  getEstimateDetailByCustomer,
} from '@/api/estimate/customerOnly/estimate.api';
import favoriteApi from '@/api/favorite/favorite.api';
import FavoriteButton from '@/app/(providers)/(root)/worker/_components/FavoriteButton';
import ButtonClipOutlined from '@/components/atoms/ButtonClipOutlined';
import ButtonShareFacebook from '@/components/atoms/ButtonShareFacebook';
import ButtonShareKakao from '@/components/atoms/ButtonShareKakao';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import WorkerCardInDetail from '@/components/organisms/WorkerCardInDetail';
import { Estimate } from '@/types/entities/estimate.entity';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const ShareButtons = (
    <div className="flex flex-col gap-y-4">
      <p className="text-[20px] font-[600]">견적 공유하기</p>
      <div className="flex gap-x-4">
        <ButtonShareKakao onClick={() => router.push('/customer')} />
        <ButtonShareFacebook onClick={() => {}} />
        <ButtonClipOutlined onClick={() => {}} />
      </div>
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
        setLikeCount((prev) => (favoriteData.isLiked ? prev + 1 : prev - 1));
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
    <div className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row lg:gap-x-20 gap-10 mt-10">
      {/* 왼쪽 영역 */}
      <div className="flex-1 flex flex-col gap-y-10">
        <WorkerCardInDetail
          id={estimate.id}
          profileImage={estimate.profileImage}
          nickname={estimate.nickname}
          confirmedEstimatesCount={estimate.confirmedEstimatesCount}
          isFavorite={liked}
          favoritesCount={likeCount ?? -1}
          services={[estimate.serviceType]}
          reviewsAverage={estimate.rating ?? 0}
          reviewsCount={estimate.reviewsCount}
          summary={estimate.summary}
          experience={estimate.experience.toString()}
        />

        <div className="flex flex-col gap-y-4">
          <p className="text-[24px] font-[600]">견적가</p>
          <p className="text-[32px] font-[700]">{estimate.price ?? 0} 원</p>
        </div>

        {/* Mobile/Tablet 공유 버튼 */}
        <div className="block lg:hidden">{ShareButtons}</div>

        <EstimateDetailInfo
          requestDate={estimate.requestDate}
          serviceType={estimate.serviceType}
          movingDate={estimate.movingDate}
          departure={estimate.departure}
          destination={estimate.destination}
        />
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex-1 gap-x-2 mt-6">
        <div className="w-full flex flex-row lg:flex-col gap-x-2 gap-y-10">
          <div className="w-[54px] h-[54px] lg:w-auto lg:h-auto">
            <FavoriteButton workerId={estimate.workerId} isFavorite={liked} />
          </div>

          <ButtonSolid
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

          {/* Desktop 공유 버튼 */}
          <div className="hidden lg:block">{ShareButtons}</div>
        </div>
      </div>
    </div>
  );
}
