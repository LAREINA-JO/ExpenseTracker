import type { StoryObj, Meta } from '@storybook/react';
import { Button, Modal } from '@/index';
import { fn } from '@storybook/test';
import { useState } from '@storybook/preview-api';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'components/Modal/ManualTrigger',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    triggerMode: { control: 'radio', options: ['manual'] },
    onClose: {
      action: 'Backdrop clicked',
      description:
        'Callback when backdrop clicked. Can be used to close modal.',
    },
  },
  args: {
    triggerMode: 'manual',
    onClose: () => fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const story: Story = {
  args: {},
  render: function () {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Click Me</Button>
        {isOpen && (
          <Modal
            triggerMode="manual"
            onClose={() => setIsOpen(false)}
            className="space-y-5"
          >
            <h2 className="bold text-2xl">Hello, World!</h2>
            <p>
              Welcome to our expense tracking system! This modal allows you to
              add new expenses or modify existing ones. You can enter details
              such as amount, category, and date. Make sure to review your
              entries before submitting to ensure accurate expense tracking and
              better financial management.
            </p>
            <div className="flex justify-end space-x-5">
              <Button>Submit</Button>
              <Button
                className="bg-slate-400 hover:bg-slate-500"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  },
};
