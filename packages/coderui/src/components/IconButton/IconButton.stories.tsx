import type { StoryObj, Meta } from '@storybook/react';
import { IconButton } from '@/index';
import { fn } from '@storybook/test';
import { FcStart } from 'react-icons/fc';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'], // opened globally
  argTypes: {},
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const demo: Story = {
  args: {
    children: <FcStart className="h-10 w-10" />,
  },
};
