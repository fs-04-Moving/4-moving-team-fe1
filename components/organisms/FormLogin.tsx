'use client';

import { logInValidation } from '@/constants/formValidation';
import { UserLogInDto } from '@/types/dtos/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TempAuthRegistButton from '../atoms/TempAuthRegistButton';
import InputEmail from '../molecules/InputEmail';
import InputPassword from '../molecules/InputPassword';
import InputSearchLeftIcon from '../molecules/InputSearchLeftIcon';
import InputSearchRightIcon from '../molecules/InputSearchRightIcon';

export type FormLogInInput = {
  email: string;
  password: string;
  search: string;
};

const handleClickLogIn = (inputData: UserLogInDto) => {
  console.log('로그인sdf!', inputData);
};

function FormLogIn() {
  const { control, handleSubmit, formState } = useForm<FormLogInInput>({
    defaultValues: { email: '', password: '', search: '' },
    mode: 'onBlur',
    resolver: zodResolver(logInValidation),
  });
  return (
    <div className="w-full flex justify-center">
      <div className="w-[327px] lg:w-[640px]">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleClickLogIn)}
        >
          <div className="flex flex-col gap-4 lg:gap-8 mb-8 lg:mb-14">
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
            <InputSearchRightIcon
              name="search"
              control={control}
              placeholder="텍스트를 입력해 주세요"
            />
            <InputSearchLeftIcon
              name="search"
              control={control}
              placeholder="텍스트를 입력해 주세요"
            />
          </div>
          <TempAuthRegistButton isValid={formState.isValid}>
            로그인
          </TempAuthRegistButton>
        </form>
      </div>
    </div>
  );
}

export default FormLogIn;
