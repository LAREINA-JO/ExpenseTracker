import type { StoryObj, Meta } from '@storybook/react';
import { Button, Modal } from '@/index';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'components/Modal/ContextualTrigger',
  // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    triggerMode: {
      control: 'radio',
      options: ['contextual'],
      description: 'contextual',
    },
    onClose: { table: { disable: true } },
  },
  args: {
    triggerMode: 'contextual',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const modalExample: Story = {
  render: function () {
    return (
      <Modal triggerMode="contextual">
        <Modal.Trigger>
          <Button>Click Me</Button>
        </Modal.Trigger>
        <Modal.Content className="space-y-5">
          <h2 className="bold text-2xl">Hello, World!</h2>
          <p>
            Welcome to our expense tracking system! This modal allows you to add
            new expenses or modify existing ones. You can enter details such as
            amount, category, and date. Make sure to review your entries before
            submitting to ensure accurate expense tracking and better financial
            management.
          </p>
          <div className="flex justify-end space-x-5">
            <Button>Submit</Button>
            <Modal.CloseTrigger>
              <Button className="bg-slate-400 hover:bg-slate-500">Close</Button>
            </Modal.CloseTrigger>
          </div>
        </Modal.Content>
      </Modal>
    );
  },
};
