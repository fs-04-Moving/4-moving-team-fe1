import Image from "next/image";
import clsx from "clsx";

interface ToastPopUpProps {
  size?: "small" | "large";
}

function ToastPopUp({ size = "small" }: ToastPopUpProps) {
  const iconSize = size === "small" ? 16 : 24;

  return (
    <div
      className={clsx(
        "text-[#1B92FF] bg-[#E9F4FF] flex items-center border border-[#1B92FF] rounded-[12px]",
        {
          "w-[327px] h-[48px] px-6 py-[10px] gap-2": size === "small",
          "w-[955px] h-[74px] px-8 py-6 gap-4": size === "large",
        }
      )}
    >
      <Image
        src="/assets/images/NoEstimateIcon.svg"
        alt="확정되지 않음 아이콘"
        width={iconSize}
        height={iconSize}
      />
      <span>확정하지 않은 견적이에요!</span>
    </div>
  );
}

export default ToastPopUp;
