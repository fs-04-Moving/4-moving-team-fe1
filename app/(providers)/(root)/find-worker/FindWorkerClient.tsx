'use client';

import { useFindWorkerQuery } from '@/hooks/useFindWorkerQuery';
import { useSearchParams } from 'next/navigation';
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
  console.log('initialData', initialData);

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
    useFindWorkerQuery(queryParams);
  console.log('[CSR] 클라이언트에서 받은 데이터:', data);
  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex justify-center gap-28">
      <LeftMenu />
      <section className="w-[327px] md:w-[600px] lg:w-[955px]">
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
