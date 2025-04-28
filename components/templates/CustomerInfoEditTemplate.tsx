'use client';

import React from 'react';
import ButtonOutlined from '@/components/atoms/ButtonOutlined';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import InputEmail from '@/components/molecules/InputEmail';
import InputPassword from '@/components/molecules/InputPassword';
import InputText from '@/components/molecules/InputText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUserInfoDto } from '@/types/dtos/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCustomerInfoValidation } from '@/constants/formValidation';
import clsx from 'clsx';

interface CustomerInfoEditTemplateProps {
  defaultValues: UpdateUserInfoDto;
  onSubmit: SubmitHandler<UpdateUserInfoDto>;
}

/**
 * CustomerInfoEditTemplate
 *
 * 사용자 정보 수정 페이지에 공통으로 사용할 수 있는 템플릿 컴포넌트입니다.
 * 이름, 이메일, 전화번호, 비밀번호 수정 등의 항목을 포함하며,
 * `defaultValues`와 `onSubmit` 핸들러를 통해 유연하게 재사용할 수 있습니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerInfoEditTemplate
 *   defaultValues={{
 *     name: '홍길동',
 *     email: 'hong@example.com',
 *     phoneNumber: '010-1234-5678',
 *     password: '',
 *     newPassword: '',
 *     newPasswordConfirm: '',
 *   }}
 *   onSubmit={(data) => console.log(data)}
 * />
 * ```
 *
 * @param {Object} defaultValues - 각 입력 항목의 기본값을 설정
 * @param {string} defaultValues.name - 사용자 이름
 * @param {string} defaultValues.email - 사용자 이메일 (disabled 상태)
 * @param {string} defaultValues.phoneNumber - 사용자 전화번호
 * @param {string} defaultValues.password - 현재 비밀번호
 * @param {string} defaultValues.newPassword - 새 비밀번호
 * @param {string} defaultValues.newPasswordConfirm - 새 비밀번호 확인
 * @param {SubmitHandler<UpdateUserInfoDto>} onSubmit - 폼 제출 시 호출될 핸들러
 */

function CustomerInfoEditTemplate({
  defaultValues,
  onSubmit,
}: CustomerInfoEditTemplateProps) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues,
    resolver: zodResolver(editCustomerInfoValidation),
  });

  const fixedHeightClassName = clsx('lg:h-[140px]');

  return (
    <main className="flex justify-center">
      <div className="flex flex-col gap-4 lg:gap-10 w-[327px] lg:w-[1400px] lg:mt-16 px-6 py-8">
        <h1 className="font-semibold text-lg lg:text-[32px]">기본정보 수정</h1>
        <hr className="border-[1px] border-Line-100" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between">
            <div className="flex flex-col gap-8 w-[327px] lg:w-[640px]">
              <div className={clsx(fixedHeightClassName)}>
                <InputText
                  label="이름"
                  name="name"
                  control={control}
                  bgColor={true}
                  placeholder={'이름을 입력해 주세요'}
                />
              </div>
              <hr className="border-[1px] border-Line-100" />
              <div className={clsx(fixedHeightClassName)}>
                <InputEmail
                  label="이메일"
                  name="email"
                  control={control}
                  bgColor={true}
                  readOnly
                  className="bg-BackGround-200 text-gray-300 w-full rounded-2xl text-[16px] lg:text-xl p-3.5 md:h-[54px] lg:h-[64px]"
                />
              </div>
              <hr className="border-[1px] border-Line-100" />
              <div className={clsx(fixedHeightClassName)}>
                <InputText
                  label="전화번호"
                  name="phoneNumber"
                  control={control}
                  bgColor={true}
                  placeholder="전화번호를 입력해 주세요"
                />
              </div>
              <hr className="block border-[1px] border-Line-100 lg:hidden" />
            </div>
            <div className="flex flex-col gap-8 w-[327px] lg:w-[640px]">
              <div className={clsx(fixedHeightClassName)}>
                <InputPassword
                  label="현재 비밀번호"
                  name="password"
                  control={control}
                  bgColor={true}
                  placeholder={'현재 비밀번호를 입력해주세요'}
                />
              </div>
              <hr className="border-[1px] border-Line-100" />
              <div className={clsx(fixedHeightClassName)}>
                <InputPassword
                  label="새 비밀번호 (선택)"
                  name="newPassword"
                  control={control}
                  bgColor={true}
                  placeholder={'변경을 원할 경우 새 비밀번호를 입력해 주세요'}
                />
              </div>
              <hr className="border-[1px] border-Line-100" />
              <div className={clsx(fixedHeightClassName)}>
                <InputPassword
                  label="새 비밀번호 확인"
                  name="newPasswordConfirm"
                  control={control}
                  bgColor={true}
                  placeholder={'새 비밀번호를 다시 한번 입력해주세요'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 mt-8 w-[327px] lg:w-full lg:gap-8 lg:flex-row lg:mt-15">
            <ButtonOutlined>취소</ButtonOutlined>
            <ButtonSolid disabled={!formState.isValid}>수정하기</ButtonSolid>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CustomerInfoEditTemplate;
