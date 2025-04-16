'use client';

import CheckBoxActive from '@/assets/images/ic-check-box-active-round.svg';
import CheckBoxDefault from '@/assets/images/ic-check-box-default-round.svg';
import ButtonCheckBoxOutlined from '@/components/atoms/ButtonCheckBoxOutlined';
import Image from 'next/image';

interface ButtonCheckBoxRequestProps {
  smallMove: string;
  homeMove: string;
  officeMove: string;
  selectedService: 'smallMove' | 'homeMove' | 'officeMove';
  onChange: (service: 'smallMove' | 'homeMove' | 'officeMove') => void;
}

/**
 * 선택 가능한 서비스 유형을 체크박스 버튼 형태로 보여주는 컴포넌트입니다.
 *
 * @description
 * 사용자가 이사 서비스를 선택할 수 있도록 '소형 이사', '가정 이사', '사무실 이사' 옵션을 제공합니다.
 * 각 옵션은 체크박스 형태의 버튼으로 표시되며, 선택된 서비스에 따라 활성화된 상태를 보여줍니다.
 *
 * @param {string} props.smallMove - 소형 이사 서비스의 텍스트 레이블
 * @param {string} props.homeMove - 가정 이사 서비스의 텍스트 레이블
 * @param {string} props.officeMove - 사무실 이사 서비스의 텍스트 레이블
 * @param {'small' | 'family' | 'office'} props.selectedService - 현재 선택된 서비스 유형 (small, family, office 중 하나)
 * @param {(service: 'small' | 'family' | 'office') => void} props.onChange - 서비스 선택 변경 시 호출되는 콜백 함수
 *
 * @example
 * // 사용 예시
 * <ButtonCheckBoxRequest
 * smallMove="소형 이사"
 * homeMove="가정 이사"
 * officeMove="사무실 이사"
 * selectedService="home"
 * onChange={(service) => console.log(`선택된 서비스: ${service}`)}
 * />
 */

function ButtonCheckBoxRequest({
  smallMove: smallMove,
  homeMove: homeMove,
  officeMove: officeMove,
  selectedService,
  onChange,
}: ButtonCheckBoxRequestProps) {
  const handleServiceChange = (
    service: 'smallMove' | 'homeMove' | 'officeMove'
  ) => {
    onChange(service);
  };

  return (
    <div className="w-full flex flex-col gap-2 ">
      <ButtonCheckBoxOutlined
        intent={selectedService === 'smallMove' ? 'active' : 'done'}
        onClick={() => handleServiceChange('smallMove')}
      >
        <div className="flex items-center lg:gap-4 p-[14px]">
          <Image
            className="h-6 w-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            src={
              selectedService === 'smallMove' ? CheckBoxActive : CheckBoxDefault
            }
            alt={selectedService === 'smallMove' ? '체크됨' : '체크 안됨'}
          />
          <span className="ml-1 lg:ml-2 text-Black-400 text-[14px] lg:text-[18px]">
            {smallMove}
          </span>
        </div>
      </ButtonCheckBoxOutlined>

      <ButtonCheckBoxOutlined
        intent={selectedService === 'homeMove' ? 'active' : 'done'}
        onClick={() => handleServiceChange('homeMove')}
      >
        <div className="w-full flex items-center lg:gap-4 p-[14px]">
          <Image
            className="h-6 w-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            src={
              selectedService === 'homeMove' ? CheckBoxActive : CheckBoxDefault
            }
            alt={selectedService === 'homeMove' ? '체크됨' : '체크 안됨'}
          />
          <span className="ml-0.5 lg:ml-1 text-Black-400 text-[14px] lg:text-[18px]">
            {homeMove}
          </span>
        </div>
      </ButtonCheckBoxOutlined>

      <ButtonCheckBoxOutlined
        intent={selectedService === 'officeMove' ? 'active' : 'done'}
        onClick={() => handleServiceChange('officeMove')}
      >
        <div className="w-full flex items-center lg:gap-4 p-[14px]">
          <Image
            className="h-6 w-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            src={
              selectedService === 'officeMove'
                ? CheckBoxActive
                : CheckBoxDefault
            }
            alt={selectedService === 'officeMove' ? '체크됨' : '체크 안됨'}
          />
          <span className="ml-0.5 lg:ml-1 text-Black-400 text-[14px] lg:text-[18px]">
            {officeMove}
          </span>
        </div>
      </ButtonCheckBoxOutlined>
    </div>
  );
}

export default ButtonCheckBoxRequest;
