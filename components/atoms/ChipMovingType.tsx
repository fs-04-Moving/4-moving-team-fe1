import icBox from '@/assets/images/ic-box.svg';
import icCompany from '@/assets/images/ic-company.svg';
import icHome from '@/assets/images/ic-home.svg';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  type: string;
  isShort?: boolean;
  isResponsive?: boolean;
}
/**
 * ChipMovingType 컴포넌트
 *
 * 이 컴포넌트는 이사 서비스의 종류(예: 'smallMove', 'homeMove', 'officeMove')에 따라
 * 아이콘, 텍스트, 색상을 표시하는 칩 형태의 UI 요소를 렌더링합니다.
 * 만약 전달된 type 값에 해당하는 설정이 없으면 컴포넌트는 아무것도 렌더링하지 않습니다.
 *
 * @param {string} props.type - 이사 서비스 타입 문자열 (예: 'smallMove', 'homeMove', 'officeMove')
 * @param {boolean} [isShort] - true이면 짧은 텍스트(예: '소형')를, false이면 전체 텍스트(예: '소형이사')를 표시합니다.
 * @param {boolean} isResponsive - 기본값:true, false면 반응형을 적용하지 않고, 크기를 sm으로 고정
 *
 * @returns {JSX.Element | null} 선택된 이사 타입에 맞는 스타일의 칩 컴포넌트. 타입에 해당하는 설정이 없으면 null을 반환합니다.
 */
function ChipMovingType({ type, isShort, isResponsive = true }: Props) {
  const config: Record<string, { icon: string; text: string; shortenText: string }> = {
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

  // type에 해당하는 값이 없으면 null 반환 (안전하게 처리)
  if (!config[type]) return null;

  const { icon, text, shortenText } = config[type];
  return (
    <span
      className={clsx(
        `inline-flex items-center align-middle gap-0.5 rounded-sm h-[26px] px-1 pr-1 font-semibold w-fit bg-Primay-Blue-100 text-Primay-Blue-300`,
        isResponsive ? 'lg:gap-1 lg:h-[34px]' : '',
      )}
    >
      <Image
        src={icon}
        width={20}
        alt={'box'}
        className={clsx(isResponsive ? 'lg:w-[24px]' : '')}
      />
      <span
        className={clsx(
          'leading-none relative top-[1px] text-[13px]',
          isResponsive ? 'lg:text-[16px]' : '',
        )}
      >
        <span className="lg:hidden">{isShort ? shortenText : text}</span>
        <span className="hidden lg:inline-block">{text}</span>
      </span>
    </span>
  );
}

export default ChipMovingType;
