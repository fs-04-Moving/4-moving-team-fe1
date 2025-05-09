import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInSearch from './WorkerCardInSearch';

const meta: Meta<typeof WorkerCardInSearch> = {
  title: 'Organisms/WorkerCardInSearch',
  component: WorkerCardInSearch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInSearch>;

export const Default: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '김코드',
    experience: 7,
    summary: '안전하고 깔끔한 이사 도와드립니다.',
    services: ['smallMove', 'homeMove'],
    reviewsAverage: 4.8,
    reviewsCount: 153,
    favoritesCount: 130,
    confirmedEstimatesCount: 87,
    isFavorite: true,
    isResponsive: true,
  },
};
