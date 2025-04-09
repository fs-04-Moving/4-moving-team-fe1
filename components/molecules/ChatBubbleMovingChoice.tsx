// ChatBubbleMovingChoice.js
'use client';

import React, { useState } from 'react';
import ButtonCheckBoxRequest from '@/components/molecules/ButtonCheckBoxRequest';
import ButtonSolid from '../atoms/ButtonSolid';

function ChatBubbleMovingChoice() {
  const [selectedService, setSelectedService] = useState('small');

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-5 bg-GrayScale-50 items-center rounded-3xl rounded-tl-none lg:rounded-tl-none lg:rounded-[30px] max-w-[312px] lg:max-w-[640px] p-4 lg:p-10  ">
        
            <ButtonCheckBoxRequest
            smallText="소형이사 (원룸, 투룸, 20평대 미만)"
            familyText="가정이사 (쓰리룸, 20평대 이상)"
            officeText="사무실이사(사무실, 상업공간)"
            selectedService={selectedService}
            onChange={handleServiceChange}
            /> 
    <ButtonSolid 
    children={"선택완료"} 
    />
    </div>
  );
}

export default ChatBubbleMovingChoice;
