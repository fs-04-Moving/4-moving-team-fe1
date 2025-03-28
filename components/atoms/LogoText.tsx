import logoText from '@/assets/images/logo-text.svg';
import Image from 'next/image';

/**
 * width={숫자}
 */
function LogoText({ width }: { width: number }) {
  return (
    <div>
      <Image src={logoText} alt="로고" width={width} />
    </div>
  );
}

export default LogoText;
