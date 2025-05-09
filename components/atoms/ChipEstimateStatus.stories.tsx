import type { Meta, StoryObj } from '@storybook/react';
import ChipEstimateStatus from './ChipEstimateStatus';
import type { EstimateStatus } from '@/types/move.type';

const meta: Meta<typeof ChipEstimateStatus> = {
  title: 'Atoms/ChipEstimateStatus',
  component: ChipEstimateStatus,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipEstimateStatus>;

export const Default: Story = {
  args: {
    type: 'assigned' as EstimateStatus,
    isShort: false,
  },
};

export const ShortText: Story = {
  args: {
    type: 'assigned' as EstimateStatus,
    isShort: true,
  },
};
