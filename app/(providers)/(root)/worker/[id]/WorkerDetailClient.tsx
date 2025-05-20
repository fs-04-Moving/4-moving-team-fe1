'use client';

import profilesApi from '@/api/profiles/profiles.api';
import DividerHor from '@/components/atoms/DividerHor';
import MovingTypeDisplay from '@/components/molecules/MovingTypeDisplay';
import RegionDisplay from '@/components/molecules/RegionDisplay';
import WorkerCardInSearch from '@/components/organisms/WorkerCardInSearch';
import { AreaType, ServiceType } from '@/types/move.type';
// import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ShareSocial from '@/components/molecules/ShareSocial';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import ReviewCardList from '../_components/ReviewCardList';
import WorkerActionButtons from '../_components/WorkerActionButtons';

interface WorkerDetailClientProps {
  workerData?: {
    id: string;
    profileImage: string;
    summary: string;
    description: string;
    nickname: string;
    experience: number;
    favoritesCount: number;
    reviewsCount: number;
    reviewsAverage: number | null;
    confirmedEstimatesCount: number;
    serviceType: ServiceType[];
    serviceArea: (keyof AreaType)[];
    isFavorite?: boolean;
  };
  // initialReviewData: ReviewData;
  workerId: string;
}

function WorkerDetailClient({ workerId }: WorkerDetailClientProps) {
  const { data: workerData, isLoading } = useQuery({
    queryKey: ['worker', workerId],
    queryFn: () => profilesApi.getWorkerProfile(workerId),
  });

  const workerDescription = workerData?.description || workerData?.description || '';

  if (isLoading) return <LoadingSpinner size="md" />;
  if (!workerData) return <div>데이터를 찾을 수 없습니다</div>;
  return (
    <div className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row lg:gap-x-[117px] gap-10 mt-10">
      {/* 왼쪽 바디 영역 */}
      <div className="flex-1 flex flex-col gap-y-6 lg:gap-y-10 gap-x-8 lg:gap-x-10 w-full">
        {/* 컨텐츠 상세 섹션 */}
        <section>
          <WorkerCardInSearch
            profileImage={workerData.profileImage}
            nickname={workerData.nickname}
            experience={workerData.experience}
            summary={workerData.summary}
            services={workerData.serviceType}
            reviewsAverage={workerData.reviewsAverage || 0}
            reviewsCount={workerData.reviewsCount}
            favoritesCount={workerData.favoritesCount}
            confirmedEstimatesCount={workerData.confirmedEstimatesCount}
            isFavorite={workerData.isFavorite || false}
          />
        </section>
        <DividerHor />

        <section className="inline lg:hidden">
          <ShareSocial nickname={workerData.nickname} summary={workerData.summary} />
          <div className="mt-10">
            <DividerHor />
          </div>
        </section>

        <section>
          <h3 className="text-base lg:text-2xl font-bold mb-8">상세설명</h3>
          <p className="text-lg">{workerDescription || '상세 설명이 없습니다.'}</p>
        </section>
        <DividerHor />

        <section>
          <h3 className="text-base lg:text-2xl font-bold mb-8">제공서비스</h3>
          <MovingTypeDisplay types={workerData.serviceType} />
        </section>
        <DividerHor />

        <section>
          <h3 className="text-base lg:text-2xl font-bold mb-8">서비스 가능 지역</h3>
          <RegionDisplay region={workerData.serviceArea} />
        </section>
        <DividerHor />

        {/* 댓글 영역 섹션 */}
        <section>
          <div className="lg:w-[955px] lg:h-[296px] md:h-[176px] md:w-[600px] ">
            <ReviewCardList workerId={workerId} initialPage={1} itemsPerPage={3} />
          </div>
        </section>
      </div>

      {/* 오른쪽 바디 영역 */}
      <div
        className={clsx(
          // sm, md 일때 기본으로
          'flex-1 gap-x-2 mt-6 gap-y-6',
          'fixed bottom-0 bg-white',
          // lg에서만 다르게 하기
          'lg:static lg:gap-y-10 lg:bg-transparent',
        )}
      >
        <div className="w-full flex flex-row lg:flex-col gap-x-2 gap-y-10">
          <section>
            <div className="flex flex-col w-[327px] md:w-[600px] lg:w-full">
              <WorkerActionButtons
                workerId={workerId}
                workerName={workerData.nickname}
                isFavorite={workerData.isFavorite}
              />
            </div>
          </section>
          <DividerHor />
          <section className="hidden lg:inline">
            <ShareSocial nickname={workerData.nickname} summary={workerData.summary} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default WorkerDetailClient;
