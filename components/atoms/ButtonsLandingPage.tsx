import ROUTES from '@/constants/routes';
import Link from 'next/link';

function ButtonsLandingPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 w-[327px] lg:w-[696px] mb-20">
      <div className="w-full">
        <Link href={ROUTES.LOG_IN}>
          <div className="w-full cursor-pointer flex rounded-full justify-center items-center text-GrayScale-50 lg:text-xl font-semibold bg-Primay-Blue-300 hover:bg-Primay-Blue-200 active:bg-Primay-Blue-200 h-[54px] lg:h-[64px]">
            로그인
          </div>
        </Link>
      </div>
      <div className="w-full">
        <Link href={ROUTES.SIGN_UP}>
          <div className="w-full cursor-pointer flex rounded-full border border-Primay-Blue-300 justify-center items-center text-Primay-Blue-300 lg:text-xl font-semibold bg-GrayScale-50 h-[54px] active:bg-[#f3f3f3] hover:bg-[#f3f3f3] lg:h-[64px]">
            <div>회원가입</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ButtonsLandingPage;
