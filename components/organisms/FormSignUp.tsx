'use client';

import { signUpValidation } from '@/constants/formValidation';
import { useLoginMutation } from '@/hooks/useLoginMutation';
import { useSignUpMutation } from '@/hooks/useSignUpMutation';
import { Role } from '@/types/entities/user.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
import Loader from '../atoms/Loader';
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

function FormSignUp({ role }: { role: Role }) {
  const { control, handleSubmit, formState, setError } = useForm<FormSignUpInput>({
    defaultValues: {
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpValidation),
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: logIn } = useLoginMutation({ setIsProcessing });
  const { mutate: signUp } = useSignUpMutation({
    setError,
    setIsProcessing,
    logIn,
  });

  const handleClickSignUp = (inputData: FormSignUpInput) => {
    setIsProcessing(true);
    signUp({ ...inputData, role });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[327px] lg:w-[640px]">
        <form className="flex flex-col" onSubmit={handleSubmit(handleClickSignUp)}>
          <div className="flex flex-col gap-4 lg:gap-8 mb-8 lg:mb-14">
            <InputText
              name="name"
              control={control}
              id="name"
              label="이름"
              placeholder="실명을 입력해 주세요(2자 이상)"
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
              placeholder="01X-XXXX-XXXX"
            />
            <InputPassword
              name="password"
              control={control}
              id="password"
              label="비밀번호"
              placeholder="8자 이상, 영문/숫자/특수문자 포함"
            />
            <InputPassword
              name="passwordConfirm"
              control={control}
              id="passwordConfirm"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
            />
          </div>
          <ButtonSolid disabled={!formState.isValid || isProcessing}>
            {isProcessing ? <Loader /> : '회원가입'}
          </ButtonSolid>
        </form>
      </div>
    </div>
  );
}

export default FormSignUp;
