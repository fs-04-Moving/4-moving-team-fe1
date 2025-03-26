'use client';

import { useForm } from 'react-hook-form';
import InputEmail from '../molecules/InputEmail';
import InputPassword from '../molecules/InputPassword';
import InputText from '../molecules/InputText';

export type FormSignUpInput = {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
};

const handleClickSignUp = () => {
  // login(dto);
};

function FormSignUp() {
  const { control, handleSubmit } = useForm<FormSignUpInput>({
    defaultValues: {
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
  });
  return (
    <form className="w-[640px]" onSubmit={handleSubmit(handleClickSignUp)}>
      <InputText
        name="name"
        control={control}
        id="name"
        label="이름"
        placeholder="가급적 실명을 사용해 주세요"
      />
      <InputEmail
        name="email"
        control={control}
        id="email"
        label="이메일"
        placeholder="이메일 형식에 맞게 입력해 주세요"
      />
      <InputPassword
        name="password"
        control={control}
        id="password"
        label="패스워드"
        placeholder="최소 8자 이상, 영문/숫자/특수문자 포함"
      />
    </form>
  );
}

export default FormSignUp;
