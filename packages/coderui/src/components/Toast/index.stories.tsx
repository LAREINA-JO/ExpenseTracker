import type { StoryObj, Meta } from '@storybook/react';
import { ToastContainer, toast, Button } from '@/index';
import type { ToastOptions } from 'react-toastify';

const meta: Meta<ToastOptions> = {
  component: ToastContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'inline-radio',

      options: [
        'top-center',
        'top-left',
        'top-right',
        'bottom-center',
        'bottom-left',
        'bottom-right',
      ],
    },
    type: {
      control: 'inline-radio',
      options: ['success', 'warning', 'error', 'info'],
    },
    theme: {
      control: 'inline-radio',
      options: ['colored', 'dark', 'light'],
    },
  },
  args: {
    position: 'top-center',
    type: 'success',
    theme: 'colored',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

const ToastExample = (args: ToastOptions) => {
  return (
    <>
      <Button onClick={() => toast('Toast!', { ...args })}>Click Me</Button>
      <ToastContainer />
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const story: Story = {
  render: (args) => <ToastExample {...args} />,
};
