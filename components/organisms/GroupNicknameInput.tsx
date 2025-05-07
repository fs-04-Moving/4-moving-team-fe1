// components/group/GroupNicknameInput.tsx
'use client';

import { Control } from 'react-hook-form';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import InputText from '../molecules/InputText';
import { FormProfileInput } from '../templates/FormProfileWorker';

interface Props {
  control: Control<FormProfileInput>;
}

function GroupNicknameInput({ control }: Props) {
  return (
    <>
      <DividerHor />
      <div className="mb-2 mt-5 lg:mt-8">
        <Label intent="sm" required={true}>
          별명
        </Label>
      </div>
      <div className="mb-5 lg:mb-8">
        <InputText
          name="nickname"
          control={control}
          placeholder="고객들이 볼 이름을 입력해 주세요(2자 이상)"
          bgColor={true}
        />
      </div>
    </>
  );
}

export default GroupNicknameInput;
