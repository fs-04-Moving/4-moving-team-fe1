'use client';

import { useFindWorkerQuery } from '@/hooks/useFindWorkerQuery';
import { WorkerSearchParams } from '@/types/dtos/Worker.dto';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import LeftMenu from './(components)/LeftMenu';
import TopMenu from './(components)/TopMenu';
import WorkerCardList from './(components)/WorkerCardList';

function FindWorkerClient() {
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const searchParams = useSearchParams();

  const queryParams: WorkerSearchParams = useMemo(() => {
    const page = 1;
    const pageSize = 3;

    const serviceArea = searchParams.get('serviceArea') || undefined;
    const serviceType = searchParams.get('serviceType') || undefined;
    const orderBy = searchParams.get('orderBy') || undefined;
    const search = searchParams.get('search') || undefined;

    return { page, pageSize, serviceArea, serviceType, orderBy, search };
  }, [searchParams]);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFindWorkerQuery(queryParams);

  return (
    <div className="flex justify-center gap-28">
      <LeftMenu />
      <section className="w-[327px] md:w-[600px] lg:w-[955px]">
        <TopMenu />
        <WorkerCardList workers={data?.pages.flatMap((p) => p.list) ?? []} isLoading={isLoading} />
        <div ref={ref}></div>
      </section>
    </div>
  );
}

export default FindWorkerClient;
