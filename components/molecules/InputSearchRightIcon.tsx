import icSearch from '@/assets/images/ic-search.svg';
import icX from '@/assets/images/ic-x.svg';
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
  onClickClear: () => void;
}

/**
 * 참고 사항
 * - name과 control은 필수 항목
 * - id는 label 포커싱을 위해 필요 (불필요 시 생략 가능)
 * - onClickClear
 *   - 입력 텍스트를 초기화하는 함수
 *   - InputSearchRightIcon 호출 시 useForm의 setValue를 사용해 전달해야 함
 *   - ex) ()=> setValue('search', '')
 */
function InputSearchRightIcon<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  onClickClear,
  ...props
}: Props & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController(props);

  const handleClickClear = () => {
    onClickClear();
  };

  return (
    <div className="relative">
      <Input
        label={label}
        isSearchRight={true}
        value={value}
        errorMessage={error?.message}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
      {value && (
        <Image
          src={icX}
          alt="지우기"
          onClick={handleClickClear}
          className="w-6 lg:w-9 absolute top-[15px] lg:top-[14px] right-13 lg:right-16 cursor-pointer"
        />
      )}
      <Image
        src={icSearch}
        alt="검색아이콘"
        className="lg:w-9 absolute top-[15px] lg:top-[14px] right-[14px] cursor-pointer"
      />
    </div>
  );
}

export default InputSearchRightIcon;
