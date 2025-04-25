'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import ChartStarRatingReview from './ChartStarRatingReview';
import WorkerCardInProfile from './WorkerCardInProfile';

function WorkerMyPage() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['worker-profile'],
    queryFn: () => profilesApi.getWorkerProfile(user!.sub),
    enabled: !!user?.sub,
  });
  if (!data) return;
  const newData = {
    ...data,
    services: data.serviceType,
    serviceAreas: data.serviceArea,
  };
  console.log('newDAta', newData);

  return (
    <div className="min-h-full">
      <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
        <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
          <Label intent="md">마이페이지</Label>
        </div>
      </div>
      {data && (
        <div className="flex flex-col items-center">
          <div className="md:w-[600px] lg:w-[1400px]">
            <WorkerCardInProfile {...newData} />
            <div className="mt-12 mb-10">
              <DividerHor />
            </div>
            <p className="text-2xl font-bold mb-8">리뷰({data.reviewsCount})</p>
            <ChartStarRatingReview ratingData={[10, 20, 4, 9, 1]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerMyPage;
