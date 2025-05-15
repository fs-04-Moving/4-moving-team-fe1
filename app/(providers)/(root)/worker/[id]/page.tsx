import profilesApi from '@/api/profiles/profiles.api';
import { Metadata } from 'next';
import WorkerDetailClient from './WorkerDetailClient';

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const workerId = params.id;

  // 배포 환경에 따른 조건부 도메인 설정
  const domain =
    process.env.NODE_ENV === 'production'
      ? 'https://movings.kro.kr' // 실제 프로덕션 도메인으로 변경
      : 'http://localhost:3000';

  const pageUrl = `${domain}/worker/${workerId}`;

  try {
    // 서버 사이드에서 워커 데이터 가져오기
    const workerData = await profilesApi.getWorkerProfile(workerId);

    return {
      title: `${workerData.nickname || '기사님'} 정보`,
      description: workerData.summary || '이사 기사님 정보를 확인해보세요!',
      openGraph: {
        title: '이사할땐, 무빙',
        description: workerData.summary || '이사 기사님 정보를 확인해보세요!',
        siteName: '이사할땐, 무빙',
        url: pageUrl, // 조건부로 생성된 URL 사용
        type: 'website',
        images: [
          {
            url:
              workerData.profileImage ||
              'https://m.luxblock.co.kr/file_data/luxblook/2020/08/17/4b0708ca352f2f903ed0ef0162bac4f2.png',
            width: 1200,
            height: 630,
            alt: `${workerData.nickname} 기사님 프로필`,
          },
        ],
      },
    };
  } catch (error) {
    // 오류 발생 시 기본 메타데이터 반환
    return {
      title: '기사님 정보',
      description: '이사 기사님 정보를 확인해보세요!',
      openGraph: {
        title: '이사할땐, 무빙',
        description: '이사 기사님 정보를 확인해보세요!',
        siteName: '이사할땐, 무빙',
        url: pageUrl, // 조건부로 생성된 URL 사용
        type: 'website',
        images: [
          {
            url: 'https://m.luxblock.co.kr/file_data/luxblook/2020/08/17/4b0708ca352f2f903ed0ef0162bac4f2.png',
            width: 1200,
            height: 630,
            alt: '기사님 정보 페이지 미리보기 이미지',
          },
        ],
      },
    };
  }
}

const DetailPage = async ({ params }: { params: { id: string } }) => {
  return <WorkerDetailClient workerId={params.id} />;
};

export default DetailPage;
