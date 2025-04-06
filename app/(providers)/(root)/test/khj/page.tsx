"use client";
import CheckModalRoot from "@/components/templates/CheckModalRoot";
import ResponsiveModal from "@/components/templates/ResponsiveModal";
import { useState } from "react";

function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>모달 열기</button>
      {/* 이게 모달 아래 보일 실제 콘텐츠 */}
      <h1 className="text-2xl font-bold mb-6">서비스 페이지</h1>
      <p className="mb-4">
        여기에 모달 아래에 보여질 페이지 컨텐츠들이 있어요.
      </p>

      <ResponsiveModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CheckModalRoot
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      </ResponsiveModal>
    </div>
  );
}

export default Page;
