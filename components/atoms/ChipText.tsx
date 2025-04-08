function ChipText({ children }: { children: string }) {
  return (
    <span className="bg-BackGround-400 px-1.5 py-0.5 rounded-sm text-[14px] font-medium text-GrayScale-400 lg:py-1 lg:font-medium lg:text-lg">
      {children}
    </span>
  );
}

export default ChipText;
