'use client';

import { getPendingEstimates } from '@/api/estimate/customerOnly/estimate.api';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import { Estimate } from '@/types/entities/estimate.entity';
import { EstimateRequestStatus, EstimateStatus } from '@/types/move.type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PendingEstimateList: React.FC = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const page = 1;
  const pageSize = 10;

  const statusMap: Record<EstimateStatus, EstimateRequestStatus> = {
    general: 'active',
    assigned: 'confirmed',
    rejected: 'inactive',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPendingEstimates({ page, pageSize });
        if (data) {
          setEstimates(data.list);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="
      mx-auto
      mt-12
      w-[327px] md:w-[600px] lg:w-[1400px]
      grid grid-cols-1 lg:grid-cols-2 gap-4
    "
    >
      {estimates.map((estimate) => (
        <WorkerCardInWating
          key={estimate.id}
          profileImage={estimate.profileImage}
          nickname={estimate.nickname}
          experience={estimate.experience}
          confirmedEstimateCount={estimate.confirmedEstimatesCount}
          isFavorite={false} // API에서 제공되지 않는 경우 false로 설정하거나 별도로 관리
          favoritesCount={estimate.favoritesCount}
          services={[estimate.serviceType]} // serviceType은 단일 값이므로 배열로 감싸기
          isDirectEstimate={false} // 지정 견적 여부는 별도 필드 필요. 일단 false로 설정
          price={estimate.price}
          estimateRequestStatus={statusMap[estimate.status]} // 매핑된 값 사용!
          movingDate={new Date(estimate.movingDate)}
          departure={estimate.departure}
          destination={estimate.destination}
          reviewsAverage={estimate.workerRating}
          reviewsCount={estimate.reviewsCount}
          onConfirm={() => {
            // 클릭 시 로직 추가 필요
            console.log(`${estimate.id} 견적 확정하기 클릭`);
          }}
          onViewDetail={() => {
            // 상세 보기 로직 추가 필요
            router.push(`/customer/estimates/pending/${estimate.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default PendingEstimateList;
