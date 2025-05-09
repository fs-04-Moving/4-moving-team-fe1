// components/molecules/RatingSummary.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import RatingSummary from './RatingSummary';

const meta: Meta<typeof RatingSummary> = {
  title: 'Molecules/RatingSummary',
  component: RatingSummary,
  tags: ['autodocs'],
  args: {
    reviewsAverage: 4.3,
    reviewsCount: 128,
    isResponsive: true,
  },
};

export default meta;

type Story = StoryObj<typeof RatingSummary>;

export const Default: Story = {
  name: '기본 평점 표시',
};

export const FixedSize: Story = {
  name: '반응형 비활성 (고정 사이즈)',
  args: {
    isResponsive: false,
  },
};
