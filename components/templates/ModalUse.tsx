// ModalUse.tsx

"use client";

import { JSX, ReactNode } from "react";
import { flushSync } from "react-dom";
import ReactDOM from "react-dom/client";
import Swal, { SweetAlertOptions } from "sweetalert2";
import Image from "next/image";
import X from "@/assets/images/ic-X2.svg";

interface ModalProps {
  children: (closeModal: () => void) => ReactNode;
  buttonText: string;
}

export default function ModalUse({
  children,
  buttonText,
}: ModalProps): JSX.Element {
  const onClickOpenModal = (): void => {
    const closeModal = () => Swal.close(); // 모달 닫기 함수

    const options: SweetAlertOptions = {
      html: `<div id="modal-root" class="w-full h-full"></div>`,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        container: "",
        popup: "!w-[400px] !h-auto !rounded-2xl",
      },
      didOpen: (): void => {
        const modalRoot = document.getElementById("modal-root");

        if (modalRoot) {
          flushSync(() => {
            ReactDOM.createRoot(modalRoot).render(
              <div className="relative">
                <button
                  className="cursor-pointer absolute top-[10px] right-[10px]"
                  onClick={closeModal} // 모달을 닫는 함수
                >
                  <Image src={X} alt="창닫기" width={18} />
                </button>
                {children(closeModal)}
              </div>
            );
          });
        }
      },
    };

    Swal.fire(options);
  };

  return (
    <div className="m-auto h-screen flex flex-col justify-center items-center">
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
