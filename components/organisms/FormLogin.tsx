'use client';

import { UserLogInDto } from '@/types/dtos/user.dto';
import { useForm } from 'react-hook-form';
import TempAuthRegistButton from '../atoms/TempAuthRegistButton';
import InputEmail from '../molecules/InputEmail';
import InputPassword from '../molecules/InputPassword';

export type FormLogInInput = {
  email: string;
  password: string;
};

const handleClickLogIn = (inputData: UserLogInDto) => {
  console.log('로그인sdf!', inputData);
};

function FormLogIn() {
  const { control, handleSubmit, formState } = useForm<FormLogInInput>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });
  return (
    <div className="w-full flex justify-center">
      <div className="w-[640px]">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(handleClickLogIn)}
        >
          <InputEmail
            name="email"
            control={control}
            id="email"
            label="이메일"
            placeholder="이메일 주소를 입력해 주세요"
          />
          <InputPassword
            name="password"
            control={control}
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            rules={{ required: '필수 입력 항목입니다' }}
          />
          <TempAuthRegistButton isValid={formState.isValid}>
            로그인
          </TempAuthRegistButton>
        </form>
      </div>
    </div>
  );
}

export default FormLogIn;
