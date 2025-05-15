import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useFavoriteWorkersQuery } from '@/hooks/useFavoriteWorkersQuery';
import WorkerCardInSearch from '@/components/organisms/WorkerCardInSearch';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

function FilterArea() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const { data, isLoading } = useFavoriteWorkersQuery();

  const handleAreaSelect = (area: string, code?: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (code) {
      switch (code) {
        case 'all':
          newParams.delete('serviceArea');
          router.push(`?${newParams.toString()}`);
          break;
        default:
          newParams.set('serviceArea', code);
          router.push(`?${newParams.toString()}`);
      }
    }
  };

  const handleServiceSelect = (service?: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (service) {
      switch (service) {
        case 'all':
          newParams.delete('serviceType');
          router.push(`?${newParams.toString()}`);
          break;
        default:
          newParams.set('serviceType', service);
          router.push(`?${newParams.toString()}`);
      }
    }
  };

  const handleFilterReset = () => {
    router.push(pathname);
  };

  return (
    <aside className="hidden w-full max-w-[328px] lg:w-[32%] lg:block">
      <div className="flex flex-col gap-9">
        <div className="flex justify-between px-2.5 py-4 border-b-[1px] border-Line-200">
          <span className="text-xl">필터</span>
          <span className="text-GrayScale-300 cursor-pointer" onClick={handleFilterReset}>
            초기화
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold">지역을 선택해 주세요</label>
          <div className="z-20">
            <DropdownArea defaultValue="지역" onSelect={handleAreaSelect} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold">어떤 서비스가 필요하세요?</label>
          <div className="z-10">
            <DropdownService onSelect={handleServiceSelect} />
          </div>
        </div>
        {isLoggedIn && (
          <div className="flex flex-col gap-4 w-[640px] max-w-full">
            <h3 className="text-xl font-semibold">찜한 기사님</h3>
            {data &&
              !isLoading &&
              data.list.map((worker, index) => (
                <Link key={index} href={`${ROUTES.WORKER.ROOT}/${worker.id}`}>
                  <WorkerCardInSearch key={index} {...worker} isResponsive={false} />
                </Link>
              ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default FilterArea;
