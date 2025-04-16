import mockImg from '@/assets/images/avatartion-2.svg';
import FindWorkerClient from './FindWorkerClient';
import profilesApi from '@/api/profiles/profiles.api';

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
    isFavorite: true,
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
    isFavorite: false,
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
    isFavorite: true,
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
    isFavorite: false,
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
    isFavorite: true,
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
    isFavorite: false,
  },
];

type Props = {
  searchParams: {
    orderBy?: string;
    serviceType?: string;
    serviceArea?: string;
    page?: number;
    pageSize?: number;
  };
};

async function FindWorkerPage({ searchParams }: Props) {
  const workers = await profilesApi.getWorkerProfiles(searchParams);

  return (
    <main className="mx-auto max-w-9/12 px-4">
      <h2 className="font-semibold text-2xl py-8">기사님 찾기</h2>
      <FindWorkerClient initialData={workers} />
    </main>
  );
}

export default FindWorkerPage;
