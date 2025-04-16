'use client';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between gap-2 bg-gray-100 border border-gray-200 rounded-2xl w-[327px] h-[150px] md:w-[600px] lg:w-[688px] lg:h-[202px] px-3.5 py-4 animate-pulse">
      {/* 서비스 태그 */}
      <div className="flex gap-2.5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="w-16 h-6 rounded-full bg-gray-200" />
        ))}
      </div>
      {/* 소개 박스 */}
      <div className="flex justify-between items-center gap-3 bg-white border border-gray-200 rounded-md p-2.5 lg:pr-4 h-[78px] lg:gap-6 lg:h-[112px]">
        {/* 프로필 이미지 */}
        <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] bg-gray-200 rounded-full" />
        {/* 기사 정보 */}
        <div className="flex-1 flex flex-col justify-between h-[58px] lg:h-[68px]">
          {/* 상단 라인: 닉네임 + 찜 */}
          <div className="flex justify-between items-center">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="w-10 h-4 bg-gray-200 rounded" />
          </div>
          {/* 하단 라인: 별점 | 경력 | 확정 */}
          <div className="flex items-center justify-between md:justify-normal md:gap-2.5 lg:gap-4">
            <div className="w-16 h-4 bg-gray-200 rounded" />
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="w-14 h-4 bg-gray-200 rounded" />
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonFavoriteList = () => {
  return (
    <div className="bg-BackGround-200 min-h-full">
      <div className="flex justify-center items-center w-full bg-GrayScale-50 h-16 lg:h-24 mb-6">
        <div className="w-[327px] md:w-[600px] lg:w-[1400px]">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row flex-wrap gap-x-6 gap-y-6 md:gap-y-8 lg:gap-y-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonFavoriteList;
