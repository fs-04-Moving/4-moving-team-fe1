// components/organisms/EstimateCardList.tsx
'use client';

import { useEffect, useState } from 'react';
import { Estimate } from '@/types/entities/estimate.entity';
import { getReceivedEstimates } from '@/api/estimate/customerOnly/estimate.api';
import WorkerCardInList from '@/components/organisms/WorkerCardInList';
import FilterDropdown from '@/components/molecules/FilterDropdown';

interface Props {
  estimateRequestId: string;
}

const filterOptions = ['전체', '확정한 견적서'];

function EstimateCardList({ estimateRequestId }: Props) {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [filteredEstimates, setFilteredEstimates] = useState<Estimate[]>([]);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await getReceivedEstimates({
          estimateRequestId,
          page: 1,
          pageSize: 10,
        });

        if (!response) {
          setError('견적 데이터를 불러오지 못했습니다.');
          return;
        }

        setEstimates(response.list);

        setFilteredEstimates(response.list); // 기본 전체 출력
      } catch (err) {
        setError('견적 조회 실패');
        console.error(err);
      }
    };

    fetchEstimates();
  }, [estimateRequestId]);

  const handleFilter = (selected: string) => {
    if (selected === '전체') {
      setFilteredEstimates(estimates);
    } else if (selected === '확정한 견적서') {
      setFilteredEstimates(estimates.filter((e) => e.isConfirmed));
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div
      className="w-full flex flex-col gap-y-6 
      shadow-soft-gray-reverse
    "
    >
      <h2 className="text-[16px] md:text-[16px] lg:text-[24px] font-[600]">견적 목록</h2>
      <div className="flex justify-start">
        {/* 정렬 목록' */}
        <FilterDropdown options={filterOptions} onSelect={handleFilter} />
      </div>
      <ul
        className="flex flex-col mt-2 space-y-2
        gap-y-6 lg:gap-y-14
       "
      >
        {filteredEstimates.map((estimate) => (
          <div
            className="flex flex-col gap=-y-6 md:gap-y-8 lg:gap-y-14 shadow-[#DCDCDC] shadow-[1px] backdrop-blur-[10px]"
            key={estimate.id}
          >
            <WorkerCardInList
              profileImage={estimate.profileImage}
              nickname={estimate.nickname}
              experience={estimate.experience}
              confirmedEstimatesCount={estimate.confirmedEstimatesCount}
              isFavorite={estimate.isFavorite}
              favoritesCount={estimate.favoritesCount}
              services={[estimate.serviceType]}
              price={estimate.price ?? 0}
              reviewsAverage={estimate.rating ?? 0}
              reviewsCount={estimate.reviewsCount}
              summary={estimate.summary}
              status={estimate.status}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default EstimateCardList;
