'use client';

import { useForm } from 'react-hook-form';
import InputEmail from '../molecules/InputEmail';
import InputPassword from '../molecules/InputPassword';

export type FormLoginInput = {
  email: string;
  password: string;
};

const handleClickLogin = () => {
  // login(dto);
};

function FormLogin() {
  const { control, handleSubmit } = useForm<FormLoginInput>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });
  return (
    <form className="w-[640px]" onSubmit={handleSubmit(handleClickLogin)}>
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
        label="패스워드"
        placeholder="패스워드를 입력해 주세요"
      />
    </form>
  );
}

export default FormLogin;
