// components/organisms/WorkerCardInLiked.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInLiked from './WorkerCardInLiked';

const meta: Meta<typeof WorkerCardInLiked> = {
  title: 'Organisms/WorkerCardInLiked',
  component: WorkerCardInLiked,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInLiked>;

export const Default: Story = {
  args: {
    id: 'worker-001',
    profileImage: '/images/avatartion-1.svg',
    nickname: '김코드',
    experience: '7',
    confirmedEstimatesCount: 334,
    isFavorite: true,
    favoritesCount: 136,
    services: ['smallMove', 'homeMove'],
    reviewsAverage: 4.7,
    reviewsCount: 108,
  },
};
