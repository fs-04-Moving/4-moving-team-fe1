'use client';

export const useFacebookShare = () => {
  const shareToFacebook = (url: string, quote?: string) => {
    // URL이 없거나 undefined인 경우 현재 페이지 URL 사용
    let shareUrl = url;

    if (!shareUrl && typeof window !== 'undefined') {
      shareUrl = window.location.href;
    }

    // 여전히 URL이 없는 경우 (서버 사이드 렌더링 중일 수 있음)
    if (!shareUrl) {
      console.error('공유할 URL이 제공되지 않았습니다.');
      return;
    }

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
