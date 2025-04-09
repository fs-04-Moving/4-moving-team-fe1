'use client';

import { Control } from 'react-hook-form';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import InputText from '../molecules/InputText';
import { FormProfileInput } from '../templates/FormProfileWorker';

interface GroupExperienceInputProps {
  control: Control<FormProfileInput>;
}

const GroupExperienceInput = ({ control }: GroupExperienceInputProps) => {
  return (
    <>
      <DividerHor />
      <div className="mb-2 mt-5 lg:mt-8">
        <Label intent="sm" required={true}>
          경력(년차)
        </Label>
      </div>
      <div className="mb-5 lg:mb-8">
        <InputText
          name="experience"
          control={control}
          placeholder="숫자만 입력해 주세요"
          bgColor={true}
        />
      </div>
    </>
  );
};

export default GroupExperienceInput;
