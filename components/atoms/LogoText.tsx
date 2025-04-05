'use-client';

import logoText from '@/assets/images/logo-text.svg';
import Image from 'next/image';

/**
 * 텍스트 로고입니다.
 * @param param0
 * - 사이즈는 컴포넌트 호출 시 className으로 직접 설정합니다.
 * - ex: <LogoText className="w-[112px] lg:w-[140px]" />
 * @returns
 */
function LogoText({ ...props }) {
  return (
    <div>
      <Image src={logoText} alt="로고" {...props} />
    </div>
  );
}

export default LogoText;
