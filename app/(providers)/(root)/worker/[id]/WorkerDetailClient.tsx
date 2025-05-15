'use client';

import profilesApi from '@/api/profiles/profiles.api';
import DividerHor from '@/components/atoms/DividerHor';
import MovingTypeDisplay from '@/components/molecules/MovingTypeDisplay';
import RegionDisplay from '@/components/molecules/RegionDisplay';
import WorkerCardInSearch from '@/components/organisms/WorkerCardInSearch';
import { AreaType, ServiceType } from '@/types/move.type';
// import { useAuth } from '@/contexts/AuthContext';
import ShareSocial from '@/components/molecules/ShareSocial';
import { useQuery } from '@tanstack/react-query';
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
  // 서버에서 가져온 데이터 사용
  // const [reviewData] = useState<ReviewData>(initialReviewData);

  // const {isLoggedIn} = useAuth()

  const { data: workerData, isLoading } = useQuery({
    queryKey: ['worker', workerId],
    queryFn: () => profilesApi.getWorkerProfile(workerId),
  });

  const workerDescription = workerData?.description || workerData?.description || '';

  if (isLoading) return <div>로딩 중...</div>;
  if (!workerData) return <div>데이터를 찾을 수 없습니다</div>;
  return (
    // <div></div>
    <div className="container mx-auto px-4 py-14">
      <div className="flex flex-col md:flex-row relative">
        {/* 왼쪽 바디 영역 */}
        <div className="flex-1 lg:max-w-[calc(90%-24rem)] ">
          {/* 컨텐츠 상세 섹션 */}
          <section>
            <h1 className="text-2xl font-bold mb-4">기사님 상세 정보</h1>
            {/* <WorkerCardInSearch key={workerData.workerId} {...workerData} /> */}
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
          <div className="mb-10 mt-10">
            <DividerHor />
          </div>

          <section className="mb-6">
            <h3 className="text-2xl font-bold mb-8">상세설명</h3>
            <p className="text-lg">{workerDescription || '상세 설명이 없습니다.'}</p>
          </section>

          <div className="mb-10 mt-10">
            <DividerHor />
          </div>

          <section className="mb-6">
            <h3 className="text-2xl font-bold mb-8">제공서비스</h3>
            <MovingTypeDisplay types={workerData.serviceType} />
          </section>
          <div className="mb-10 mt-10">
            <DividerHor />
          </div>

          <section className="mb-6">
            <h3 className="text-2xl font-bold mb-8">서비스 가능 지역</h3>
            <RegionDisplay region={workerData.serviceArea} />
          </section>
          <div className="mb-10 mt-10">
            <DividerHor />
          </div>

          {/* 댓글 영역 섹션 */}
          <section className="p-6">
            <ReviewCardList workerId={workerId} initialPage={1} itemsPerPage={3} />
          </section>
        </div>

        {/* 오른쪽 바디 영역 */}
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-96 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:w-full max-lg:bg-white max-lg:shadow-lg max-lg:z-10 max-lg:p-4 h-22">
          <section>
            <div className="flex flex-col w-[375px] md:w-[648px] lg:w-full">
              <WorkerActionButtons
                workerId={workerId}
                workerName={workerData.nickname}
                isFavorite={workerData.isFavorite}
              />
            </div>
          </section>
          <div className="mb-8 mt-8">
            <DividerHor />
          </div>
          <section className="hidden lg:inline">
            <ShareSocial
              url={`${process.env.NEXT_PUBLIC_BASE_URL}/worker/${workerId}`}
              nickname={workerData.nickname}
              summary={workerData.summary}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default WorkerDetailClient;
