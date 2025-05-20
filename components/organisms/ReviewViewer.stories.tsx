import type { Meta, StoryObj } from '@storybook/react';
import ReviewViewer from './ReviewViewer'; 
import { Review } from '@/types/dtos/review.dto'; 
import AvatarImage from '@/assets/images/avatartion-1.svg'; 

const mockReviewData: Review = {
  id: 'mock-review-id-1', 
  workerId: 'mock-worker-id-1', 
  serviceType: 'PACKAGING', 
  profileImage: AvatarImage, 
  nickname: '테스트 작업자', 
  movingDate: '2023-10-27T10:00:00Z', 
  price: 500000, 
  content: '이것은 작성된 리뷰 내용의 예시입니다. 작업이 매우 만족스러웠고 기사님도 친절하셨습니다.', 
  createdAt: '2023-11-01T09:00:00Z', 
  rating: 4, 
  star: 4, 
  isReviewWritten: true, 
  
};

//별점이 rating 혹은 star 로 되어있어서 갼 두개 다 함...

// Meta 정보: Storybook에서 컴포넌트를 어떻게 표시할지 설정
const meta: Meta<typeof ReviewViewer> = {
  title: 'Components/Molecules/ReviewViewer', // Storybook 사이드바에 표시될 경로와 이름
  component: ReviewViewer, // 테스트할 컴포넌트
  parameters: {
    // Storybook에서 컴포넌트를 렌더링할 때 추가적인 설정
    // layout: 'centered', // 컴포넌트를 중앙에 배치하고 싶다면 사용
  },
  // 자동으로 문서를 생성할 때 사용될 태그
  tags: ['autodocs'],
  // props의 타입을 Storybook Controls에서 어떻게 보여줄지 설정
  argTypes: {
    onClose: { action: '닫기 버튼 클릭됨' }, // onClose 함수가 호출되면 Storybook Actions 탭에 로그를 남김
    review: {
      control: { type: 'object' }, // review 객체 전체를 Controls 패널에서 편집할 수 있도록 설정
      description: '작성된 리뷰 데이터를 담은 객체',
    },
  },
};

export default meta;

// 각 Story를 정의합니다. Story는 컴포넌트의 특정 상태를 보여줍니다.
type Story = StoryObj<typeof ReviewViewer>;

// 기본 보기 모드 예시
export const DefaultView: Story = {
  args: {
    onClose: () => console.log('모달 닫기 요청'), // onClose 더미 함수
    review: { ...mockReviewData }, // 위에서 정의한 가짜 데이터 사용
  },
};

// 별점이 낮은 보기 모드 예시
export const LowerRatingView: Story = {
    args: {
        onClose: () => console.log('모달 닫기 요청'),
        review: {
            ...mockReviewData, // 기본 데이터를 복사
            // star: 2, // star와 rating 둘 다 변경하거나 하나만 변경
            // rating: 2,
             star: 2, // 별점만 2점으로 변경
             rating: 2,
            content: '몇 가지 아쉬운 점이 있었습니다. 다음에는 개선되기를 바랍니다.', // 내용도 변경
        },
    },
};

// 내용이 긴 보기 모드 예시 (레이아웃 확인용)
export const LongContentView: Story = {
    args: {
        onClose: () => console.log('모달 닫기 요청'),
        review: {
            ...mockReviewData,
            content: '이삿짐 포장부터 운송, 정리까지 전 과정이 매우 만족스러웠습니다. 특히 파손되기 쉬운 물건들을 꼼꼼하게 이중 삼중으로 포장해주셔서 안심할 수 있었습니다. 직원분들도 모두 친절하시고 질문에 상세하게 답변해주셨어요. 다음에 이사할 때도 꼭 다시 이용하고 싶습니다. 다만 마지막에 큰 가구 배치 위치를 정하는 데 조금 시간이 걸렸지만, 최종적으로는 원하는대로 잘 해주셨습니다. 전체적으로 별점 5점이 아깝지 않은 서비스입니다. 감사합니다!', 
             star: 5, // 별점은 5점으로 유지
             rating: 5,
        },
    },
};