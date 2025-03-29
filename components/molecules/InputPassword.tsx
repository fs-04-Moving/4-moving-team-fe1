import icVisibilityOn from '@/assets/images/ic-visibility-on.svg';
import icVisibility from '@/assets/images/ic-visibility.svg';
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
        type={`${!isShowPassword ? 'password' : 'text'}`}
        {...props}
      />
      <Image
        src={!isShowPassword ? icVisibility : icVisibilityOn}
        alt="패스워드보이기"
        className="absolute top-[48px] lg:top-[66px] right-[14px] cursor-pointer"
        onClick={handleTogglePassword}
      />
    </div>
  );
}

export default InputPassword;
