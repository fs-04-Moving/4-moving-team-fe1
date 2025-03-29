import clsx from 'clsx';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
}

/**
 * - 재사용 가능한 컴포넌트로 만들기 위해 제네릭 타입 적용
 */
function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, ...props }: Props & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const defaultClassName = clsx(
    'w-[327px] lg:w-full lg:text-xl h-[54px] lg:h-16 px-[14px] py-4 rounded-2xl outline-[#1b92ff] border border-solid border-[#e6e6e6] placeholder-gray-400'
  );

  const errorClassName = clsx({
    'outline-[#ff4f64] mb-2': !!error,
  });

  return (
    <div>
      {label && (
        <div className="mb-2 lg:mb-4">
          <label htmlFor={props.id} className="lg:text-xl text-[#1f1f1f]">
            {label}
          </label>
        </div>
      )}
      <input
        className={clsx(defaultClassName, errorClassName)}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {!!error && (
        <div className="flex justify-end">
          <span className="text-[#ff4f64]">{error?.message}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
