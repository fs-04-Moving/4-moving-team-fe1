'use client';

import React from 'react';
import ButtonCheckBoxOutlined from '@/components/atoms/ButtonCheckBoxOutlined';
import Image from 'next/image';
import CheckBoxActive from '@/assets/images/ic-check-box-active-round.svg';
import CheckBoxDefault from '@/assets/images/ic-check-box-default-round.svg';

interface ButtonCheckBoxRequestProps {
  smallText: string;
  familyText: string;
  officeText: string;
  selectedService: 'small' | 'family' | 'office';
  onChange: (service: 'small' | 'family' | 'office') => void;
}

function ButtonCheckBoxRequest({
  smallText,
  familyText,
  officeText,
  selectedService,
  onChange,
}: ButtonCheckBoxRequestProps) {
  const handleServiceChange = (service: 'small' | 'family' | 'office') => {
    onChange(service);
  };

  return (
    <div className="w-full flex flex-col gap-2 ">
      
        <ButtonCheckBoxOutlined
          intent={selectedService === 'small' ? 'active' : 'done'}
          onClick={() => handleServiceChange('small')}
        >
          <div className="flex items-center lg:gap-4 p-[14px]">
            <Image
              src={selectedService === 'small' ? CheckBoxActive : CheckBoxDefault}
              alt={selectedService === 'small' ? '체크됨' : '체크 안됨'}
              width={24}
              height={24}
            />
            <span className="ml-1 lg:ml-2 text-Black-400 text-[14px] lg:text-[18px]">
              {smallText}
            </span>
          </div>
        </ButtonCheckBoxOutlined>
      
      
        <ButtonCheckBoxOutlined
          intent={selectedService === 'family' ? 'active' : 'done'}
          onClick={() => handleServiceChange('family')}
        >
          <div className="w-full flex items-center lg:gap-4 p-[14px]">
            <Image
              src={selectedService === 'family' ? CheckBoxActive : CheckBoxDefault}
              alt={selectedService === 'family' ? '체크됨' : '체크 안됨'}
              width={24}
              height={24}
            />
            <span className="ml-0.5 lg:ml-1 text-Black-400 text-[14px] lg:text-[18px]">
              {familyText}
            </span>
          </div>
        </ButtonCheckBoxOutlined>
      
      
        <ButtonCheckBoxOutlined
          intent={selectedService === 'office' ? 'active' : 'done'}
          onClick={() => handleServiceChange('office')}
        >
          <div className="w-full flex items-center lg:gap-4 p-[14px]">
            <Image
              src={selectedService === 'office' ? CheckBoxActive : CheckBoxDefault}
              alt={selectedService === 'office' ? '체크됨' : '체크 안됨'}
              width={24}
              height={24}
            />
            <span className="ml-0.5 lg:ml-1 text-Black-400 text-[14px] lg:text-[18px]">
              {officeText}
            </span>
          </div>
        </ButtonCheckBoxOutlined>
      
    </div>
  );
}

export default ButtonCheckBoxRequest;