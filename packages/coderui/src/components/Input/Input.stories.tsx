import type { StoryObj, Meta } from '@storybook/react';
import { Input } from '@/index';
import { CiSearch } from 'react-icons/ci';
import { IoEye } from 'react-icons/io5';

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'], // opened globally
  argTypes: {
    type: {
      control: false,
      table: { defaultValue: { summary: 'text' } },
    },
    error: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    startIcon: {
      control: false,
    },
    endIcon: {
      control: false,
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const textInput: Story = {
  args: {
    type: 'text',
    label: 'label',
    placeholder: 'placeholder',
  },
};

export const textInputWithError: Story = {
  args: {
    type: 'text',
    label: 'label',
    error: 'error message',
  },
};

export const passwordInput: Story = {
  args: {
    type: 'password',
    label: 'password',
    placeholder: 'password',
    endIcon: <IoEye />,
  },
};

export const textInputWithIcon: Story = {
  args: {
    type: 'text',
    label: 'label',
    startIcon: <CiSearch />,
  },
};

export const numberInput: Story = {
  args: {
    type: 'number',
    label: 'numberLabel',
  },
};

export const dateInput: Story = {
  args: {
    type: 'date',
    label: 'dateLabel',
  },
};
