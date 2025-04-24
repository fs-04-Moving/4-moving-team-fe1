'use client';

import React from 'react';
import ButtonOutlined from '@/components/atoms/ButtonOutlined';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import InputEmail from '@/components/molecules/InputEmail';
import InputPassword from '@/components/molecules/InputPassword';
import InputText from '@/components/molecules/InputText';
import { useForm } from 'react-hook-form';

interface CustomerInfoEditTemplateProps {
  defaultValues: {
    name: string;
    email: string;
    phone: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmed: string;
  };
  onSubmit: (data: object) => void;
}

function CustomerInfoEditTemplate({
  defaultValues,
  onSubmit,
}: CustomerInfoEditTemplateProps) {
  const { control, handleSubmit } = useForm({ defaultValues });

  return (
    <main className="flex justify-center">
      <div className="flex flex-col gap-4 lg:gap-10 w-[327px] lg:w-[1400px] lg:mt-16 px-6 py-8">
        <h1 className="font-semibold text-lg lg:text-[32px]">기본정보 수정</h1>
        <hr className="border-[1px] border-Line-100" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between">
            <div className="flex flex-col gap-8 w-[327px] lg:w-[640px]">
              <InputText
                label="이름"
                name="name"
                control={control}
                bgColor={true}
                placeholder={'이름을 입력해 주세요'}
              />
              <hr className="border-[1px] border-Line-100" />
              <InputEmail
                label="이메일"
                name="email"
                control={control}
                bgColor={true}
                disabled
              />
              <hr className="border-[1px] border-Line-100" />
              <InputText
                label="전화번호"
                name="phone"
                control={control}
                bgColor={true}
                placeholder="전화번호를 입력해 주세요"
              />
              <hr className="block border-[1px] border-Line-100 lg:hidden" />
            </div>
            <div className="flex flex-col gap-8 w-[327px] lg:w-[640px]">
              <InputPassword
                label="현재 비밀번호"
                name="currentPassword"
                control={control}
                bgColor={true}
                placeholder={'현재 비밀번호를 입력해주세요'}
              />
              <hr className="border-[1px] border-Line-100" />
              <InputPassword
                label="새 비밀번호"
                name="newPassword"
                control={control}
                bgColor={true}
                placeholder={'새 비밀번호를 입력해주세요'}
              />
              <hr className="border-[1px] border-Line-100" />
              <InputPassword
                label="새 비밀번호 확인"
                name="newPasswordConfirmed"
                control={control}
                bgColor={true}
                placeholder={'새 비밀번호를 다시 한번 입력해주세요'}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 mt-8 w-[327px] lg:w-full lg:gap-8 lg:flex-row lg:mt-15">
            <ButtonOutlined>취소</ButtonOutlined>
            <ButtonSolid>수정하기</ButtonSolid>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CustomerInfoEditTemplate;
