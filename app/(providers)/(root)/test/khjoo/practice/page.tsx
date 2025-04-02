"use client";

import AddressModalRoot from "@/components/templates/AddressModalRoot";
import ModalUse from "@/components/templates/ModalUse";

export default function Page() {
  return (
    <div className="m-auto h-screen flex flex-col justify-center items-center">
      <ModalUse buttonText={"주소열기"}>
        <AddressModalRoot />
      </ModalUse>
    </div>
  );
}
