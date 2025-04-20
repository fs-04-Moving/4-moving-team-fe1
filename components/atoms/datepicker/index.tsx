'use client';

import ChevronLeft from '@/assets/images/chevron-left.svg';
import ChevronRight from '@/assets/images/chevron-right.svg';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

interface Props {
  onSubmit: (date: Date) => void;
  selectedDate: Date | null;
}

const DatePickerWrapper = ({ onSubmit, selectedDate }: Props) => {
  const [date, setDate] = React.useState<Date | null>(selectedDate);

  const handleSubmit = () => {
    if (!date) return;
    onSubmit(date);
  };

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-[327px] lg:w-[640px] rounded-[32px] bg-white drop-shadow-Chat">
      <div className="py-[14px] lg:py-6">
        <div className="flex justify-center">
          <DatePicker
            locale={ko}
            selected={date}
            onChange={setDate}
            inline
            showPopperArrow={false}
            minDate={new Date()}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="w-[327px] h-[48px] lg:w-[640px] lg:h-[60px] flex items-center justify-between lg:mb-2 mx-auto">
                <div className="flex items-center justify-between w-full h-[36px] mx-[14px]">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="w-6 h-6 lg:w-9 lg:h-9 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <Image
                      src={ChevronLeft}
                      alt="이전"
                      className="w-6 h-6 lg:w-9 lg:h-9"
                    />
                  </button>
                  <span className="text-[16px] lg:text-[20px] leading-[24px] lg:leading-[32px] font-semibold text-[#1F1F1F]">
                    {format(date, 'yyyy. MM')}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="w-6 h-6 lg:w-9 lg:h-9 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <Image
                      src={ChevronRight}
                      alt="다음"
                      className="w-6 h-6 lg:w-9 lg:h-9"
                    />
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="mt-4 lg:mt-6 flex justify-center">
          <div className="w-[279px] h-[54px] lg:w-[560px] lg:h-[64px]">
            <ButtonSolid disabled={!date} onClick={handleSubmit}>
              선택완료
            </ButtonSolid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerWrapper;
