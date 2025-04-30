"use client";

import { useEffect, useState } from "react";
import AllChoiceCheckBoxInWorkerPage from "./AllChoiceCheckBoxInWorkerPage";
import TypeCheckBox from "./IndividualTypeCheckBoxInWorkerPage";
import { useRouter, useSearchParams } from "next/navigation";

const movingTypes = [
  { id: 1, name: "소형이사", value: "smallMove", count: 4 },
  { id: 2, name: "가정이사", value: "homeMove", count: 2 },
  { id: 3, name: "사무실이사", value: "officeMove", count: 10 },
];

const filterLists = [
  { id: 1, name: "서비스 가능 지역", value: "area", count: 6 },
  { id: 2, name: "지정 견적 요청", value: "assigned", count: 10 },
];

function LeftMenuInWorkerPage() {
  const [movingSelected, setMovingSelected] = useState<Record<number, boolean>>(
    {}
  );
  const [filterSelected, setFilterSelected] = useState<Record<number, boolean>>(
    {}
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("serviceTypes");
    newParams.delete("filter");
    router.replace(`?${newParams.toString()}`);
    setMovingSelected({});
    setFilterSelected({});
  }, []);

  const toggleCheckboxMovingTypes = (id: number) => {
    setMovingSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };

      const selectedTypes = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map(
          (key) => movingTypes.find((type) => type.id === Number(key))?.value
        );

      const newParams = new URLSearchParams(searchParams);
      if (selectedTypes.length > 0) {
        newParams.set("serviceTypes", selectedTypes.join(","));
      } else {
        newParams.delete("serviceTypes");
      }

      router.push(`?${newParams.toString()}`);

      return updated;
    });
  };

  const toggleCheckboxFilterLists = (id: number) => {
    setFilterSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };

      const selectedTypes = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map(
          (key) => filterLists.find((type) => type.id === Number(key))?.value
        );

      const newParams = new URLSearchParams(searchParams);
      if (selectedTypes.length > 0) {
        newParams.set("filter", selectedTypes.join(","));
      } else {
        newParams.delete("filter");
      }

      router.push(`?${newParams.toString()}`);

      return updated;
    });
  };

  // 전체 선택/해제 기능
  const toggleAllMovingTypes = () => {
    const isAllSelected =
      Object.keys(movingSelected).length === movingTypes.length &&
      Object.values(movingSelected).every(Boolean);

    if (isAllSelected) {
      setMovingSelected(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("serviceTypes");
        router.push(`?${newParams.toString()}`);
        return {};
      });
    } else {
      const newSelection = movingTypes.reduce((acc, movingType) => {
        acc[movingType.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setMovingSelected(() => {
        const selectedTypes = Object.keys(newSelection).map(
          (key) => movingTypes.find((type) => type.id === Number(key))?.value
        );

        const newParams = new URLSearchParams(searchParams);
        newParams.set("serviceTypes", selectedTypes.join(","));
        router.push(`?${newParams.toString()}`);
        return newSelection;
      });
    }
  };

  const toggleAllFilterLists = () => {
    const isAllSelected =
      Object.keys(filterSelected).length === filterLists.length &&
      Object.values(filterSelected).every(Boolean);

    if (isAllSelected) {
      setFilterSelected(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("filter");
        router.push(`?${newParams.toString()}`);
        return {};
      });
    } else {
      const newSelection = filterLists.reduce((acc, filterList) => {
        acc[filterList.id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setFilterSelected(() => {
        const selectedTypes = Object.keys(newSelection).map(
          (key) => filterLists.find((type) => type.id === Number(key))?.value
        );

        const newParams = new URLSearchParams(searchParams);
        newParams.set("filter", selectedTypes.join(","));
        router.push(`?${newParams.toString()}`);
        return newSelection;
      });
    }
  };

  return (
    // hidden 추가하기
    <aside className="hidden w-full max-w-[328px] lg:w-[32%] lg:block  gap-[52px]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center py-4 px-[10px] border-b-[1px] border-[#F2F2F2]">
          <button className="text-[20px] font-[500]">이사 유형</button>

          <AllChoiceCheckBoxInWorkerPage
            BoxClassName="flex flex-row gap-4"
            onClickTotalCheck={toggleAllMovingTypes}
            isAllSelected={
              Object.keys(movingSelected).length === movingTypes.length &&
              Object.values(movingSelected).every(Boolean)
            }
          />
        </div>
        <div>
          <TypeCheckBox
            items={movingTypes}
            selected={movingSelected}
            toggleCheckbox={toggleCheckboxMovingTypes}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* 개별 체크박스 (컴포넌트화) */}

        <div className="flex justify-between items-center py-4 px-[10px] border-b-[1px] border-[#F2F2F2] ">
          <button className="text-[20px] font-[500]">필터</button>
          <AllChoiceCheckBoxInWorkerPage
            BoxClassName="flex flex-row gap-4"
            onClickTotalCheck={toggleAllFilterLists}
            isAllSelected={
              Object.keys(filterSelected).length === filterLists.length &&
              Object.values(filterSelected).every(Boolean)
            }
          />
        </div>

        <TypeCheckBox
          items={filterLists}
          selected={filterSelected}
          toggleCheckbox={toggleCheckboxFilterLists}
        />
      </div>
    </aside>
  );
}

export default LeftMenuInWorkerPage;
