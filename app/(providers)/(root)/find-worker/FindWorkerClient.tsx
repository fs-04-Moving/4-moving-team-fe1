'use client';

import { useFindWorkerQuery } from '@/hooks/useFindWorkerQuery';
import { Worker } from '@/types/dtos/Worker.dto';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import LeftMenu from './(components)/LeftMenu';
import TopMenu from './(components)/TopMenu';
import WorkerCardList from './(components)/WorkerCardList';

type Props = {
  initialData: { list: Worker[]; totalCount: number };
};

function FindWorkerClient({ initialData }: Props) {
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const searchParams = useSearchParams();

  const serviceArea = searchParams.get('serviceArea') || '';
  const serviceType = searchParams.get('serviceType') || '';
  const orderBy = searchParams.get('orderBy') || '';
  const search = searchParams.get('search') || '';

  const queryParams = Object.fromEntries(
    Object.entries({ serviceArea, serviceType, orderBy, search }).filter(
      ([, value]) => value !== ''
    )
  );

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFindWorkerQuery(queryParams, initialData);

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex gap-28">
      <LeftMenu />
      <section className="flex-1 min-w-0">
        <TopMenu />
        <WorkerCardList
          workers={data?.pages.flatMap((p) => p.list) ?? []}
          isLoading={isLoading}
        />
        <div ref={ref}></div>
      </section>
    </div>
  );
}

export default FindWorkerClient;
