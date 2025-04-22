type Props = {
  type: string;
};

/**
 * ChipEstimateRequestStatus 컴포넌트
 *
 * 이 컴포넌트는 견적요청의 상태(견적 대기, 견적 확정)에 따라
 * 텍스트, 색상을 표시하는 칩 형태의 UI 요소를 렌더링합니다.
 *
 * @param {EstimateRequestStatus} props.type - 'active', 'inactive', 'confirmed' 중 하나의 견적 상태 값.
 *                                    해당 값에 따라 적절한 텍스트, 색상 설정이 적용됩니다.
 * @returns {JSX.Element} 선택된 견적 상태에 맞는 스타일이 적용된 칩 컴포넌트.
 *
 */
function ChipEstimateRequestStatus({ type }: Props) {
  if (type === 'inactive') return null;

  return (
    <span
      className={`inline-flex items-center align-middle gap-0.5 rounded-sm text-[13px] lg:text-[16px] px-1.5 py-0.5 lg:py-1 font-semibold w-fit bg-[#F2F3F8] text-[#242945] `}
    >
      <span className="leading-none relative top-[1px]">
        {type === 'confirmed' ? '견적 확정' : '견적 대기'}
      </span>
    </span>
  );
}

export default ChipEstimateRequestStatus;
