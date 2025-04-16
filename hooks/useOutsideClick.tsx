import { useEffect } from 'react';

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  isOpen: boolean
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        // 외부 클릭으로 팝업을 닫는 로직
        if (isOpen) {
          // setTimeout을 사용하여 상태 변경을 지연시켜 바로 반영되지 않게 함
          // 적용하지 않으면 같은 버튼을 눌렀을 때 상태 토글이 제대로 작동하지 않음
          setTimeout(() => {
            onClose();
          }, 100); // 100ms 정도의 지연
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, ref, onClose]);
}

export default useOutsideClick;
