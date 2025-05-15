'use client';
import ButtonSolid from '../atoms/ButtonSolid';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilter } from '@/contexts/FilterContext';
import Image from 'next/image';
import AllChoiceCheckBox from '../molecules/AllChoiceCheckBox';
import IndividualTypeCheckBox from '../molecules/IndividualTypeCheckBox';
import X from '@/assets/images/ic-X2.svg';

interface Props {
  closeModal: () => void;
  smallMove: number;
  officeMove: number;
  homeMove: number;
  serviceAreaCount: number;
  assignedCount: number;
}

function CheckModalRoot(props: Props) {
  const movingTypes = [
    { id: 1, name: '소형이사', value: 'smallMove', count: props.smallMove },
    { id: 2, name: '가정이사', value: 'homeMove', count: props.homeMove },
    { id: 3, name: '사무실이사', value: 'officeMove', count: props.officeMove },
  ];

  const filterLists = [
    { id: 1, name: '서비스 가능 지역', value: 'area', count: props.serviceAreaCount },
    { id: 2, name: '지정 견적 요청', value: 'assigned', count: props.assignedCount },
  ];

  const [isMovingType, setIsMovingType] = useState(true);

  const items = isMovingType ? movingTypes : filterLists;

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    movingSelected,
    setMovingSelected,
    filterSelected,
    setFilterSelected,
    selectedServiceTypes,
    setSelectedServiceTypes,
    selectedFilters,
    setSelectedFilters,
  } = useFilter();

  // 임시 상태들 — 모달 내에서만 변경, 조회하기 눌렀을 때 실제 Context에 반영
  const [tempMovingSelected, setTempMovingSelected] = useState<Record<number, boolean>>({});
  const [tempFilterSelected, setTempFilterSelected] = useState<Record<number, boolean>>({});
  const [tempSelectedServiceTypes, setTempSelectedServiceTypes] = useState<string[]>([]);
  const [tempSelectedFilters, setTempSelectedFilters] = useState<string[]>([]);

  // Context 상태가 바뀌면 temp 상태 동기화
  useEffect(() => {
    setTempMovingSelected(movingSelected);
    setTempFilterSelected(filterSelected);
    setTempSelectedServiceTypes(selectedServiceTypes);
    setTempSelectedFilters(selectedFilters);
  }, [movingSelected, filterSelected, selectedServiceTypes, selectedFilters]);

  const getMovingTypesTotalCount = () => {
    return movingTypes.reduce((sum, item) => sum + item.count, 0);
  };

  const getFilterListsTotalCount = () => {
    return filterLists.reduce((sum, item) => sum + item.count, 0);
  };

  // 모달 내 체크박스 변경 (임시 상태만 변경)
  const toggleCheckboxMovingTypes = (id: number) => {
    setTempMovingSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selected = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map((key) => movingTypes.find((type) => type.id === Number(key))?.value)
        .filter(Boolean) as string[];
      setTempSelectedServiceTypes(selected);
      return updated;
    });
  };

  const toggleCheckboxFilterLists = (id: number) => {
    setTempFilterSelected((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selected = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map((key) => filterLists.find((type) => type.id === Number(key))?.value)
        .filter(Boolean) as string[];
      setTempSelectedFilters(selected);
      return updated;
    });
  };

  const toggleAllMovingTypes = () => {
    const isAllSelected =
      Object.keys(tempMovingSelected).length === movingTypes.length &&
      Object.values(tempMovingSelected).every(Boolean);

    if (isAllSelected) {
      setTempMovingSelected({});
      setTempSelectedServiceTypes([]);
    } else {
      const newSelection = movingTypes.reduce(
        (acc, type) => {
          acc[type.id] = true;
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setTempMovingSelected(newSelection);
      setTempSelectedServiceTypes(movingTypes.map((type) => type.value));
    }
  };

  const toggleAllFilterLists = () => {
    const isAllSelected =
      Object.keys(tempFilterSelected).length === filterLists.length &&
      Object.values(tempFilterSelected).every(Boolean);

    if (isAllSelected) {
      setTempFilterSelected({});
      setTempSelectedFilters([]);
    } else {
      const newSelection = filterLists.reduce(
        (acc, type) => {
          acc[type.id] = true;
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setTempFilterSelected(newSelection);
      setTempSelectedFilters(filterLists.map((type) => type.value));
    }
  };

  const handleApplyFilters = () => {
    // Context에 임시 상태들 반영
    setMovingSelected(tempMovingSelected);
    setFilterSelected(tempFilterSelected);
    setSelectedServiceTypes(tempSelectedServiceTypes);
    setSelectedFilters(tempSelectedFilters);

    // URLSearchParams 업데이트
    const newParams = new URLSearchParams(searchParams.toString());

    if (tempSelectedServiceTypes.length > 0) {
      newParams.set('serviceType', tempSelectedServiceTypes.join(','));
    } else {
      newParams.delete('serviceType');
    }

    if (tempSelectedFilters.length > 0) {
      newParams.set('filter', tempSelectedFilters.join(','));
    } else {
      newParams.delete('filter');
    }

    router.replace(`?${newParams.toString()}`);

    // 모달 닫기
    props.closeModal();
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-y-5">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row justify-between p-2 items-center gap-x-6">
          <div className="flex flex-row gap-x-4 items-center">
            <button
              className={`text-[18px] border-0 bg-white cursor-pointer ${
                isMovingType ? 'text-[#1F1F1F] font-bold' : 'text-[#ABABAB]'
              }`}
              onClick={() => setIsMovingType(true)}
            >
              이사 유형
            </button>
            <button
              className={`text-[18px] border-0 bg-white cursor-pointer ${
                !isMovingType ? 'text-[#1F1F1F] font-bold' : 'text-[#ABABAB]'
              }`}
              onClick={() => setIsMovingType(false)}
            >
              필터
            </button>
          </div>
          <button type="button" onClick={props.closeModal} className="cursor-pointer">
            <Image src={X} alt="창닫기" width={12} />
          </button>
        </div>
        {items === movingTypes ? (
          <div className="w-full flex flex-col gap-2">
            <AllChoiceCheckBox
              BoxClassName="flex flex-row justify-between gap-[10px]"
              onClickTotalCheck={toggleAllMovingTypes}
              totalQuantity={getMovingTypesTotalCount()}
              isAllSelected={
                Object.keys(tempMovingSelected).length === movingTypes.length &&
                Object.values(tempMovingSelected).every(Boolean)
              }
            />
            <IndividualTypeCheckBox
              items={movingTypes}
              selected={tempMovingSelected}
              toggleCheckbox={toggleCheckboxMovingTypes}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <AllChoiceCheckBox
              BoxClassName="flex flex-row justify-between gap-[10px]"
              onClickTotalCheck={toggleAllFilterLists}
              totalQuantity={getFilterListsTotalCount()}
              isAllSelected={
                Object.keys(tempFilterSelected).length === filterLists.length &&
                Object.values(tempFilterSelected).every(Boolean)
              }
            />
            <IndividualTypeCheckBox
              items={filterLists}
              selected={tempFilterSelected}
              toggleCheckbox={toggleCheckboxFilterLists}
            />
          </div>
        )}
      </div>

      <ButtonSolid onClick={handleApplyFilters}>조회 하기</ButtonSolid>
    </div>
  );
}

export default CheckModalRoot;
