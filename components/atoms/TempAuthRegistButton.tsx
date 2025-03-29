import { ReactNode } from 'react';

function TempAuthRegistButton({
  isValid,
  children,
}: {
  isValid: boolean;
  children: ReactNode;
}) {
  return (
    <button
      disabled={!isValid}
      className={`h-16 ${
        isValid ? 'bg-[#4890f9] cursor-pointer' : 'bg-[#dedede]'
      } rounded-2xl lg:text-xl text-gray-50`}
    >
      {children}
    </button>
  );
}

export default TempAuthRegistButton;
