import clsx from 'clsx';
import ErrorMessage from './ErrorMessage';
import LabelInput from './LabelInput';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  bgColor?: boolean;
  errorMessage?: string;
  isSearchLeft?: boolean;
  isSearchRight?: boolean;
}

/**
 * 재사용 가능한 input 컴포넌트입니다.
 * @param
 * - label?: 라벨명(문자열) - 전달하지 않을 경우 미표시
 * - bgColor?: 배경색 적용 여부(기본값: false)
 * - errorMessage?: 에러메시지(문자열) - 전달하지 않을 경우 미표시
 * - isSearchLeft?: 아이콘이 왼쪽에 배치된 검색창일 경우 true(기본값: false)
 * - isSearchRight?: 아이콘이 오른쪽에 배치된 검색창일 경우 true(기본값: false)
 * @returns
 */
function Input({
  label,
  bgColor = false,
  errorMessage,
  isSearchLeft = false,
  isSearchRight = false,
  ...props
}: Props) {
  // 아래 코드에는 clsx를 굳이 쓰지 않아도 되지만, 쓰지 않을 경우 tailwind 문법으로 인식을 하지 못하여 자동 완성이 안 됨
  const defaultClassName = clsx(
    'w-full text-Black-400 lg:text-xl h-[54px] lg:h-16 px-[14px] py-4 rounded-2xl outline-Primay-Blue-300 border border-solid border-Line-200 placeholder-GrayScale-400'
  );

  const errorClassName = clsx({
    'outline-Secondary-Red-200 mb-2 border-solid border-2 border-Secondary-Red-200':
      !!errorMessage,
  });

  const searchClassName = clsx({
    'pl-10 lg:pl-13': isSearchLeft,
    'pr-21 lg:pr-28': isSearchRight,
  });

  const bgClassName = clsx({
    'bg-[#f7f7f7] !border-none': bgColor,
  });

  return (
    <div>
      {label && <LabelInput id={props.id} text={label} />}
      <div className="rel">
        <input
          className={clsx(
            defaultClassName,
            errorClassName,
            searchClassName,
            bgClassName
          )}
          {...props}
        />
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
}

export default Input;
