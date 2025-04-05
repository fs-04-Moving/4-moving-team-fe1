import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  intent?: string;
}

/**
 * 페이지 상단에 사용되는 텍스트 라벨입니다.
 * 사이즈: 32px(lg), 24px(md), 20px(sm), 16px(xs)
 * @param param0
 * - intent?: 텍스트 사이즈입니다. (기본값: lg)
 * @returns
 */
function Label({ children, intent = 'lg' }: Props) {
  const defaultClassName = clsx(
    'text-Black-400 font-semibold text-lg lg:text-[32px]'
  );
  const mediumClassName = clsx({
    '!text-[24px]': intent === 'md',
  });
  const smallClassName = clsx({
    '!text-[20px]': intent === 'sm',
  });
  const extraSmallClassName = clsx({
    '!text-[16px]': intent === 'xs',
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
      {children}
    </h1>
  );
}

export default Label;
