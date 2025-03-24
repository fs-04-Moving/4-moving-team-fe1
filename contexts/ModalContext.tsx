'use client';

import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ModalContextValue {
  open?: (element: ReactElement) => void;
  close?: () => void;
}
const ModalContext = createContext<ModalContextValue>({});

export const useModal = () => useContext(ModalContext);

// 모달을 중첩해서 사용할 수 있도록 리팩토링
export function ModalProvider({ children }: { children: ReactNode }) {
  // 모달 요소들을 배열로 관리
  const [modalElements, setModalElements] = useState<ReactElement[]>([]);

  // 새 모달을 열 때는 배열에 추가
  const open = (element: ReactElement) =>
    setModalElements((prev) => [...prev, element]);

  // 모달을 닫을 때는 마지막 모달을 배열에서 제거
  const close = () =>
    setModalElements((prev) => prev.slice(0, prev.length - 1));

  // 모든 모달을 닫고 싶으면 배열을 빈 배열로 설정
  const closeAll = () => setModalElements([]);

  const value = { modalElements, open, close, closeAll };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElements.map((ModalComponent, index) => (
        //각 모달에는 고유의 key와 높은 z-index를 부여하여 쌓임
        <div
          key={index}
          className={`fixed inset-0`}
          style={{ zIndex: 1000 + index }}
        >
          {ModalComponent}
        </div>
      ))}
    </ModalContext.Provider>
  );
}
