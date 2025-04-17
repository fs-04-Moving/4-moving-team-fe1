'use client';

import DatePickerWrapper from '@/components/atoms/datepicker';
import { useState } from 'react';

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSubmit = (date: Date) => {
    setSelectedDate(date);
  };

  return <DatePickerWrapper />;
}
