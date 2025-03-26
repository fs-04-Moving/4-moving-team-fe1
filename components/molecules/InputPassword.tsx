import icVisibilityOn from '@/assets/images/ic-visibility-on.svg';
import icVisibility from '@/assets/images/ic-visibility.svg';
import defaultRules from '@/constants/formValidation';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import Input from '../atoms/Input';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
}

/**
 * 참고 사항
 * - name과 control은 필수 항목
 * - id는 label 포커싱을 위해 필요 (불필요 시 생략 가능)
 * - defaultRules를 변경하고 싶을 경우 rules에 작성
 *   - 형식은 defaultRules 참고
 *   - 필요없을 경우 빈 객체 전달 (rules={{}})
 */
function InputPassword<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative">
      <Input
        label={label}
        type={`${isShowPassword ? 'password' : 'text'}`}
        rules={defaultRules.password}
        {...props}
      />
      <Image
        src={isShowPassword ? icVisibility : icVisibilityOn}
        alt="패스워드보이기"
        className="absolute top-[66px] right-[14px] cursor-pointer"
        onClick={handleTogglePassword}
      />
    </div>
  );
}

export default InputPassword;
