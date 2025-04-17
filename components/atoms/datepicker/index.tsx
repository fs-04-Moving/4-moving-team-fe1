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

  // 수정하기 시 기존 선택값을 선택 상태로 표시
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-[327px] md:w-[640px] rounded-[32px] bg-white drop-shadow-Chat">
      <div className="py-6">
        <div className="flex justify-center">
          <DatePicker
            locale={ko}
            selected={date}
            onChange={setDate}
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
              <div className="w-[327px] h-[48px] md:w-[640px] md:h-[60px] flex items-center justify-between mb-2 mx-auto">
                <div className="flex items-center justify-between w-full h-[36px]">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <Image
                      src={ChevronLeft}
                      alt="이전"
                      className="w-6 h-6 md:w-9 md:h-9"
                    />
                  </button>

                  <span className="text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] font-semibold text-[#1F1F1F]">
                    {format(date, 'yyyy. MM')}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    <Image
                      src={ChevronRight}
                      alt="다음"
                      className="w-6 h-6 md:w-9 md:h-9"
                    />
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="mt-2 md:mt-6 flex justify-center">
          <div className="w-[279px] h-[54px] md:w-[560px] md:h-[64px]">
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
