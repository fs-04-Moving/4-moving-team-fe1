import clsx from 'clsx';
import { ChangeEventHandler, FocusEventHandler } from 'react';

interface Props extends React.ComponentProps<'textarea'> {
  label?: string;
  bgColor?: boolean;
  errorMessage?: string;
  value: string | number | readonly string[];
  onChange: ChangeEventHandler<HTMLTextAreaElement> | ((...event: unknown[]) => void);
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
}

function TextArea({
  label,
  bgColor = false,
  errorMessage,
  value,
  onBlur,
  onChange,
  ...props
}: Props) {
  const defaultClassName = clsx(
    'resize-none w-[327px] lg:w-full lg:text-xl h-40 px-[14px] py-4 rounded-2xl outline-Primary-blue-300 border border-solid border-Line-200 placeholder-GrayScale-400',
  );
  const errorClassName = clsx({
    'outline-Secondary-Red-200 mb-2 border-solid border-2 border-Secondary-Red-200': !!errorMessage,
  });

  const bgClassName = clsx({
    'bg-[#f7f7f7] !border-none': bgColor,
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
        <textarea
          className={clsx(defaultClassName, errorClassName, bgClassName)}
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

export default TextArea;
