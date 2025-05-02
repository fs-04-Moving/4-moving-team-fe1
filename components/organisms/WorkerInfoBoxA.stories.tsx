import type { Meta, StoryObj } from '@storybook/react';
import WorkerInfoBoxA from './WorkerInfoBoxA';

const meta: Meta<typeof WorkerInfoBoxA> = {
  title: 'Organisms/WorkerInfoBoxA',
  component: WorkerInfoBoxA,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerInfoBoxA>;

export const Default: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '김이사',
    isFavorite: true,
    favoritesCount: 132,
    experience: 5,
    reviewsAverage: 4.6,
    reviewsCount: 87,
    confirmedEstimatesCount: 145,
    isResponsive: true,
  },
};

export const NonResponsive: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '박이사',
    isFavorite: false,
    favoritesCount: 38,
    experience: 3,
    reviewsAverage: 3.9,
    reviewsCount: 21,
    confirmedEstimatesCount: 64,
    isResponsive: false,
  },
};
