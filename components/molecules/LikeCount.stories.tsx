// components/molecules/LikeCount.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LikeCount from './LikeCount';

const meta: Meta<typeof LikeCount> = {
  title: 'Molecules/LikeCount',
  component: LikeCount,
  tags: ['autodocs'],
  args: {
    isFavorite: true,
    favoritesCount: 87,
    isResponsive: true,
  },
};

export default meta;

type Story = StoryObj<typeof LikeCount>;

export const Default: Story = {
  name: '기본 상태',
};

export const NotFavorited: Story = {
  name: '좋아요 안한 상태',
  args: {
    isFavorite: false,
  },
};

export const FixedSize: Story = {
  name: '반응형 비활성 (고정 사이즈)',
  args: {
    isResponsive: false,
  },
};
