interface Props {
  title: string;
  subTitle: string;
}

/**
 * 랜딩 페이지 이미지들에 사용되는 title과 subTitle입니다.
 * @param param0
 * - title: 타이틀 텍스트
 * - subTitle: 서브 타이틀 텍스트
 * @returns
 */
function TitleLandingImage({ title, subTitle }: Props) {
  return (
    <div className="mt-6 ml-[30px] lg:mt-10 lg:ml-[42px]">
      <p className="font-semibold text-xl lg:text-[28px] mb-1 lg:mb-2">
        {title}
      </p>
      <p className="text-sm lg:text-xl text-GrayScale-400">{subTitle}</p>
    </div>
  );
}

export default TitleLandingImage;
