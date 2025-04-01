"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputSearchRightIcon from "../molecules/InputSearchRightIcon";
import { mockData } from "@/libs/mockData";
import AddressCard from "../organisms/AddressCard";

export default function AddressModalRoot() {
  const { control, setValue, watch } = useForm<{ address: string }>({
    defaultValues: { address: "" },
  });

  const [filteredSearch, setFilteredSearch] = useState<typeof mockData | null>(
    null
  ); // 검색 전에는 null 상태 유지
  const searchTerm = watch("address"); // 현재 입력값 가져오기

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredSearch([]); // 빈 검색어일 경우 아무것도 출력되지 않도록 설정
      return;
    }

    const result = mockData.filter(
      (address) =>
        address.houseNumber.toString().includes(searchTerm) ||
        address.roadName.includes(searchTerm) ||
        address.streetName.includes(searchTerm)
    );

    setFilteredSearch(result);
  };

  return (
    <div
      id="address-Modal-Root"
      className="m-auto w-[608px] h-auto pl-[2%] pt-[2%] pb-[40px] flex flex-col justify-center gap-y-10"
    >
      <div className="w-[95%]  flex flex-row justify-between items-center">
        {/* Header */}
        <h1 className="text-[24px] font-bold">출발지를 선택해주세요</h1>
        <button className="cursor-pointer"></button>
      </div>

      {/* 주소 검색 Input */}
      <div className="w-[95%]  flex items-center  gap-2">
        <InputSearchRightIcon
          inputClassName="w-full"
          inputBoxClassName="w-full"
          name="address"
          control={control}
          placeholder="텍스트를 입력하세요"
          onClickClear={() => {
            setValue("address", ""); // 입력값 초기화
            setFilteredSearch(null); // 검색 전 상태로 복귀
          }}
          onClickSearch={handleSearch}
        />
      </div>

      <div className="w-[95%] ">
        {/* 주소 선택 Box - 검색 후 필터링된 결과 표시 */}
        {filteredSearch !== null && (
          <>
            {filteredSearch.length > 0 ? (
              filteredSearch.map((address) => (
                <AddressCard key={address.houseNumber} {...address} />
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">
                검색 결과가 없습니다.
              </p>
            )}
          </>
        )}
      </div>

      <button
        type="submit"
        className="cursor-pointer w-[95%] p-[16px] bg-blue-500 text-white font-bold text-[20px] rounded-xl"
      >
        선택완료
      </button>
    </div>
  );
}
