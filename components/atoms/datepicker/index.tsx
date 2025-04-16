'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { format } from 'date-fns';
import ChevronLeft from '@/assets/images/chevron-left.svg';
import ChevronRight from '@/assets/images/chevron-right.svg';
import Image from 'next/image';
import { ko } from 'date-fns/locale';
import ButtonSolid from '@/components/atoms/ButtonSolid';

const DatePickerWrapper = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <div className="w-[640px] rounded-[32px] bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.2)]">
      <div className="py-6">
        <div className="flex justify-center">
          <DatePicker
            locale={ko}
            selected={selectedDate}
            onChange={setSelectedDate}
            inline
            showPopperArrow={false}
            minDate={new Date()} // ✅ 오늘 이전 날짜 비활성화
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between w-[640px] h-[60px] mb-2">
                <div className="flex items-center justify-between w-[612px] h-[36px] mx-auto">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="w-9 h-9 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <Image src={ChevronLeft} alt="이전" className="w-9 h-9" />
                  </button>
                  <span className="text-[20px] leading-[32px] font-semibold text-[#1F1F1F]">
                    {format(date, 'yyyy. MM')}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="w-9 h-9 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <Image src={ChevronRight} alt="다음" className="w-9 h-9" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-[540px]">
            <ButtonSolid
              disabled={!selectedDate}
              onClick={() => {
                console.log('선택된 날짜:', selectedDate);
              }}
            >
              선택완료
            </ButtonSolid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerWrapper;

