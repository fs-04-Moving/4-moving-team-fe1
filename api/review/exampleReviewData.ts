//페이지네이션을 위한 예시 데이터들입니다.

import { Review } from '@/types/dtos/review.dto'; 

const exampleReviewData: Review[] = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`, 
  serviceType: ['smallMove', 'homeMove', 'officeMove', 'storageMove'][index % 4] as any, 
  nickname: `기사${index + 1}`,
  movingDate: new Date(2024, 6, (index % 30) + 1).toISOString(), 
  price: 100000 + index * 5000,
  isReviewWritten: false,
  content: '처음 견적 받아봤는데 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다.이 기사님은 믿고 맏기세요!!! 리뷰 세줄 만들으려고 더 씁니다.과연 세줄로넘어갈지 모르겠네요!!',
  createdAt: new Date(2025, 10, 12).toISOString(), 
  rating: Math.floor(Math.random() * 5) + 1, 
}));

export default exampleReviewData;
