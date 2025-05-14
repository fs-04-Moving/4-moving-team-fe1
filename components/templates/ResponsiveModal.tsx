//ResponsiveModal.tsx

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // width prop 추가
  height?: string; // height prop 추가
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
  width = 'w-full', // 기본값은 w-full
  height = 'h-auto', // 기본값은 h-auto
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* sm일때, 아래에서 위 적용 */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300"
          />

          {/* mobile에서 w-[327px] 이하일 때 아래에서 위 적용, 그 외는 일반 모달 */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              fixed z-50 bg-white p-6
              ${width} ${height}
              bottom-0 left-0
              rounded-2xl
              sm:w-[400px] sm:top-1/2 sm:left-1/2 sm:bottom-auto
              sm:translate-x-[-50%] sm:translate-y-[-50%]
              sm:rounded-2xl sm:shadow-xl
              rounded-t-3xl
              xs:w-[327px] xs:bottom-0 xs:left-0 xs:translate-x-0 xs:translate-y-[-100%] xs:fixed
            `}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveModal;
