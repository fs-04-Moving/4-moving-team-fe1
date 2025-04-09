'use client';

import React, { useState } from 'react';
import ButtonCheckBoxRequest from '@/components/molecules/ButtonCheckBoxRequest';
import ButtonSolid from '../atoms/ButtonSolid';

interface ChatBubbleMovingChoiceProps {
  onSubmit: (selectedService: 'smallMove' | 'homeMove' | 'officeMove') => void;
}

/**
 * @component ChatBubbleMovingChoice
 * @description 이사 서비스 유형 선택 및 제출 기능을 제공하는 컴포넌트입니다.
 *
 * 이 컴포넌트는 소형, 가정, 사무실 이사 중 하나를 선택하고,
 * 선택 완료 버튼을 눌러 선택한 서비스 유형을 제출할 수 있도록 합니다.
 * 선택된 서비스 유형은 `onSubmit` prop을 통해 부모 컴포넌트로 전달됩니다.
 *
 * @param {Object} props 컴포넌트 props
 * @param {function} props.onSubmit 선택된 서비스 유형을 인자로 받아 처리하는 함수
 *
 * @example
 * // 사용 예시
 * <ChatBubbleMovingChoice onSubmit={(selectedService) => alert(`선택된 서비스: ${selectedService}`)} />
 */

function ChatBubbleMovingChoice({ onSubmit }: ChatBubbleMovingChoiceProps) {
  const [selectedService, setSelectedService] = useState<'smallMove' | 'homeMove' | 'officeMove'>('smallMove');

  const handleServiceChange = (service: 'smallMove' | 'homeMove' | 'officeMove') => {
    setSelectedService(service);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedService);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-5 bg-GrayScale-50 items-center rounded-3xl rounded-tl-none lg:rounded-tl-none lg:rounded-[30px] max-w-[312px] lg:max-w-[640px] p-4 lg:p-10">
      <ButtonCheckBoxRequest
        smallMove="소형이사 (원룸, 투룸, 20평대 미만)"
        homeMove="가정이사 (쓰리룸, 20평대 이상)"
        officeMove="사무실이사(사무실, 상업공간)"
        selectedService={selectedService}
        onChange={handleServiceChange}
      />
      <ButtonSolid
        children={'선택완료'}
        onClick={handleSubmit}
      />
    </div>
  );
}

export default ChatBubbleMovingChoice;