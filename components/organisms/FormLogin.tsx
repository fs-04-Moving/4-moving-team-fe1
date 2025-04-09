'use client';

import authApi from '@/api/auth/auth.api';
import { logInValidation } from '@/constants/formValidation';
import { useAuth, User } from '@/contexts/AuthContext';
import { LogInDto } from '@/types/dtos/auth.dto';
import { Role } from '@/types/entities/user.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
import Loader from '../atoms/Loader';
import InputEmail from '../molecules/InputEmail';
import InputPassword from '../molecules/InputPassword';

export type FormLogInInput = {
  email: string;
  password: string;
};

function FormLogIn({ userType }: { userType: Role }) {
  const { control, handleSubmit, formState, setError } =
    useForm<FormLogInInput>({
      defaultValues: { email: '', password: '' },
      mode: 'onBlur',
      resolver: zodResolver(logInValidation),
    });

  const { logIn: authLogin } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: logIn } = useMutation({
    mutationFn: (data: LogInDto) => authApi.logIn(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      const user: User | undefined = queryClient.getQueryData(['me']);
      if (user) {
        authLogin?.();
        // AuthContext에서 리다이렉트를 처리하는 것에 비해 유연하고, 깜박거림의 현상도 확실히 줄일 수 있었음
        // useAuthRedirect나 middleware에서 리다이렉트를 처리하더라도 로그인/회원가입에서는 이렇게 직접 처리해야 정상 작동
        const routePath = user.hasProfile ? '' : '/profile';
        router.push(`/${userType}${routePath}`);
        setIsProcessing(false);
      }
    },
    onError: (error: AxiosError) => {
      setIsProcessing(false);
      const errorMessage = error.response?.data || '';
      if (errorMessage === '유저가 존재하지 않습니다.') {
        setError('email', { message: '존재하지 않는 이메일입니다' });
      } else if (errorMessage === 'Incorrect password') {
        setError('password', { message: '비밀번호가 일치하지 않습니다' });
      } else if (
        errorMessage === 'password must be 8 or more characters long'
      ) {
        setError('password', { message: '비밀번호는 8자 이상이어야 합니다' });
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });

  const handleClickLogIn = (inputData: FormLogInInput) => {
    setIsProcessing(true);
    logIn({ ...inputData, role: userType });
  };
  console.log(isProcessing);

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
            />
          </div>
          <ButtonSolid disabled={!formState.isValid || isProcessing}>
            {isProcessing ? <Loader /> : '로그인'}
          </ButtonSolid>
        </form>
      </div>
    </div>
  );
}

export default FormLogIn;
