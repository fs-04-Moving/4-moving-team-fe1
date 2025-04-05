'use client';

import usersApi from '@/api/users/users.api';
import { signUpValidation } from '@/constants/formValidation';
import { SignUpDto } from '@/types/dtos/auth.dto';
import { Role } from '@/types/entities/user.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
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

function FormSignUp({ userType }: { userType: Role }) {
  const { control, handleSubmit, formState, setError } =
    useForm<FormSignUpInput>({
      defaultValues: {
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
      },
      mode: 'onBlur',
      resolver: zodResolver(signUpValidation),
    });

  const router = useRouter();

  const { mutate: signUp } = useMutation({
    mutationFn: (data: SignUpDto) => usersApi.singUp(data),
    onSuccess: () => {
      router.push(`/${userType}/profile`);
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data || '';
      if (errorMessage === '이미 존재하는 이메일입니다.') {
        setError('email', { message: '이미 사용중인 이메일입니다' });
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });

  const handleClickSignUp = (inputData: FormSignUpInput) => {
    signUp({ ...inputData, role: userType });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[327px] lg:w-[640px]">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleClickSignUp)}
        >
          <div className="flex flex-col gap-4 lg:gap-8 mb-8 lg:mb-14">
            <InputText
              name="name"
              control={control}
              id="name"
              label="이름"
              placeholder="실명을 입력해 주세요"
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
            />
          </div>
          <ButtonSolid disabled={!formState.isValid}>회원가입</ButtonSolid>
        </form>
      </div>
    </div>
  );
}

export default FormSignUp;
