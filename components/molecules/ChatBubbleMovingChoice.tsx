'use client';

import ButtonCheckBoxRequest from '@/components/molecules/ButtonCheckBoxRequest';
import { serviceTypeDetailObject } from '@/types/entities/estimate.entity';
import { ServiceType } from '@/types/move.type';
import { useEffect, useState } from 'react';
import ButtonSolid from '../atoms/ButtonSolid';

interface ChatBubbleMovingChoiceProps {
  onSubmit: (service: ServiceType) => void;
  selectedService: ServiceType | undefined;
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

function ChatBubbleMovingChoice({
  onSubmit,
  selectedService,
}: ChatBubbleMovingChoiceProps) {
  const [service, setService] = useState<ServiceType | undefined>(
    selectedService
  );

  const handleServiceChange = (service: ServiceType) => {
    setService(service);
  };

  const handleSubmit = () => {
    if (onSubmit && service) {
      onSubmit(service);
    }
  };

  // 수정하기 시 기존 선택값이 선택된 상태 표시
  useEffect(() => {
    setService(selectedService);
  }, [selectedService]);

  return (
    <div className="drop-shadow-Chat flex flex-col gap-4 lg:gap-5 bg-GrayScale-50 items-center rounded-3xl rounded-tr-none lg:rounded-tr-none lg:rounded-[30px] w-[327px] lg:w-[640px] p-4 lg:p-10">
      <ButtonCheckBoxRequest
        smallMove={serviceTypeDetailObject.smallMove}
        homeMove={serviceTypeDetailObject.homeMove}
        officeMove={serviceTypeDetailObject.officeMove}
        selectedService={service}
        onChange={handleServiceChange}
      />
      <ButtonSolid onClick={handleSubmit} disabled={!service}>
        선택완료
      </ButtonSolid>
    </div>
  );
}

export default ChatBubbleMovingChoice;
