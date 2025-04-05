'use client';

import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import InputFile from '../molecules/InputFile';

interface FormProfileInput {
  profileImage: File | null;
}

function CustomerProfile() {
  const { control, handleSubmit, formState } = useForm<FormProfileInput>({
    defaultValues: { profileImage: null },
  });

  const handleClickStart = (inputData: FormProfileInput) => {
    console.log(inputData.profileImage);
  };

  return (
    <div className="flex flex-col w-[327px] lg:w-[640px]">
      <Label>프로필 등록</Label>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
      <div className="mt-5 lg:mt-16">
        <form onSubmit={handleSubmit(handleClickStart)}>
          <InputFile
            name="profileImage"
            control={control}
            id="profileImage"
            label="프로필 이미지"
          />
          <ButtonSolid disabled={!formState.isValid}>시작하기</ButtonSolid>
        </form>
      </div>
    </div>
  );
}

export default CustomerProfile;
