'use client';

import defaultRules from '@/constants/formValidation';
import { UserSignUpDto } from '@/types/dtos/user.dto';
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

const handleClickSignUp = (inputData: UserSignUpDto) => {
  console.log('회원가입!', inputData);
};

function FormSignUp() {
  const { control, handleSubmit, getValues, formState } =
    useForm<FormSignUpInput>({
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
      <InputText
        name="phoneNumber"
        control={control}
        id="phoneNumber"
        label="휴대 전화번호"
        placeholder="휴대 전화번호 형식에 맞게 입력해 주세요"
        rules={defaultRules.phoneNumber}
      />
      <InputPassword
        name="password"
        control={control}
        id="password"
        label="비밀번호"
        placeholder="최소 8자 이상, 영문/숫자/특수문자 포함"
      />
      <InputPassword
        name="passwordConfirm"
        control={control}
        id="passwordConfirm"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 한 번 입력해 주세요"
        rules={{
          required: '필수 입력 항목입니다',
          validate: {
            isPasswordNotMatch: () => {
              const {
                password: passwordValue,
                passwordConfirm: passwordConfirmValue,
              } = getValues();
              return (
                passwordValue === passwordConfirmValue ||
                '비밀번호가 일치하지 않습니다'
              );
            },
          },
        }}
      />
      <button disabled={!formState.isValid}>
        {formState.isValid ? '회원가입' : '유효성체크실패'}
      </button>
    </form>
  );
}

export default FormSignUp;
