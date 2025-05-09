import type { Meta, StoryObj } from '@storybook/react';
import ChipMovingType from './ChipMovingType';

const meta: Meta<typeof ChipMovingType> = {
  title: 'Atoms/ChipMovingType',
  component: ChipMovingType,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipMovingType>;

export const SmallMove: Story = {
  args: {
    type: 'smallMove',
    isShort: false,
    isResponsive: true,
  },
};

export const HomeMoveShort: Story = {
  args: {
    type: 'homeMove',
    isShort: true,
    isResponsive: true,
  },
};

export const OfficeMoveNonResponsive: Story = {
  args: {
    type: 'officeMove',
    isShort: false,
    isResponsive: false,
  },
};
