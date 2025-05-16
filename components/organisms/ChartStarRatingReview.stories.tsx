import type { Meta, StoryObj } from '@storybook/react';

import ChartStarRatingReview from './ChartStarRatingReview';

// Meta 정보: Storybook에서 컴포넌트를 어떻게 표시할지 설정
const meta: Meta<typeof ChartStarRatingReview> = {
  title: 'Components/Molecules/ChartStarRatingReview', 
  component: ChartStarRatingReview, 
  parameters: {
    // Storybook에서 컴포넌트를 렌더링할 때 추가적인 설정
    // layout: 'centered', // 컴포넌트를 중앙에 배치하고 싶다면 사용
  },
  // 자동으로 문서를 생성할 때 사용될 태그
  tags: ['autodocs'],
  // props의 타입을 Storybook Controls에서 어떻게 보여줄지 설정
  argTypes: {
    ratingData: {
      control: { type: 'object' }, // 배열 형태의 입력을 받을 수 있도록 object 컨트롤 사용
      description: '1점부터 5점까지의 리뷰 개수를 담은 5개 길이의 배열 (예: [10, 20, 30, 40, 50])',
    },
  },
};

export default meta;

// 각 Story를 정의합니다. Story는 컴포넌트의 특정 상태를 보여줍니다.
type Story = StoryObj<typeof ChartStarRatingReview>;

// 기본적인 사용 예시 (다양한 별점 분포)
export const Default: Story = {
  args: {
    ratingData: [10, 20, 30, 40, 50], // 예시 데이터: 1점 10개, 2점 20개 ... 5점 50개
  },
};

// 높은 별점이 많은 경우
export const HighRatings: Story = {
  args: {
    ratingData: [5, 10, 20, 40, 100], // 4, 5점에 집중된 데이터
  },
};

// 낮은 별점이 많은 경우
export const LowRatings: Story = {
  args: {
    ratingData: [50, 40, 30, 20, 10], // 1, 2점에 집중된 데이터
  },
};

// 모든 별점의 개수가 0인 경우
export const ZeroRatings: Story = {
    args: {
        ratingData: [0, 0, 0, 0, 0], // 모든 개수가 0
    },
};

// 특정 별점 (예: 3점) 개수가 많은 경우
export const MidRatings: Story = {
    args: {
        ratingData: [10, 15, 80, 15, 10], // 3점에 집중된 데이터
    },
};