'use client';

import profilesApi from '@/api/profiles/profiles.api';
import reviewApi from '@/api/review/review.api';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import DividerHor from '../atoms/DividerHor';
import ErrorMessage from '../atoms/ErrorMessage';
import Label from '../atoms/Label';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ChartStarRatingReview from './ChartStarRatingReview';
import WorkerCardInProfile from './WorkerCardInProfile';

function WorkerMyPage() {
  const { user } = useAuth();
  console.log('user in WorkerMyPage', user);
  const router = useRouter();

  // 기사 프로필 받아오기
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['worker-profile'],
    queryFn: () => profilesApi.getWorkerProfile(user!.sub),
    enabled: !!user?.sub,
    staleTime: 1000 * 10,
    gcTime: 1000 * 60 * 10, // 10분
  });

  // 기사 리뷰 목록 받아오기
  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ['worker-reviews', { workerId: user!.sub }],
    queryFn: () => reviewApi.getWorkerReviews(user!.sub),
    enabled: !!user?.sub,
    staleTime: 1000 * 10,
    gcTime: 1000 * 60 * 10, // 10분
  });

  if (isProfileLoading || isReviewsLoading) return <LoadingSpinner />;
  if (!profile || !reviews) return <ErrorMessage />;

  // 두 변수의 이름을 진호님 컴포넌트에 맞게 변경
  const { serviceType, serviceArea, ...restProfile } = profile;
  console.log(serviceType, serviceArea);
  const newProfile = {
    ...restProfile,
    services: serviceType,
    serviceAreas: serviceArea,
  };
  console.log('newprofile', newProfile, reviews);

  return (
    <div className="min-h-full">
      <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
        <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
          <Label intent="md">마이페이지</Label>
        </div>
      </div>
      {profile && reviews && (
        <div className="flex flex-col items-center">
          <div className="md:w-[600px] lg:w-[1400px]">
            <WorkerCardInProfile
              {...newProfile}
              onConfirm={() => router.push(ROUTES.WORKER.PROFILE_EDIT)}
              onViewDetail={() => router.push(ROUTES.WORKER.INFO)}
            />
            <div className="my-6 lg:my-12">
              <DividerHor />
            </div>
            <p className="text-base lg:text-2xl font-bold mb-8">리뷰({profile.reviewsCount})</p>
            <ChartStarRatingReview ratingData={reviews.starCountList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerMyPage;
