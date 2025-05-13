import type { Meta, StoryObj } from '@storybook/react';
import WorkerCardInProfile from './WorkerCardInProfile';
import type { ServiceType } from '@/types/move.type';
import type { Area } from '@/types/entities/user.entity';

const meta: Meta<typeof WorkerCardInProfile> = {
  title: 'Organisms/WorkerCardInProfile',
  component: WorkerCardInProfile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerCardInProfile>;

export const Default: Story = {
  args: {
    profileImage: '/images/avatartion-1.svg',
    nickname: '김이사',
    experience: 8,
    confirmedEstimatesCount: 120,
    summary: '빠르고 꼼꼼한 기사입니다.',
    serviceAreas: ['seoul', 'incheon'] as Area[],
    services: ['smallMove', 'homeMove'] as ServiceType[],
    reviewsAverage: 4.7,
    reviewsCount: 108,
    onConfirm: () => alert('내 프로필 수정'),
    onViewDetail: () => alert('기본 정보 수정'),
  },
};
