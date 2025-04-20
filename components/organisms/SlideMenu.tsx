'use client';

import { navMenuItems } from '@/constants/navMenuItems';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SlideMenuItem from '../atoms/SlideMenuItem';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SlideMenu({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 흐린 배경 */}
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
                <X className="text-Black-100 w-6 h-6  hover:opacity-60" />
              </button>
            </div>
            <nav>
              {navMenuItems
                .filter(
                  (item) =>
                    item.showIn?.includes('slide') &&
                    item.condition(
                      user?.role ?? null,
                      user?.hasProfile ?? false,
                      isLoggedIn ?? false
                    )
                )
                .map((item, index) => (
                  <SlideMenuItem
                    key={index}
                    onClick={() => {
                      item.onClick(router, user?.role ?? null);
                      onClose();
                    }}
                  >
                    {item.label}
                  </SlideMenuItem>
                ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
