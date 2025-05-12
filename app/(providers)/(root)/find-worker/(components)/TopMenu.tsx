import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import DropdownSort from '@/components/molecules/DropdownSort';
import InputSearchLeftIcon from '@/components/molecules/InputSearchLeftIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  keyword: string;
}

function TopMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      keyword: '',
    },
  });

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

  const handleOrderBySelect = (order?: string) => {
    const newParams = new URLSearchParams(searchParams);
    switch (order) {
      case '리뷰 많은순':
        newParams.set('orderBy', 'mostReview');
        break;
      case '평점 높은순':
        newParams.set('orderBy', 'highestRated');
        break;
      case '경력 높은순':
        newParams.set('orderBy', 'mostExperience');
        break;
      case '확정 많은순':
        newParams.set('orderBy', 'mostConfirmed');
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
      <div className="w-full flex justify-between lg:justify-end">
        <div className="flex gap-3 w-[300px] pt-4 lg:hidden">
          <span className="w-[90px] z-10">
            <DropdownArea onSelect={handleAreaSelect} />
          </span>
          <span className="w-[90px] z-30">
            <DropdownService onSelect={handleServiceSelect} />
          </span>
        </div>
        <span className="z-10 pt-4 lg:pt-0">
          <DropdownSort
            onChange={handleOrderBySelect}
            options={['리뷰 많은순', '평점 높은순', '경력 높은순', '확정 많은순']}
          />
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputSearchLeftIcon
          name="keyword"
          control={control}
          bgColor={true}
          placeholder="텍스트를 입력해 주세요."
        />
      </form>
    </div>
  );
}

export default TopMenu;
