import clsx from "clsx";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props extends React.ComponentProps<"input"> {
  label?: string;
  bgColor?: boolean;
  errorMessage?: string;
  isSearchLeft?: boolean;
  isSearchRight?: boolean;
  inputClassName?: string;
  value: string | number | readonly string[];
  onChange:
    | ChangeEventHandler<HTMLInputElement>
    | ((...event: unknown[]) => void);
  onBlur: FocusEventHandler<HTMLInputElement>;
}

function Input({
  label,
  bgColor = false,
  errorMessage,
  isSearchLeft = false,
  isSearchRight = false,
  value,
  onBlur,
  onChange,
  inputClassName,
  ...props
}: Props) {
  // 아래 코드에는 clsx를 굳이 쓰지 않아도 되지만, 쓰지 않을 경우 tailwind 문법으로 인식을 하지 못하여 자동 완성이 안 됨
  const defaultClassName = clsx(
    "w-[327px] lg:w-full text-Black-400 lg:text-xl h-[54px] lg:h-16 px-[14px] py-4 rounded-2xl outline-Primay-Blue-300 border border-solid border-Line-200 placeholder-GrayScale-400"
  );

  const errorClassName = clsx({
    "outline-Secondary-Red-200 mb-2 border-solid border-2 border-Secondary-Red-200":
      !!errorMessage,
  });

  const searchClassName = clsx({
    "pl-10 lg:pl-13": isSearchLeft,
    "pr-21 lg:pr-28": isSearchRight,
  });

  const bgClassName = clsx({
    "bg-[#f7f7f7] !border-none": bgColor,
  });

  return (
    <div>
      {label && (
        <div className="mb-2 lg:mb-4">
          <label htmlFor={props.id} className="lg:text-xl text-Black-400">
            {label}
          </label>
        </div>
      )}
      <div className="rel">
        <input
          className={clsx(
            defaultClassName,
            errorClassName,
            searchClassName,
            bgClassName,
            inputClassName
          )}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      </div>
      {!!errorMessage && (
        <div className="flex justify-end">
          <span className="text-Secondary-Red-200">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
