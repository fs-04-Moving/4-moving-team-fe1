'use client';

import React from 'react';
import FilterArea from './(components)/FilterArea';
import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import DropdownSort from '@/components/molecules/DropdownSort';
import { Worker } from '@/types/dtos/Worker.dto';
import { useSearchParams } from 'next/navigation';
import { useFindWorkerQuery } from '@/hooks/useFindWorkerQuery';
import WorkerCardList from './(components)/WorkerCardList';

type Props = {
  initialData: Worker[];
};

function FindWorkerClient({ initialData }: Props) {
  const searchParams = useSearchParams();

  const serviceArea = searchParams.get('serviceArea') || '';
  const serviceType = searchParams.get('serviceType') || '';
  const orderBy = searchParams.get('orderBy') || '';

  const { data, isLoading } = useFindWorkerQuery(
    { serviceArea, serviceType, orderBy },
    initialData
  );

  return (
    <div className="flex gap-28">
      {/* 왼쪽 필터 부분 */}
      <FilterArea />
      {/* 기사님 카드 */}
      <section className="flex-1 min-w-0">
        <div className="flex flex-col items-end gap-6 mb-8">
          <div className="w-full flex justify-between lg:justify-end">
            <div className="flex gap-3 w-[300px] lg:hidden">
              <span className="w-[90px] z-10">
                <DropdownArea />
              </span>
              <span className="w-[90px] z-30">
                <DropdownService />
              </span>
            </div>
            <span className="z-10">
              <DropdownSort
                options={[
                  '리뷰 많은순',
                  '평점 높은순',
                  '경력 높은순',
                  '확정 많은순',
                ]}
              />
            </span>
          </div>
          <input
            placeholder="텍스트를 입력해주세요"
            className="py-3.5 px-6 bg-BackGround-200 rounded-2xl w-full text-GrayScale-400"
          />
        </div>
        <WorkerCardList workers={data} isLoading={isLoading} />
      </section>
    </div>
  );
}

export default FindWorkerClient;
