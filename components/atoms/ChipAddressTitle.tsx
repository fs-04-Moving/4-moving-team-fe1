import { ReactNode } from "react";

function ChipAddressTitle({ children }: { children: ReactNode }) {
  return (
    <div className="w-[54px] h-[28px] flex items-center justify-center text-[#1B92FF] bg-[#F5FAFF] font-bold text-[14px] px-[2px] py-[4px]">
      {children}
    </div>
  );
}

export default ChipAddressTitle;
