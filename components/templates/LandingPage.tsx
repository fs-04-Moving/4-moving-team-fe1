import landing01 from '@/assets/images/landing-img-01.svg';
import landing02 from '@/assets/images/landing-img-02.svg';
import landing03 from '@/assets/images/landing-img-03.svg';
import Image from 'next/image';
import ButtonsLandingPage from '../atoms/ButtonsLandingPage';
import TitleLandingImage from '../atoms/TitleLandingImage';

function LandingPage() {
  return (
    <div className="h-[100%] bg-[#f5f7fb]">
      <div className="flex flex-col justify-center items-center gap-11 lg:gap-12">
        <h1 className="text-center lg:leading-13 mt-16 lg:mt-20 text-2xl lg:text-4xl font-semibold">
          원하는 이사 서비스를 요청하고
          <br /> 견적을 받아보세요
        </h1>
        <div className="flex items-center justify-center lg:w-[1220px] lg:h-[598px] lg:gap-6 gap-9 flex-col lg:flex-row">
          <div className="relative bg-Primay-Blue-100 lg:pb-[34px] rounded-4xl w-[327px] h-[240px] lg:w-[432px] lg:h-[598px]">
            <TitleLandingImage
              title="소형이사"
              subTitle="원룸, 투룸, 20평대 미만"
            />
            <Image
              src={landing01}
              alt="랜딩이미지"
              className="absolute w-[230px] lg:w-[340px] right-0 bottom-0 lg:bottom-[34px]"
            />
          </div>
          <div className="flex flex-col gap-9 lg:gap-6 h-598px">
            <div className="relative bg-GrayScale-50 rounded-4xl w-[327px] lg:w-[764px] h-[240px] lg:h-[287px]">
              <TitleLandingImage
                title="가정이사"
                subTitle="쓰리룸, 20평대 미만"
              />
              <Image
                src={landing02}
                alt="랜딩이미지"
                className="absolute w-[240px] lg:w-[430px] right-0 bottom-0 lg:bottom-0"
              />
            </div>
            <div className="relative bg-GrayScale-50 rounded-4xl w-[327px] lg:w-[764px] h-[240px] lg:h-[287px]">
              <TitleLandingImage
                title="가정이사"
                subTitle="쓰리룸, 20평대 미만"
              />
              <Image
                src={landing03}
                alt="랜딩이미지"
                className="absolute w-[300px] lg:w-[470px] right-0 bottom-0 lg:bottom-[34px]"
              />
            </div>
          </div>
        </div>
        <ButtonsLandingPage />
      </div>
    </div>
  );
}

export default LandingPage;
