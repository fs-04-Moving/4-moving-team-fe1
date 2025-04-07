import logoIconText from '@/assets/images/logo-icon-text.svg';
import Image from 'next/image';

/**
 * 아이콘과 함께 있는 로고입니다.
 * @param param0
 * - 사이즈는 컴포넌트 호출 시 className으로 직접 설정합니다.
 * - ex: <LogoIconText className="w-[112px] lg:w-[140px]" />
 * @returns
 */
function LogoIconText({ ...props }) {
  return (
    <div>
      <Image src={logoIconText} alt="로고" {...props} />
    </div>
  );
}

export default LogoIconText;
