// components/organisms/WorkerCardInEstimate.stories.tsx
import WorkerCardInEstimate from './WorkerCardInEstimate';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WorkerCardInEstimate> = {
  title: 'Organisms/WorkerCardInEstimate',
  component: WorkerCardInEstimate,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInEstimate>;

export const Default: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '김코드',
    experience: 7,
    summary: '안전하고 깔끔한 이사 도와드립니다.',
    confirmedEstimatesCount: 334,
    isFavorite: true,
    favoritesCount: 136,
    services: ['smallMove', 'homeMove'],
    price: 1800000,
    reviewsAverage: 4.7,
    reviewsCount: 108,
  },
};
