// 'use client';

// import imgAvartar from '@/assets/images/avatartion-3.svg';
// import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
// import WorkerCardInCompletedReview from '@/components/organisms/WorkerCardInCompletedReview';
// import WorkerCardInProfile from '@/components/organisms/WorkerCardInProfile';
// import WorkerCardInWritableReview from '@/components/organisms/WorkerCardInWritableReview';
// import { Estimate, ServiceTypeEng } from '@/types/entities/estimate.entity';
// import { User } from '@/types/entities/user.entity';
// import { EstimateRequestStatus, EstimateStatus } from '@/types/move.type';

// const mockDriverCommonData: Pick<
//   User,
//   'id' | 'nickname' | 'profileImage' | 'experience' | 'serviceAreas'
// > & {
//   summary: string;
//   description: string;
//   confirmedEstimateCount: number;
//   isFavorite: boolean;
//   favoritesCount: number;
//   services: ServiceTypeEng[];
//   isDirectEstimate: boolean;
//   estimatePrice: number;
//   serviceType: ServiceTypeEng;
//   workerProfileImage: string;
//   workerNickname: string;
//   movingDate: Date;
//   price: number;
//   content: string;
//   createdAt: Date;
//   rating: number;
//   isReviewWritten: boolean;
//   estimateRequestStatus: EstimateRequestStatus;
//   departure: string;
//   destination: string;
//   status: EstimateStatus;
//   reviewsAverage: number;
//   reviewsCount: number;
// } = {
//   id: 'driver-001',
//   profileImage: imgAvartar,
//   nickname: '이삿짐마스터',
//   experience: '8',
//   summary: '빠르고 안전한 이사를 약속드립니다.',
//   description: '서울 및 수도권 전문',
//   confirmedEstimateCount: 342,
//   isFavorite: true,
//   favoritesCount: 128,
//   serviceAreas: ['seoul', 'gyeonggi', 'incheon', 'gangwon', 'chungbuk'],
//   services: ['smallMove', 'homeMove'],
//   isDirectEstimate: true,
//   estimatePrice: 180000,
//   serviceType: 'homeMove',
//   workerProfileImage: imgAvartar,
//   workerNickname: '이삿짐마스터',
//   movingDate: new Date(2024, 11, 17),
//   price: 180000,
//   createdAt: new Date(2024, 11, 17),
//   rating: 5,
//   isReviewWritten: true,
//   content:
//     '처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸 이사는 믿고 맡기세요! :) 곧 이사 앞두고 있는 지인분께 추천드릴 예정입니다!',
//   estimateRequestStatus: 'active',
//   destination: '경기도 수원시',
//   departure: '서울시 중구',
//   status: 'rejected',
//   reviewsAverage: 4.2,
//   reviewsCount: 15,
// };

// // const mockCustomerEstimate: Estimate = {
// //   id: 'estimate_001',
// //   serviceType: 'smallMove', // smallMove | homeMove | officeMove
// //   status: 'rejected', // 지정 견적 요청 여부
// //   customerName: '김인서',
// //   movingDate: new Date('2025-04-08T08:58:24.038Z'),
// //   departure: '서울시 중구',
// //   destination: '경기도 수원시',
// //   requestDate: new Date('2025-04-09T15:00:00.000Z'),
// //   // price: 180000,
// // };

// // const mockReview: {
// //   nickname: string;
// //   createdAt: Date;
// //   rating: number;
// //   content: string;
// // } = {
// //   nickname: 'kimkirin',
// //   createdAt: new Date('2024-07-10'),
// //   rating: 5,
// //   content:
// //     '듣던대로 정말 친절하시고 물건도 잘 옮겨주셨어요! 나중에 또 짐 옮길 일 있으면 김코드 기사님께 부탁드릴 예정입니다!! 비 오는데 꼼꼼히 잘 해주셔서 감사드립니다 :)',
// // };

// const onSendEstimate = () => console.log('견적 보내기 클릭됨');
// const onReject = () => console.log('반려 클릭됨');

// function page() {
//   return (
//     <div>
//       <p>컴포넌트 테스트페이지입니다.</p>
//       <div className="container mx-auto px-4"></div>
//       <CustomerCardInEstimate
//         {...mockCustomerEstimate}
//         onSendEstimate={onSendEstimate}
//         onReject={onReject}
//       />
//       <WorkerCardInCompletedReview {...mockDriverCommonData} />
//       <WorkerCardInWritableReview {...mockDriverCommonData} />
//       <WorkerCardInProfile {...mockDriverCommonData} />
//     </div>
//   );
// }

// export default page;
