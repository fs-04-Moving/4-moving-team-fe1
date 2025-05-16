import Swal from 'sweetalert2';

export function useClipboardShare() {
  const copyToClipboard = async (text: string) => {
    try {
      console.log('text확인', text);
      await navigator.clipboard.writeText(text);

      // alert 대신 Swal 사용
      Swal.fire({
        title: '링크 복사 완료!',
        text: `클립보드에 링크가 복사되었습니다.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error('클립보드 복사 실패:', err);

      // 에러 발생 시 Swal로 알림
      Swal.fire({
        title: '복사 실패',
        text: '클립보드에 복사하지 못했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };

  return { copyToClipboard };
}
