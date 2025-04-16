'use client';

import React from 'react';
import DatePickerWrapper from '@/components/atoms/datepicker';

const Page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DatePicker 테스트</h1>
      <DatePickerWrapper />
    </div>
  );
};

export default Page;
