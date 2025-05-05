import type { StoryObj, Meta } from '@storybook/react';
import { Loading } from '@/index';

const meta: Meta<typeof Loading> = {
  component: Loading,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Loading>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const story: Story = {
  args: {
    className: ' w-10 h-10',
  },
};
