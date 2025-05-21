import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInWating from './WorkerCardInWating';
import type { ServiceType } from '@/types/move.type';

const meta: Meta<typeof WorkerCardInWating> = {
  title: 'Organisms/WorkerCardInWating',
  component: WorkerCardInWating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInWating>;

export const Default: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '김이사',
    experience: 8,
    confirmedEstimatesCount: 342,
    isFavorite: true,
    favoritesCount: 128,
    services: ['smallMove', 'homeMove'] as ServiceType[],
    price: 210000,
    status: 'general',
    movingDate: new Date('2024-07-01'),
    departure: '서울시 중구 필동',
    destination: '경기도 수원시 팔달구',
    reviewsAverage: 4.7,
    reviewsCount: 108,
    onConfirm: () => alert('견적 확정하기 클릭'),
    onViewDetail: () => alert('상세 보기 클릭'),
  },
};
