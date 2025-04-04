import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  intent?: string;
}

/**
 * 페이지 상단에 사용되는 텍스트 라벨입니다.
 * 32px(lg)와 24px(md) 두 가지가 있습니다.
 * @param param0
 * - intent?: 텍스트 사이즈입니다. (기본값: lg)
 * @returns
 */
function PageLabel({ children, intent = 'lg' }: Props) {
  const defaultClassName = clsx('text-Black-400 font-semibold text-[32px]');
  const mediumClassName = clsx({
    '!text-[24px]': intent === 'md',
  });
  return (
    <h1 className={clsx(defaultClassName, mediumClassName)}>{children}</h1>
  );
}

export default PageLabel;
