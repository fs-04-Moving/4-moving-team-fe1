import icBox from '@/assets/images/ic-box.svg';
import icHome from '@/assets/images/ic-home.svg';
import icCompany from '@/assets/images/ic-company.svg';
import Image from 'next/image';
import { MovingType } from '@/types/move.type';

interface Props {
  type: MovingType;
  isShort?: boolean;
}
/**
 * ChipMovingType 컴포넌트
 *
 * 이 컴포넌트는 이사 서비스의 종류(소형이사, 가정이사, 사무실이사)에 따라
 * 아이콘, 텍스트, 색상을 표시하는 칩 형태의 UI 요소를 렌더링합니다.
 *
 * @param {MovingType} type - 'smallMove', 'homeMove', 'officeMove' 중 하나의 이사 타입 값.
 *                                    해당 값에 따라 적절한 아이콘, 텍스트, 색상 설정이 적용됩니다.
 * @param {boolean} isShort - ture 이면 짧은 텍스트로 보여집니다. 예) '소형이사' -> '소형'
 *
 * @returns {JSX.Element} 선택된 이사 타입에 맞는 스타일이 적용된 칩 컴포넌트.
 */
function ChipMovingType({ type, isShort }: Props) {
  const config = {
    smallMove: {
      icon: icBox,
      text: '소형이사',
      shortenText: '소형',
    },
    homeMove: {
      icon: icHome,
      text: '가정이사',
      shortenText: '가정',
    },
    officeMove: {
      icon: icCompany,
      text: '사무실이사',
      shortenText: '사무실',
    },
  };

  const { icon, text, shortenText } = config[type];
  return (
    <span
      className={`inline-flex items-center align-middle gap-0.5 rounded-sm h-[26px] lg:gap-1 lg:h-[34px] px-1 pr-1 font-semibold w-fit bg-Primay-Blue-100 text-Primay-Blue-300 `}
    >
      <Image src={icon} width={20} alt={'box'} className="lg:w-[24px]" />
      <span className="leading-none relative top-[1px] text-[13px] lg:text-[16px]">
        {isShort ? shortenText : text}
      </span>
    </span>
  );
}

export default ChipMovingType;
