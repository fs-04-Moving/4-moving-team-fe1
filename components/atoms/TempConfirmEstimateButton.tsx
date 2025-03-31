import { ReactNode } from 'react';

function TempConfirmEstimateButton({ children }: { children: ReactNode }) {
  return (
    <button
      className={`w-full mt-1 lg:mt-3 h-[54px] lg:h-16 bg-Primay-Blue-300 rounded-2xl lg:text-xl text-gray-50`}
    >
      {children}
    </button>
  );
}

export default TempConfirmEstimateButton;
