// ModalUse.tsx

'use client';

import { JSX, ReactNode } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import Swal, { SweetAlertOptions } from 'sweetalert2';

interface ModalProps {
  children: (closeModal: () => void) => ReactNode;
  buttonText: string;
}

export default function ModalUse({ children, buttonText }: ModalProps): JSX.Element {
  const onClickOpenModal = (): void => {
    const closeModal = () => Swal.close(); // 모달 닫기 함수

    const options: SweetAlertOptions = {
      html: `<div id="modal-root" class="w-full h-full"></div>`,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        container: '',
        popup: '!w-[400px] !h-auto !rounded-2xl',
      },
      didOpen: (): void => {
        const modalRoot = document.getElementById('modal-root');

        if (modalRoot) {
          flushSync(() => {
            ReactDOM.createRoot(modalRoot).render(
              <div className="relative">{children(closeModal)}</div>,
            );
          });
        }
      },
    };

    Swal.fire(options);
  };

  return (
    <div className="">
      <button
        type="button"
        className="bg-blue-500 px-4 py-2 rounded-lg text-white"
        onClick={onClickOpenModal}
      >
        {buttonText}
      </button>
    </div>
  );
}
