'use client';

import { useState } from 'react';

interface Props {
  label: string;
  placeholder: string;
}

/**
 * 주소를 표시하는 컴포넌트입니다.
 * 명칭과 형태는 Input이지만 input태그가 아닌 div를 사용합니다.
 * @param param0
 * - label:
 * @returns
 */
function InputAddress({ label, placeholder }: Props) {
  const [address, setAddress] = useState('');

  const handleSetAddress = () => {
    setAddress('서울 중구 삼일대로 343');
  };

  const handleClickModify = () => {
    setAddress('');
  };
  return (
    <div className="w-full">
      <p className="text-Black-400 mb-2 lg:mb-4">{label}</p>
      <div
        onClick={handleSetAddress}
        className="flex items-center lg:text-xl font-semibold text-Primay-Blue-300 h-[54px] lg:h-16 rounded-2xl border border-Primay-Blue-300 px-5 lg:px-6 py-[14px] lg:py-4 cursor-pointer"
      >
        {address ? address : placeholder}
      </div>
      {address && (
        <div
          onClick={handleClickModify}
          className="flex justify-end text-Black-400 mt-2 underline cursor-pointer"
        >
          <p className="">수정하기</p>
        </div>
      )}
    </div>
  );
}

export default InputAddress;
