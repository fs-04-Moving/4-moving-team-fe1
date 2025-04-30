import DropdownSort from "@/components/molecules/DropdownSort";
import InputSearchLeftIcon from "@/components/molecules/InputSearchLeftIcon";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  keyword: string;
}

function TopMemuInWorkerPage({ totalCount }: { totalCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      keyword: "",
    },
  });

  const handleOrderBySelect = (order?: string) => {
    const newParams = new URLSearchParams(searchParams);
    switch (order) {
      case "리뷰 많은순":
        newParams.set("orderBy", "mostReview");
        break;
      case "평점 높은순":
        newParams.set("orderBy", "highestRated");
        break;
      case "경력 높은순":
        newParams.set("orderBy", "mostExperience");
        break;
      case "확정 많은순":
        newParams.set("orderBy", "mostConfirmed");
        break;
      default:
        return;
    }
    router.push(`?${newParams.toString()}`);
  };

  const onSubmit = (data: FormValues) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", data.keyword);
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
        <span className="text-[16px] font-medium">{`전체 ${totalCount}건`}</span>
        <span className="z-10">
          <DropdownSort
            onChange={handleOrderBySelect}
            options={[
              "리뷰 많은순",
              "평점 높은순",
              "경력 높은순",
              "확정 많은순",
            ]}
          />
        </span>
      </div>
    </div>
  );
}

export default TopMemuInWorkerPage;
