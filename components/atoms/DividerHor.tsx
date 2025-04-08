interface Props {
  width?: string;
}

/**
 * 수평 가로줄입니다.
 * @param param0
 * - width: 가로 길이(지정하지 않으면 가득 채웁니다)
 *   - ex: width='120'
 * @returns
 */
function DividerHor({ width }: Props) {
  const widthText = width ? `w-[${width}px]` : 'w-full';

  return <div className={`${widthText} h-[1px] bg-Line-100`}></div>;
}

export default DividerHor;
