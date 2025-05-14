// components/organisms/CustomerCardInEstimate.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import CustomerCardInEstimate from './CustomerCardInEstimate';

const meta: Meta<typeof CustomerCardInEstimate> = {
  title: 'Organisms/CustomerCardInEstimate',
  component: CustomerCardInEstimate,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomerCardInEstimate>;

const baseProps = {
  serviceType: 'smallMove',
  customerName: '김인서',
  departure: '서울시 중구 신당동',
  destination: '경기도 수원시 팔달구 인계동',
  movingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // always 7 days in the future,
  requestDate: new Date('2024-06-30'),
};

export const Default: Story = {
  args: {
    ...baseProps,
    status: 'assigned',
    isConfirmed: false,
    price: undefined,
    onSendEstimate: () => alert('견적 보내기'),
    onReject: () => alert('반려'),
  },
};

export const WithPrice: Story = {
  args: {
    ...baseProps,
    status: 'assigned',
    isConfirmed: true,
    price: 210000,
  },
};

export const Rejected: Story = {
  args: {
    ...baseProps,
    status: 'rejected',
    isConfirmed: false,
  },
};

export const PastMovingDate: Story = {
  args: {
    ...baseProps,
    movingDate: new Date('2024-06-01'),
    price: 180000,
    status: 'assigned',
    isConfirmed: true,
    onViewDetail: () => alert('상세보기'),
  },
};
