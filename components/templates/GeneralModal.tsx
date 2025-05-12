'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneralModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // 예: "w-[600px]" 또는 "max-w-lg"
  height?: string; // 예: "h-[400px]" 또는 "max-h-[80vh]"
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 클릭 시 모달 닫기 */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-gray-300/30 backdrop-blur-[1px] transition-all duration-300"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 
              bg-white rounded-4xl p-10 shadow-lg
              ${width ?? 'w-auto'} ${height ?? 'h-auto'}`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GeneralModal;
