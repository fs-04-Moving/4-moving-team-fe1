import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  intent?: string;
  required?: boolean;
}

/**
 * 페이지 상단에 사용되는 텍스트 라벨입니다.
 * 사이즈: 32px(lg), 24px(md), 20px(sm), 16px(xs)
 * @param param0
 * - children: 라벨 텍스트
 * - intent?: 텍스트 사이즈입니다. (기본값: lg)
 * - required?: 필수값일 경우 "*"를 표시합니다. (기본값: false)
 * @returns
 */
function Label({ children, intent = 'lg', required = false }: Props) {
  const defaultClassName = clsx(
    'text-Black-400 font-semibold text-lg lg:text-[32px]'
  );
  const mediumClassName = clsx({
    'text-base lg:!text-[24px]': intent === 'md',
  });
  const smallClassName = clsx({
    '!text-base lg:!text-[20px]': intent === 'sm',
  });
  const extraSmallClassName = clsx({
    '!text-[16px]': intent === 'xs',
  });

  const defaultRequierdClassName = clsx(
    'text-Primay-Blue-300 text-lg lg:text-[32px]'
  );
  const meidumRequierdClassName = clsx({
    '!text-Primay-Blue-300 !text-base lg:!text-[24px]': intent === 'md',
  });
  const smallRequierdClassName = clsx({
    '!text-Primay-Blue-300 !text-base lg:!text-[20px]': intent === 'sm',
  });
  const extraSmallRequierdClassName = clsx({
    '!text-Primay-Blue-300 !text-[16px]': intent === 'xs',
  });
  return (
    <h1
      className={clsx(
        defaultClassName,
        mediumClassName,
        smallClassName,
        extraSmallClassName
      )}
    >
      {required ? (
        <div>
          {children}
          <span
            className={clsx(
              defaultRequierdClassName,
              meidumRequierdClassName,
              smallRequierdClassName,
              extraSmallRequierdClassName
            )}
          >
            {' '}
            *
          </span>
        </div>
      ) : (
        children
      )}
    </h1>
  );
}

export default Label;
