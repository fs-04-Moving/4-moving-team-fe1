"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputSearchRightIcon from "../molecules/InputSearchRightIcon";
import { mockData } from "@/libs/mockData";
import AddressCard from "../organisms/AddressCard";

interface AddressModalProps {
  closeModal: () => void;
}

export default function AddressModalRoot({ closeModal }: AddressModalProps) {
  const { control, setValue, watch } = useForm<{ address: string }>({
    defaultValues: { address: "" },
  });

  const [filteredSearch, setFilteredSearch] = useState<typeof mockData | null>(
    null
  );
  const searchTerm = watch("address");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredSearch([]);
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

  const handleConfirm = () => {
    // 추가적인 선택 로직 처리 가능
    console.log("주소 선택 완료!");
    closeModal(); // 모달 닫기
  };

  return (
    <div
      id="address-Modal-Root"
      className="m-auto w-[608px] h-auto pl-[2%] pt-[2%] pb-[40px] flex flex-col justify-center gap-y-10"
    >
      <div className="w-[95%]  flex flex-row justify-between items-center">
        <h1 className="text-[24px] font-bold">출발지를 선택해주세요</h1>
        <button className="cursor-pointer"></button>
      </div>

      <div className="w-[95%] flex items-center gap-2">
        <InputSearchRightIcon
          inputClassName="w-full"
          inputBoxClassName="w-full"
          name="address"
          control={control}
          placeholder="텍스트를 입력하세요"
          onClickClear={() => {
            setValue("address", "");
            setFilteredSearch(null);
          }}
          onClickSearch={handleSearch}
        />
      </div>

      <div className="w-[95%]">
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
        onClick={handleConfirm}
      >
        선택완료
      </button>
    </div>
  );
}
