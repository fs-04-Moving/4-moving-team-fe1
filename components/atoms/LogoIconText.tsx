import logoIconText from '@/assets/images/logo-icon-text.svg';
import Image from 'next/image';

/**
 * width={숫자}
 */
function LogoIconText({ width }: { width: number }) {
  return (
    <div>
      <Image src={logoIconText} alt="로고" width={width} />
    </div>
  );
}

export default LogoIconText;
