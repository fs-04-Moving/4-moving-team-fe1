'use client';

import imgAvartar from '@/assets/images/avatartion-3.svg';
import DriverCardInLiked from '@/components/organisms/DriverCardInLiked';
import { Estimate, ServiceTypeEng } from '@/types/entities/estimate.entity';
import { User } from '@/types/entities/user.entity';
import DriverCardInWritableReview from '@/components/organisms/DriverCardInWritableReview';
import DriverCardInWating from '@/components/organisms/DriverCardInWating';
import { EstimateRequestStatus, EstimateStatus } from '@/types/move.type';
import DriverCardInProfile from '@/components/organisms/DriverCardInProfile';
import DriverCardInCompletedReview from '@/components/organisms/DriverCardInCompletedReview';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import PageContainer from '@/components/templates/PageContainer';

const mockDriverCommonData: Pick<
  User,
  'id' | 'nickname' | 'profileImage' | 'experience' | 'serviceAreas'
> & {
  summary: string;
  description: string;
  workerConfirmedEstimatesCount: number;
  isFavorite: boolean;
  favoritesCount: number;
  services: ServiceTypeEng[];
  isDirectEstimate: boolean;
  estimatePrice: number;
  serviceType: ServiceTypeEng;
  workerProfileImage: string;
  workerNickname: string;
  movingDate: Date;
  price: number;
  content: string;
  createdAt: Date;
  rating: number;
  isReviewWritten: boolean;
  estimateRequestStatus: EstimateRequestStatus;
  departure: string;
  destination: string;
} = {
  id: 'driver-001',
  profileImage: imgAvartar,
  nickname: '이삿짐마스터',
  experience: '8',
  summary: '빠르고 안전한 이사를 약속드립니다.',
  description: '서울 및 수도권 전문',
  workerConfirmedEstimatesCount: 342,
  isFavorite: true,
  favoritesCount: 128,
  serviceAreas: ['seoul', 'gyeonggi', 'incheon', 'gangwon', 'chungbuk'],
  services: ['smallMove', 'homeMove'],
  isDirectEstimate: true,
  estimatePrice: 180000,
  serviceType: 'homeMove',
  workerProfileImage: imgAvartar,
  workerNickname: '이삿짐마스터',
  movingDate: new Date(2024, 11, 17),
  price: 180000,
  createdAt: new Date(2024, 11, 17),
  rating: 5,
  isReviewWritten: true,
  content:
    '처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸 이사는 믿고 맡기세요! :) 곧 이사 앞두고 있는 지인분께 추천드릴 예정입니다!',
  estimateRequestStatus: 'active',
  destination: '경기도 수원시',
  departure: '서울시 중구',
};

const mockCustomerEstimate: Estimate = {
  id: 'estimate_001',
  serviceType: 'smallMove', // smallMove | homeMove | officeMove
  status: 'assigned', // 지정 견적 요청 여부
  customerName: '김인서',
  movingDate: new Date('2024-07-10'),
  departure: '서울시 중구',
  destination: '경기도 수원시',
  // price: 180000,
};

const onSendEstimate = () => console.log('견적 보내기 클릭됨');
const onReject = () => console.log('반려 클릭됨');

function page() {
  return (
    <div>
      <p>컴포넌트 테스트페이지입니다.</p>
      <div className="container mx-auto px-4"></div>
      <CustomerCardInEstimate
        {...mockCustomerEstimate}
        onSendEstimate={onSendEstimate}
        onReject={onReject}
      />
      <DriverCardInLiked {...mockDriverCommonData} />
      <DriverCardInProfile {...mockDriverCommonData} />
      <DriverCardInCompletedReview {...mockDriverCommonData} />
      <DriverCardInWating {...mockDriverCommonData} />
      <DriverCardInWritableReview {...mockDriverCommonData} />
    </div>
  );
}

export default page;
