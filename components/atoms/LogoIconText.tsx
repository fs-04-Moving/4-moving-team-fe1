import icLogo from '@/assets/images/ic-logo.svg';
import logoIconText from '@/assets/images/logo-icon-text.svg';
import Image from 'next/image';
import Link from 'next/link';

/**
 * 아이콘과 함께 있는 로고입니다.
 * @param param0
 * - 사이즈는 컴포넌트 호출 시 className으로 직접 설정합니다.
 * - ex: <LogoIconText className="w-[112px] lg:w-[140px]" />
 * @returns
 */
function LogoIconText({ className }: { className?: string }) {
  return (
    <div className="shrink-0">
      <Link href="/">
        {/* 데스크톱용 이미지 */}
        <Image
          src={logoIconText}
          alt="로고"
          className={`hidden md:inline lg:inline ${className ?? ''}`}
        />
        {/* 모바일용 이미지 */}
        <Image
          src={icLogo}
          alt="로고"
          className={`inline md:hidden ${className ? 'w-9 h-9' : ''}`}
        />
      </Link>
    </div>
  );
}

export default LogoIconText;
