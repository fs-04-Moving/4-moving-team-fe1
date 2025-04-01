"use client";

import { JSX, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface ModalProps {
  children: ReactNode;
  buttonText: string;
}

export default function ModalUse({
  children,
  buttonText,
}: ModalProps): JSX.Element {
  const onClickOpenModal = async (): Promise<void> => {
    const options: SweetAlertOptions = {
      html: `<div id='modal-root'></div>`,
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: (): void => {
        const modalRoot = document.getElementById("modal-root");

        if (modalRoot) {
          ReactDOM.createRoot(modalRoot).render(children);
        }
      },
      customClass: {
        container: "!m-auto !w-full !p-0 !flex !items-center !justify-center",
        popup:
          "!h-auto !w-auto !p-0 !rounded-[32px] !border-0 !flex !items-center !justify-center",
      },
    };

    await Swal.fire(options);
  };

  return (
    <div className="m-auto h-screen flex flex-col justify-center items-center">
      <button
        className="bg-blue-500 px-2 py-1 rounded-lg text-white"
        onClick={onClickOpenModal}
      >
        {buttonText}
      </button>
    </div>
  );
}
