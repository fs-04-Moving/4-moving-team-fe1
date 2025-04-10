// components/group/GroupSummaryInput.tsx
'use client';

import { Control } from 'react-hook-form';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import InputText from '../molecules/InputText';
import { FormProfileInput } from '../templates/FormProfileWorker';

interface Props {
  control: Control<FormProfileInput>;
}

function GroupSummaryInput({ control }: Props) {
  return (
    <>
      <DividerHor />
      <div className="mb-2 mt-5 lg:mt-8">
        <Label intent="sm" required={true}>
          한 줄 소개
        </Label>
      </div>
      <div className="mb-5 lg:mb-8">
        <InputText
          name="summary"
          control={control}
          placeholder="10자 이상 30자 이내로 입력해 주세요"
          bgColor={true}
        />
      </div>
    </>
  );
}

export default GroupSummaryInput;
