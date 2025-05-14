import ButtonReacitveFilter from '@/components/atoms/ButtonReacitveFilter';
import DropdownSort from '@/components/molecules/DropdownSort';
import InputSearchLeftIcon from '@/components/molecules/InputSearchLeftIcon';
import { DEFAULT_SORT_OPTION_IN_WORKER_PAGE } from '@/constants/dropdownSortConstants';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  keyword: string;
}

function TopMemuInWorkerPage({ totalCount }: { totalCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      keyword: '',
    },
  });

  const defaultSortOption =
    searchParams.get('orderBy') === 'earliestMove'
      ? '이사 빠른순'
      : searchParams.get('orderBy') === 'earliestRequest'
        ? '요청일 빠른순'
        : DEFAULT_SORT_OPTION_IN_WORKER_PAGE;

  const handleOrderBySelect = (order?: string) => {
    const newParams = new URLSearchParams(searchParams);
    switch (order) {
      case '이사 빠른순':
        newParams.set('orderBy', 'earliestMove');
        break;
      case '요청일 빠른순':
        newParams.set('orderBy', 'earliestRequest');
        break;
      default:
        return;
    }
    router.push(`?${newParams.toString()}`);
  };

  const onSubmit = (data: FormValues) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', data.keyword);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-end gap-6 mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputSearchLeftIcon
          name="keyword"
          control={control}
          bgColor={true}
          placeholder="어떤 고객님을 찾고 계세요?"
        />
      </form>
      <div className="w-full flex justify-between items-center ">
        <span className="text-[16px] font-medium">{`전체 ${totalCount || 0}건`}</span>
        <span className="z-10 flex gap-1 items-center">
          <DropdownSort
            onChange={handleOrderBySelect}
            options={['이사 빠른순', '요청일 빠른순']}
            defaultValue={defaultSortOption}
          />
          <ButtonReacitveFilter onClick={() => {}} />
        </span>
      </div>
    </div>
  );
}

export default TopMemuInWorkerPage;
