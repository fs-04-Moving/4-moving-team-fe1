import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInPendingReview from './WorkerCardInPendingReview';
import type { ServiceType } from '@/types/move.type';

const meta: Meta<typeof WorkerCardInPendingReview> = {
  title: 'Organisms/WorkerCardInPendingReview',
  component: WorkerCardInPendingReview,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInPendingReview>;

export const Default: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '김코드',
    experience: 7,
    confirmedEstimatesCount: 334,
    isFavorite: true,
    favoritesCount: 136,
    services: ['smallMove', 'homeMove'] as ServiceType[],
    reviewsAverage: 4.7,
    reviewsCount: 108,
  },
};
