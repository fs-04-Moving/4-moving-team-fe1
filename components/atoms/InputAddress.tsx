'use client';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (address: string) => void;
}

/**
 * 주소를 표시하는 컴포넌트입니다.
 * 명칭과 형태는 Input이지만 input태그가 아닌 div를 사용합니다.
 * @param param0
 * - label: 필드 라벨 (예: 출발지, 도착지)
 * - placeholder: 주소 미선택 시 표시될 플레이스홀더
 * - value: 현재 선택된 주소 값
 * - onChange: 주소 변경 시 호출되는 콜백 함수
 */
function InputAddress({ label, placeholder, value, onChange }: Props) {
  const handleOpenPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        onChange(data.address); // 주소 선택 시 부모로 전달
      },
    }).open();
  };

  const handleClickModify = () => {
    handleOpenPostcode(); // ❗ 주소 비우지 않고 팝업만 다시 띄움
  };

  console.log('inputAddress value', value);

  return (
    <div className="w-full">
      <p className="text-Black-400 mb-2 lg:mb-4">{label}</p>
      <div
        onClick={handleOpenPostcode}
        className="flex items-center lg:text-xl font-semibold text-Primay-Blue-300 h-[54px] lg:h-16 rounded-2xl border border-Primay-Blue-300 px-5 lg:px-6 py-[14px] lg:py-4 cursor-pointer hover:opacity-70 active:opacity-50 hover:bg-BackGround-200"
      >
        {value || placeholder}
      </div>
      {value && (
        <div
          onClick={handleClickModify}
          className="flex justify-end text-xs lg:text-base text-Black-400 mt-2 underline cursor-pointer hover:opacity-50 active:opacity-30"
        >
          <p>수정하기</p>
        </div>
      )}
    </div>
  );
}

export default InputAddress;
