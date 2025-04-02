import icSearch from '@/assets/images/ic-search.svg';
import Image from 'next/image';
import React from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Input from '../atoms/Input';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  bgColor?: boolean;
}

/**
 * 참고 사항
 * - name과 control은 필수 항목
 * - id는 label 포커싱을 위해 필요 (불필요 시 생략 가능)
 */
function InputSearchLeftIcon<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  return (
    <div className="relative w-full">
      <Input
        isSearchLeft={true}
        value={value}
        errorMessage={error?.message}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />

      <Image
        src={icSearch}
        alt="검색아이콘"
        className="lg:w-9 absolute top-[15px] lg:top-[14px] left-[14px] cursor-pointer"
      />
    </div>
  );
}

export default InputSearchLeftIcon;
