// components/atoms/UserAvartar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import UserAvartar from './UserAvartar';

const meta: Meta<typeof UserAvartar> = {
  title: 'Atoms/UserAvartar',
  component: UserAvartar,
  tags: ['autodocs'],
  args: {
    imgUrl: '',
    sizeInLarge: 56,
    isResponsive: true,
  },
};

export default meta;

type Story = StoryObj<typeof UserAvartar>;

export const Default: Story = {
  name: '기본 아바타',
};

export const CustomImage: Story = {
  name: '커스텀 이미지',
  args: {
    imgUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
};

export const LargeSize80: Story = {
  name: 'Large 사이즈 - 80',
  args: {
    sizeInLarge: 80,
  },
};

export const FixedSize: Story = {
  name: '반응형 비활성 (고정 사이즈)',
  args: {
    isResponsive: false,
  },
};
