import icLogo from '@/assets/images/ic-logo.png';
import Image from 'next/image';

function ImageLogo({ width }: { width: number }) {
  return (
    <div>
      <Image src={icLogo} alt="로고" width={width} />
    </div>
  );
}

export default ImageLogo;
