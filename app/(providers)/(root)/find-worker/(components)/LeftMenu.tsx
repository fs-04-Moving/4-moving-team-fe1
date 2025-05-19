import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFavoriteWorkersQuery } from '@/hooks/useFavoriteWorkersQuery';
import WorkerCardInSearch from '@/components/organisms/WorkerCardInSearch';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { AREA_DATA, AreaType, SERVICE_TYPE_DATA, ServiceType } from '@/types/move.type';

function FilterArea() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const [serviceAreaParam, setServiceAreaParam] = useState(searchParams.get('serviceArea'));
  const [serviceTypeParam, setServiceTypeParam] = useState(searchParams.get('serviceType'));

  const { data, isLoading } = useFavoriteWorkersQuery({ pageSize: 3 });

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
    setServiceAreaParam(null);
    setServiceTypeParam(null);
  };

  useEffect(() => {
    setServiceAreaParam(searchParams.get('serviceArea'));
    setServiceTypeParam(searchParams.get('serviceType'));
    console.log(serviceAreaParam, serviceTypeParam);
  }, [searchParams]);

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
            <DropdownArea
              defaultValue={
                serviceAreaParam ? AREA_DATA[serviceAreaParam as keyof AreaType] : '지역'
              }
              onSelect={handleAreaSelect}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold">어떤 서비스가 필요하세요?</label>
          <div className="z-10">
            <DropdownService
              defaultValue={
                serviceTypeParam ? SERVICE_TYPE_DATA[serviceTypeParam as ServiceType] : '서비스'
              }
              onSelect={handleServiceSelect}
            />
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
            <div className="mx-auto w-[50px] text-center h-2">
              <Link href={'/customer/favorites'}>
                <span className="cursor-pointer underline hover:text-[#1b92ff]">더보기</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default FilterArea;
