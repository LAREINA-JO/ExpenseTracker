import type { StoryObj, Meta } from '@storybook/react';
import { Select } from '@/index';

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    clearable: {
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
    clearable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SelectDropdown: Story = {
  args: {
    label: 'Select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const SelectClearable: Story = {
  args: {
    label: 'Select',
    clearable: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const SelectLongOptions: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Select',
    options: Array.from({ length: 100 }, (_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`,
    })),
  },
};
