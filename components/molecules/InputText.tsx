import { extractDigits, formatPhoneNumber } from '@/utils/formatPhoneNumber';
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
function InputText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  // 전화번호일 경우
  const isPhone = props.name === 'phoneNumber';

  // 전화번호일 경우 숫자만 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (isPhone) {
      const digits = extractDigits(raw);
      onChange(digits); // 저장은 숫자만
    } else {
      onChange(raw);
    }
  };

  // 전화번호일 경우에는 하이픈 포함 형태로 보여주기
  const displayValue = isPhone ? formatPhoneNumber(value ?? '') : value;

  return (
    <Input
      value={displayValue}
      errorMessage={error?.message}
      onChange={handleChange}
      onBlur={onBlur}
      {...props}
    />
  );
}

export default InputText;
