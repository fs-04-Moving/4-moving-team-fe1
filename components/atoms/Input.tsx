import clsx from 'clsx';
import { ChangeEventHandler, FocusEventHandler } from 'react';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
  isSearchLeft?: boolean;
  isSearchRight?: boolean;
  value: string | number | readonly string[];
  onChange:
    | ChangeEventHandler<HTMLInputElement>
    | ((...event: unknown[]) => void);
  onBlur: FocusEventHandler<HTMLInputElement>;
}

/**
 * - 재사용 가능한 컴포넌트로 만들기 위해 제네릭 타입 적용
 */
function Input({
  label,
  errorMessage,
  isSearchLeft = false,
  isSearchRight = false,
  value,
  onBlur,
  onChange,
  ...props
}: Props) {
  const defaultClassName = clsx(
    'w-[327px] lg:w-full lg:text-xl h-[54px] lg:h-16 px-[14px] py-4 rounded-2xl outline-[#1b92ff] border border-solid border-[#e6e6e6] placeholder-gray-400'
  );

  const errorClassName = clsx({
    'outline-[#ff4f64] mb-2': !!errorMessage,
  });

  const searchClassName = clsx({
    'pl-10 lg:pl-13': isSearchLeft,
    'pr-21 lg:pr-28': isSearchRight,
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
      <div className="rel">
        <input
          className={clsx(defaultClassName, errorClassName, searchClassName)}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      </div>
      {!!errorMessage && (
        <div className="flex justify-end">
          <span className="text-[#ff4f64]">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
