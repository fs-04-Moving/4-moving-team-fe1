import type { Meta, StoryObj } from '@storybook/react';
import CustomerCardInEstimateDetail, {
  WorkerCardInDetailProps,
} from '@/components/organisms/CustomerCardInEstimateDetail';

const meta: Meta<typeof CustomerCardInEstimateDetail> = {
  title: 'organisms/CustomerCardInEstimateDetail',
  component: CustomerCardInEstimateDetail,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CustomerCardInEstimateDetail>;

const mockData: WorkerCardInDetailProps = {
  id: 'worker-001',
  profileImage: '/images/avatartion-1.svg',
  nickname: '김코드',
  experience: '7',
  confirmedEstimatesCount: 334,
  isFavorite: true,
  favoritesCount: 136,
  summary: '친절하고 꼼꼼한 이사를 도와드릴게요!',
  services: ['smallMove', 'homeMove'],
  reviewsAverage: 4.7,
  reviewsCount: 108,
};

export const Default: Story = {
  args: mockData,
};
