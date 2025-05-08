import type { Meta, StoryObj } from '@storybook/react';
import ChipEstimateRequestStatus from './ChipEstimateRequestStatus';

const meta: Meta<typeof ChipEstimateRequestStatus> = {
  title: 'Atoms/ChipEstimateRequestStatus',
  component: ChipEstimateRequestStatus,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipEstimateRequestStatus>;

export const Assigned: Story = {
  args: {
    type: 'assigned',
  },
};

export const General: Story = {
  args: {
    type: 'general',
  },
};

export const Rejected: Story = {
  args: {
    type: 'rejected',
  },
};
