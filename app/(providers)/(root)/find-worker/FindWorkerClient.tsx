'use client';

import React from 'react';
import LeftMenu from './(components)/LeftMenu';
import { Worker } from '@/types/dtos/Worker.dto';
import { useSearchParams } from 'next/navigation';
import { useFindWorkerQuery } from '@/hooks/useFindWorkerQuery';
import WorkerCardList from './(components)/WorkerCardList';
import TopMenu from './(components)/TopMenu';

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
      <LeftMenu />
      <section className="flex-1 min-w-0">
        <TopMenu />
        <WorkerCardList workers={data} isLoading={isLoading} />
      </section>
    </div>
  );
}

export default FindWorkerClient;
