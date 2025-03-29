import icSearch from '@/assets/images/ic-search.svg';
import icX from '@/assets/images/ic-x.svg';
import Image from 'next/image';
import React from 'react';
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
function InputSearchRightIcon<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  return (
    <div className="relative">
      <Input label={label} isSearchRight={true} {...props} />
      <Image
        src={icX}
        alt="지우기"
        className="w-6 lg:w-9 absolute top-[15px] lg:top-[14px] right-13 lg:right-16 cursor-pointer"
      />
      <Image
        src={icSearch}
        alt="검색아이콘"
        className="lg:w-9 absolute top-[15px] lg:top-[14px] right-[14px] cursor-pointer"
      />
    </div>
  );
}

export default InputSearchRightIcon;
