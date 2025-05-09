import icClip from '@/assets/images/ic-clip.svg';
import icFacebook from '@/assets/images/ic-facebook-f.svg';
import icKakaoBubble from '@/assets/images/ic-kakao-bubble.svg';
import { useKakaoShare } from '@/utils/kakaoSdk';
import { useClipboardShare } from '@/utils/useClipboardShare';
import { useFacebookShare } from '@/utils/useFacebookShare';
import clsx from 'clsx';
import Image from 'next/image';

interface ShareSocialProps {
  text?: string;
  className?: string;
  url?: string; // 공유할 URL
  title?: string; // 공유할 제목: 일반적으로 nickname을 공유하자
  nickname?: string;
  summary?: string;
}

function ShareSocial({
  text = '나만 알기엔 아쉬운 기사님 인가요?',
  className,
  url = typeof window !== 'undefined' ? window.location.href : '', // 기본값은 현재 페이지 URL (SSR 고려)
  title = '기사님 정보',
  nickname,
  summary,
}: ShareSocialProps) {
  const { copyToClipboard } = useClipboardShare();
  const { shareToFacebook } = useFacebookShare();
  const { shareToKakao } = useKakaoShare();

  const shareTitle = nickname ? `${nickname} 기사님 정보` : title;
  const shareDescription = summary || '이사 기사님 정보를 확인해보세요!';

  // 공통 스타일 정의
  const iconContainerStyle =
    'w-10 lg:w-16 h-10 lg:h-16 rounded-lg lg:rounded-2xl flex items-center justify-center cursor-pointer';
  const iconStyle = 'w-6 lg:w-7 h-6 lg:h-7';

  return (
    <div className={className}>
      <div className='flex flex-col gap-4 lg:gap-[22px] mt-12 lg:mt-18 text-[14px] lg:text-xl text-Black-200'>
        <p>{text}</p>
        <div className='flex gap-4'>
          <div
            className={clsx(
              iconContainerStyle,
              'bg-white border border-BackGround-100'
            )}
            onClick={() => copyToClipboard(url)}
          >
            <Image src={icClip} alt='클립복사' className={iconStyle} />
          </div>

          <div
            className={clsx(iconContainerStyle, 'bg-[#fae100]')}
            onClick={() => shareToKakao(url, shareTitle, shareDescription)}
          >
            <Image src={icKakaoBubble} alt='카카오공유' className={iconStyle} />
          </div>

          <div
            className={clsx(iconContainerStyle, 'bg-[#4285F4]')}
            onClick={() => shareToFacebook(url)}
          >
            <Image src={icFacebook} alt='페이스북공유' className={iconStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareSocial;
