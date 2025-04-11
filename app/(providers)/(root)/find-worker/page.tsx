import DropdownArea from '@/components/molecules/DropdownArea';
import DropdownService from '@/components/molecules/DropdownService';
import DropdownSort from '@/components/molecules/DropdownSort';
import DriverCardInSearch from '@/components/organisms/DriverCardInSearch';
import mockImg from '@/assets/images/avatartion-2.svg';

export const mockDriverList = [
  {
    id: 1,
    profileImage: mockImg,
    nickname: '김코드',
    experience: 7,
    summary: '고객님의 물품을 안전하게 운송해 드립니다.',
    serviceTypes: ['smallMove', 'homeMove'],
    reviewsEverage: 5.0,
    reviewsCount: 178,
    confirmedEstimatesCount: 334,
    favoritesCount: 136,
    isLiked: true,
  },
  {
    id: 2,
    profileImage: mockImg,
    nickname: '박모던',
    experience: 5,
    summary: '친절과 꼼꼼함이 장점인 기사입니다.',
    serviceTypes: ['smallMove'],
    reviewsEverage: 4.8,
    reviewsCount: 94,
    confirmedEstimatesCount: 210,
    favoritesCount: 85,
    isLiked: false,
  },
  {
    id: 3,
    profileImage: mockImg,
    nickname: '이컴포',
    experience: 10,
    summary: '가정이사 전문, 안전하고 빠르게!',
    serviceTypes: ['homeMove'],
    reviewsEverage: 4.9,
    reviewsCount: 312,
    confirmedEstimatesCount: 550,
    favoritesCount: 192,
    isLiked: true,
  },
  {
    id: 4,
    profileImage: mockImg,
    nickname: '최리액트',
    experience: 3,
    summary: '사무실 이사 전문 기사입니다.',
    serviceTypes: ['officeMove'],
    reviewsEverage: 4.7,
    reviewsCount: 56,
    confirmedEstimatesCount: 78,
    favoritesCount: 43,
    isLiked: false,
  },
  {
    id: 5,
    profileImage: mockImg,
    nickname: '한넥스트',
    experience: 8,
    summary: '소형이사, 가정이사 모두 가능합니다.',
    serviceTypes: ['smallMove', 'homeMove'],
    reviewsEverage: 5.0,
    reviewsCount: 205,
    confirmedEstimatesCount: 400,
    favoritesCount: 150,
    isLiked: true,
  },
  {
    id: 6,
    profileImage: mockImg,
    nickname: '정타입',
    experience: 2,
    summary: '깔끔하게 처리해 드릴게요!',
    serviceTypes: ['smallMove'],
    reviewsEverage: 4.5,
    reviewsCount: 40,
    confirmedEstimatesCount: 60,
    favoritesCount: 22,
    isLiked: false,
  },
];

function FindWorkerPage() {
  return (
    <main className="mx-auto max-w-9/12 px-4">
      <h2 className="font-semibold text-2xl py-8">기사님 찾기</h2>
      {/* 왼쪽 필터 부분 */}
      <div className="flex gap-28">
        <aside className="hidden w-full max-w-[328px] lg:w-[32%] lg:block">
          <div className="flex flex-col gap-11">
            <div className="flex justify-between px-2.5 py-4 border-b-[1px] border-Line-200">
              <span className="text-xl">필터</span>
              <span className="text-GrayScale-300">초기화</span>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-lg font-semibold">
                지역을 선택해 주세요
              </label>
              <DropdownArea defaultValue="지역" />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-lg font-semibold">
                어떤 서비스가 필요하세요?
              </label>
              <DropdownService />
            </div>
          </div>
        </aside>
        {/* 기사님 카드 */}
        <section className="flex-1 min-w-0">
          <div className="flex flex-col items-end gap-6 mb-8">
            <DropdownSort
              options={[
                '리뷰 많은순',
                '평점 높은순',
                '경력 높은순',
                '확정 많은순',
              ]}
            />
            <input
              placeholder="텍스트를 입력해주세요"
              className="py-3.5 px-6 bg-BackGround-200 rounded-2xl w-full text-GrayScale-400"
            />
          </div>
          <div className="flex flex-col gap-12">
            {mockDriverList.map((driver) => (
              <DriverCardInSearch key={driver.id} {...driver} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default FindWorkerPage;
