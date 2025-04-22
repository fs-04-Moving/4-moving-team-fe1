'use client';

import ROUTES from '@/constants/routes';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideMenuLanding({ isOpen, onClose }: Props) {
  const menuItems = [
    { label: '기사님 찾기', href: ROUTES.FIND_WORKER },
    { label: '로그인', href: ROUTES.LOG_IN },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 어두운 배경 */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* 슬라이드 메뉴 */}
          <motion.div
            className="fixed top-0 right-0 w-[220px] max-w-sm h-full bg-white z-50 shadow-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div className="flex justify-end items-center h-16 pt-4 px-4">
              <button onClick={onClose} className="mb-4 cursor-pointer">
                <X className="text-Black-100 w-6 h-6 hover:opacity-60" />
              </button>
            </div>
            <nav className="px-4 flex flex-col gap-4">
              {menuItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="text-sm font-medium text-GrayScale-800 hover:text-Primary-500"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
