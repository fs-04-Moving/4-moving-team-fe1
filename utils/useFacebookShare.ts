/**
 * ㅇ
 * @임시기능입니다
 * 이후 SDK 적용 예정입니다
 */
export function useFacebookShare() {
  const shareToFacebook = (url: string) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
  };

  return { shareToFacebook };
}
