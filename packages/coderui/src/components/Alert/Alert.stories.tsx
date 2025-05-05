import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button } from '@/index';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      disable: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
    },
    confirmButtonText: {
      control: 'text',
    },
    cancelButtonText: {
      control: 'text',
    },
    onConfirm: {
      action: 'confirmed',
    },
    onCancel: {
      action: 'cancelled',
    },
  },
  args: {
    onConfirm: fn(),
    onCancel: fn(),
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  parameters: {
    docs: {
      disable: false,
    },
  },
  render: function () {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
        {isOpen && (
          <Alert
            onCancel={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
          >
            <h2 className="mb-4 text-lg">Would you like to add a new item?</h2>
          </Alert>
        )}
      </>
    );
  },
};

export const CustomButtonText: Story = {
  args: {
    children: 'Delete this item?',
    confirmButtonText: 'Delete',
    confirmButtonClassName: 'bg-red-500 hover:bg-red-600',
    cancelButtonText: 'Keep',
    onConfirm: () => fn(),
    onCancel: () => fn(),
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing your request...',
    isLoading: true,
    onConfirm: () => fn(),
    onCancel: () => fn(),
  },
};

export const CustomStyling: Story = {
  args: {
    children: 'Custom styled alert',
    confirmButtonClassName: 'bg-green-500 hover:bg-green-600',
    confirmButtonText: 'Yes',
    cancelButtonClassName: 'bg-yellow-500 hover:bg-yellow-600',
    cancelButtonText: 'No',
    buttonGroupClassName: ' mt-4',
    className: 'bg-gray-100 min-w-64',
    onConfirm: () => fn(),
    onCancel: () => fn(),
  },
};
