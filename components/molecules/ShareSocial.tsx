import icClip from '@/assets/images/ic-clip.svg';
import icFacebook from '@/assets/images/ic-facebook-f.svg';
import icKakaoBubble from '@/assets/images/ic-kakao-bubble.svg';
import { useKakaoShare } from '@/utils/kakaoSdk';
import { useClipboardShare } from '@/utils/useClipboardShare';
import { useFacebookShare } from '@/utils/useFacebookShare';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Next.js의 usePathname 훅 사용
import { useEffect, useState } from 'react';

interface ShareSocialProps {
  text?: string;
  className?: string;
  title?: string;
  nickname?: string;
  summary?: string;
}

function ShareSocial({
  text = '나만 알기엔 아쉬운 기사님 인가요?',
  className,
  title = '기사님 정보',
  nickname,
  summary,
}: ShareSocialProps) {
  const pathname = usePathname(); // 현재 경로 가져오기
  const [currentUrl, setCurrentUrl] = useState('');
  console.log('도메인확인', window.location.origin);
  console.log('현재url 확인', currentUrl);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 명시적으로 도메인 + 경로 조합
      const domain = window.location.origin;
      console.log('도메인확인2', window.location.origin);
      if (domain && domain !== 'undefined') {
        setCurrentUrl(`${domain}${pathname}`);
      }
    }
  }, [pathname]);

  const { copyToClipboard } = useClipboardShare();
  const { shareToFacebook } = useFacebookShare();
  const { shareToKakao } = useKakaoShare();

  const shareTitle = nickname ? `${nickname} 기사님 정보` : title;
  const shareDescription = summary || '이사 기사님 정보를 확인해보세요!';

  // 공통 스타일 정의
  const iconContainerStyle =
    'w-10 lg:w-16 h-10 lg:h-16 rounded-lg lg:rounded-2xl flex items-center justify-center cursor-pointer';
  const iconStyle = 'w-6 lg:w-7 h-6 lg:h-7';

  // 공유 기능이 준비되었는지 확인
  const isShareReady =
    currentUrl && currentUrl !== 'undefined' && !currentUrl.includes('undefined');

  return (
    <div className={className}>
      <div className="flex flex-col gap-4 font-semibold lg:gap-[22px] text-[14px] lg:text-xl text-Black-400">
        <p>{text}</p>
        <div className="flex gap-4">
          <div
            className={clsx(iconContainerStyle, 'bg-white border border-BackGround-300')}
            onClick={() => isShareReady && copyToClipboard(currentUrl)}
          >
            <Image src={icClip} alt="클립복사" className={iconStyle} />
          </div>

          <div
            className={clsx(iconContainerStyle, 'bg-[#fae100]')}
            onClick={() => isShareReady && shareToKakao(currentUrl, shareTitle, shareDescription)}
          >
            <Image src={icKakaoBubble} alt="카카오공유" className={iconStyle} />
          </div>

          <div
            className={clsx(iconContainerStyle, 'bg-[#4285F4]')}
            onClick={() => isShareReady && shareToFacebook(currentUrl, shareDescription)}
          >
            <Image src={icFacebook} alt="페이스북공유" className={iconStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareSocial;
