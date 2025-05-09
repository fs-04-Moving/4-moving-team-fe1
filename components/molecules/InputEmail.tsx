import React from 'react';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
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
function InputEmail<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);
  return (
    <Input
      type="email"
      value={value}
      errorMessage={error?.message}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}

export default InputEmail;
