'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import Label from '../atoms/Label';
import InputFile from '../molecules/InputFile';

interface GroupProfileImageInputProps<T extends FieldValues> {
  control: Control<T>;
}

const GroupProfileImageInput = <T extends FieldValues>({
  control,
}: GroupProfileImageInputProps<T>) => {
  return (
    <div className="mb-5 lg:mb-8">
      <div className="mb-4 lg:mb-6">
        <Label intent="sm">프로필 이미지</Label>
      </div>
      <InputFile
        name={'profileImage' as Path<T>}
        control={control}
        id="profileImage"
      />
    </div>
  );
};

export default GroupProfileImageInput;
