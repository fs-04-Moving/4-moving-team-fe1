import defaultRules from '@/constants/formValidation';
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
 * - defaultRules를 변경하고 싶을 경우 rules에 작성
 *   - 형식은 defaultRules 참고
 *   - 필요없을 경우 빈 객체 전달 (rules={{}})
 *   - ./constants/formValidation.ts에 추가하여 사용 가능
 */
function InputText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  return <Input label={label} rules={defaultRules.text} {...props} />;
}

export default InputText;
