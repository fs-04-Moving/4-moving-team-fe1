'use-client';

import logoText from '@/assets/images/logo-text.svg';
import Image from 'next/image';

function LogoText({ ...props }) {
  return (
    <div>
      <Image src={logoText} alt="로고" {...props} />
    </div>
  );
}

export default LogoText;
