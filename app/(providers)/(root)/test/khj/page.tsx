"use client";
import CheckModalRoot from "@/components/templates/CheckModalRoot";
import ModalUse from "@/components/templates/ModalUse";

function page() {
  return (
    <div>
      <ModalUse buttonText={"시발"}>
        {(c) => <CheckModalRoot closeModal={c} />}
      </ModalUse>
    </div>
  );
}

export default page;
