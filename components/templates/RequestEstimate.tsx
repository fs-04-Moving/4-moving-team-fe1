'use client';

import { serviceTypeDetailObject } from '@/types/entities/estimate.entity';
import { ServiceType } from '@/types/move.type';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
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
  const handleSelectDoneService = (service: ServiceType) => {
    setService(service);
    setIsEditingService(false);
    if (step > 1) return;
    setStep(2);
  };
  const handleSelectDoneDate = (date: Date) => {
    setDate(date);
    setIsEditingDate(false);
    if (step > 2) return;
    setStep(3);
  };
  const handleClickEditService = () => {
    setIsEditingService(true);
  };
  const handleClickEditDate = () => {
    setIsEditingDate(true);
  };

  // const isActiveButton =
  //   service &&
  //   date &&
  //   !!departure &&
  //   !!destination &&
  //   !isEditingDate &&
  //   !isEditingService;
  console.log(
    setDeparture,
    setDestination,
    step,
    service,
    isEditingService,
    date,
    isEditingDate,
    departure,
    destination
  );
  return (
    <div className="bg-BackGround-200 min-h-full pb-40 ">
      <div className="flex justify-center items-center w-full bg-GrayScale-50">
        <div className="w-[327px] lg:w-[1400px]">
          <ProgressBar totalSteps={4} currentStep={step} />
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
          {/* 이사 유형 선택 */}
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
                  className="underline text-xs lg:text-base text-GrayScale-500 mt-1.5"
                >
                  수정하기
                </button>
              </div>
            )}
          </div>
          {/* 이사 날짜 선택 */}
          {step > 1 ? (
            <div>
              <div className="mb-2 lg:mb-6">
                <ChatBubbleTextLeft>
                  이사 예정일을 선택해 주세요.
                </ChatBubbleTextLeft>
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
                    className="underline text-xs lg:text-base text-GrayScale-500 mt-1.5"
                  >
                    수정하기
                  </button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {/* 이사 지역 선택 */}
          {step > 2 ? (
            <div>
              <div className="mb-2 lg:mb-6">
                <ChatBubbleTextLeft>
                  이사 지역을 선택해 주세요.
                </ChatBubbleTextLeft>
              </div>
              <div className="flex justify-end">
                <ChatBubbleAddress />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestEstimate;
