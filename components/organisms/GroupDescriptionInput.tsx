'use client';

import { Control } from 'react-hook-form';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import InputTextBox from '../molecules/InputTextBox';
import { FormProfileInput } from '../templates/FormProfileWorker';

interface GroupDescriptionInputProps {
  control: Control<FormProfileInput>;
}

const GroupDescriptionInput = ({ control }: GroupDescriptionInputProps) => {
  return (
    <>
      <div className="mb-2 mt-5 lg:mt-0">
        <Label intent="sm" required={true}>
          상세 설명
        </Label>
      </div>
      <div className="mb-5 lg:mb-8">
        <InputTextBox
          name="description"
          control={control}
          placeholder="10자 이상 300자 이내로 입력해 주세요"
          bgColor={true}
        />
      </div>
      <DividerHor />
    </>
  );
};

export default GroupDescriptionInput;
