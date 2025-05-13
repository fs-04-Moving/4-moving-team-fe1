'use client';
/**
 *
 * 로그인 및 기다 설정이 필요하면 추가로 SDK를 설정해야함
 */
export const useFacebookShare = () => {
  const shareToFacebook = (url: string, quote?: string) => {
    // URL이 없는 경우 현재 페이지 URL 사용
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    // Facebook 공유 URL 생성
    const facebookShareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
    facebookShareUrl.searchParams.append('u', shareUrl);

    if (quote) {
      facebookShareUrl.searchParams.append('quote', quote);
    }

    // 새 창에서 Facebook 공유 페이지 열기
    // 팝업 차단을 방지하기 위한 설정
    const width = 550;
    const height = 450;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    try {
      window.open(
        facebookShareUrl.toString(),
        'facebook-share-dialog',
        `width=${width},height=${height},top=${top},left=${left},toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`,
      );
    } catch (error) {
      console.error('Facebook 공유 중 오류가 발생했습니다:', error);

      // 팝업이 차단된 경우 일반 링크로 열기
      window.location.href = facebookShareUrl.toString();
    }
  };

  return { shareToFacebook };
};
