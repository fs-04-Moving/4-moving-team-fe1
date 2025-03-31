import icDocument from '@/assets/images/ic-document.svg';
import Image from 'next/image';
import { EstimateStatus } from '@/types/move.type';

/**
 * ChipEstimateStatus 컴포넌트
 *
 * 이 컴포넌트는 지정견적요청 상태(지정견적요청)에 따라
 * 아이콘, 텍스트, 색상을 표시하는 칩 형태의 UI 요소를 렌더링합니다.
 *
 * @param {EstimateStatus} props.type - 현재 'assigned' 하나의 값만을 받고 렌더링합니다.
 *                                    해당 값에 따라 적절한 텍스트, 색상 설정이 적용됩니다.
 * @returns {JSX.Element} 선택된 상태에 맞는 스타일이 적용된 칩 컴포넌트.
 *
 */
function ChipEstimateStatus({ type }: EstimateStatus) {
  if (type !== 'assigned') {
    return null;
  }

  const config = {
    assigned: {
      icon: icDocument,
      text: '지정 견적 요청',
      color: 'bg-[#FFEEF0] text-[#FF4F64] ',
    },
  };

  const { icon, text, color } = config[type];
  return (
    <span
      className={`inline-flex items-center gap-0.5 align-middle rounded-sm h-[26px] text-[13px] px-1 pr-1 font-semibold w-fit ${color}`}
    >
      <Image src={icon} width={20} alt={'icon'} />
      <span>{text}</span>
    </span>
  );
}

export default ChipEstimateStatus;
