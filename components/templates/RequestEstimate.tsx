'use client';

import estimateRequestApi from '@/api/estimate-request/estimateRequest.api';
import { CreateEstimateRequestDto } from '@/types/dtos/estimateRequest.dto';
import { serviceTypeDetailObject } from '@/types/entities/estimate.entity';
import { ServiceType } from '@/types/move.type';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import ChatBubbleTextLeft from '../atoms/ChatBubbleTextLeft';
import ChatBubbleTextRight from '../atoms/ChatBubbleTextRight';
import DatePickerWrapper from '../atoms/datepicker';
import ChatBubbleAddress from '../molecules/ChatBubbleAddress';
import ChatBubbleMovingChoice from '../molecules/ChatBubbleMovingChoice';
import ProgressBar from '../molecules/ProgressBar';

function RequestEstimate() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType | undefined>();
  const [date, setDate] = useState<Date | null>(null);
  const [isEditingService, setIsEditingService] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const { mutate: createEstimateRequest } = useMutation({
    mutationFn: (data: CreateEstimateRequestDto) =>
      estimateRequestApi.createEstimateRequest(data),
  });

  const handleSubmit = () => {
    if (!service || !date || !departure || !destination) return;

    const requestData: CreateEstimateRequestDto = {
      serviceType: service,
      movingDate: date,
      departureArea: 'busan',
      departureAddress: departure,
      destination,
    };

    createEstimateRequest(requestData);
  };

  const handleSelectDoneService = (service: ServiceType) => {
    setService(service);
    setIsEditingService(false);
    if (step < 2) setStep(2);
  };

  const handleSelectDoneDate = (date: Date) => {
    setDate(date);
    setIsEditingDate(false);
    if (step < 3) setStep(3);
  };

  const handleClickEditService = () => {
    setIsEditingService(true);
  };

  const handleClickEditDate = () => {
    setIsEditingDate(true);
  };

  useEffect(() => {
    if (departure && destination && step < 4) {
      setStep(4);
    }
  }, [departure, destination, step]);

  const renderServiceChoice = () => (
    <div className="flex justify-end">
      {!service || isEditingService ? (
        <ChatBubbleMovingChoice
          selectedService={service}
          onSubmit={handleSelectDoneService}
        />
      ) : (
        <div className="flex flex-col items-end">
          <ChatBubbleTextRight>
            {serviceTypeDetailObject[service]}
          </ChatBubbleTextRight>
          <button
            onClick={handleClickEditService}
            className="underline text-xs lg:text-base text-GrayScale-500 mt-1.5 cursor-pointer hover:opacity-70"
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );

  const renderDateChoice = () => (
    <div>
      <div className="mb-2 lg:mb-6">
        <ChatBubbleTextLeft>이사 예정일을 선택해 주세요.</ChatBubbleTextLeft>
      </div>
      {!date || isEditingDate ? (
        <div className="flex justify-end">
          <DatePickerWrapper
            selectedDate={date}
            onSubmit={handleSelectDoneDate}
          />
        </div>
      ) : (
        <div className="flex flex-col items-end">
          <ChatBubbleTextRight>
            {format(date, 'yyyy년 M월 d일', { locale: ko })}
          </ChatBubbleTextRight>
          <button
            onClick={handleClickEditDate}
            className="underline text-xs lg:text-base text-GrayScale-500 mt-1.5 cursor-pointer hover:opacity-70"
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );

  const renderAddressChoice = () => (
    <div>
      <div className="mb-2 lg:mb-6">
        <ChatBubbleTextLeft>이사 지역을 선택해 주세요.</ChatBubbleTextLeft>
      </div>
      <div className="flex justify-end">
        <ChatBubbleAddress
          departure={departure}
          destination={destination}
          onChangeDeparture={setDeparture}
          onChangeDestination={setDestination}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-BackGround-200 min-h-full pb-40 ">
      {/* 상단 고정 영역 (ProgressBar) */}
      <div className="sticky top-[54px] lg:top-[88px] z-20 bg-GrayScale-50">
        <div className="flex justify-center items-center w-full">
          <div className="w-[327px] lg:w-[1400px]">
            <ProgressBar totalSteps={4} currentStep={step} />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[327px] lg:w-[1400px] flex flex-col flex-wrap gap-y-2 lg:gap-y-6 mt-6 lg:mt-10">
          <ChatBubbleTextLeft>
            {'몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)'}
          </ChatBubbleTextLeft>
          <ChatBubbleTextLeft>
            {'이사 종류를 선택해 주세요.'}
          </ChatBubbleTextLeft>
          {renderServiceChoice()}
          {step > 1 && renderDateChoice()}
          {step > 2 && renderAddressChoice()}
        </div>
      </div>
    </div>
  );
}

export default RequestEstimate;
