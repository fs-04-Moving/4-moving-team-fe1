import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInCompletedReview from './WorkerCardInCompletedReview';

const meta: Meta<typeof WorkerCardInCompletedReview> = {
  title: 'Organisms/WorkerCardInCompletedReview',
  component: WorkerCardInCompletedReview,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInCompletedReview>;

export const Default: Story = {
  args: {
    serviceType: 'homeMove',
    profileImage: '/images/avatartion-1.svg',
    nickname: '김이사',
    movingDate: new Date('2024-06-01'),
    price: 210000,
    content: '친절하고 꼼꼼하게 이사해주셨어요.',
    createdAt: new Date('2024-06-02'),
    rating: 5,
  },
};
