import type { StoryObj, Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@/index';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    children: { control: false },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    headless: { control: 'boolean' },
  },
  args: { onClick: fn(), isLoading: false, disabled: false, headless: false },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const withText: Story = {
  args: {
    text: 'button',
  },
};

export const withChildren: Story = {
  argTypes: {
    text: { control: false },
  },
  args: {
    children: 'button',
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing',
    isLoading: true,
  },
};
