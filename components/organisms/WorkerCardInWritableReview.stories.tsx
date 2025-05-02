import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInWritableReview from './WorkerCardInWritableReview';
import type { ServiceType } from '@/types/move.type';

const meta: Meta<typeof WorkerCardInWritableReview> = {
  title: 'Organisms/WorkerCardInWritableReview',
  component: WorkerCardInWritableReview,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInWritableReview>;

export const Default: Story = {
  args: {
    serviceType: 'smallMove' as ServiceType,
    profileImage: '/images/avatartion-1.svg',
    nickname: '김이사',
    movingDate: new Date('2024-07-01'),
    price: 210000,
    isReviewWritten: false,
    onClickWriteReview: () => alert('리뷰 작성 버튼 클릭됨'),
  },
};

export const AlreadyWritten: Story = {
  args: {
    serviceType: 'homeMove' as ServiceType,
    profileImage: '/images/avatartion-1.svg',
    nickname: '박이사',
    movingDate: new Date('2024-06-15'),
    price: 280000,
    isReviewWritten: true,
  },
};
