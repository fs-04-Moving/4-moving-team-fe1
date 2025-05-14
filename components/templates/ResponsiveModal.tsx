//ResponsiveModal.tsx

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  width?: string; // width prop 추가
  height?: string; // height prop 추가
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  children,
  width = 'w-full', // 기본값은 w-full
  height = 'h-auto', // 기본값은 h-auto
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* sm일때, 아래에서 위 적용 */}
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300" />

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
              bottom-0
              rounded-4xl
              md:top-1/2 md:left-1/2 md:bottom-auto
              md:translate-x-[-50%] md:translate-y-[-50%]
              md:rounded-2xl md:shadow-xl
              rounded-t-3xl
              left-1/2 translate-x-[-50%]
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
