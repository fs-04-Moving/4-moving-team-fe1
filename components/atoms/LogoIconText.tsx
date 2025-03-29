import logoIconText from '@/assets/images/logo-icon-text.svg';
import Image from 'next/image';

/**
 * width={숫자}
 */
function LogoIconText({ ...props }) {
  return (
    <div>
      <Image src={logoIconText} alt="로고" {...props} />
    </div>
  );
}

export default LogoIconText;
