"use client";
import React, { useState } from "react";
import ResponsiveModal from "../../../../../components/templates/ResponsiveModal";

const ExamplePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">GeneralModal 사용 예시</h1>

      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
      >
        모달 열기
      </button>

      <ResponsiveModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <h2 className="text-xl font-semibold mb-4">모달 타이틀</h2>
          <p className="mb-6">이곳은 GeneralModal 안쪽입니다!</p>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            닫기
          </button>
        </div>
      </ResponsiveModal>
    </div>
  );
};

export default ExamplePage;
