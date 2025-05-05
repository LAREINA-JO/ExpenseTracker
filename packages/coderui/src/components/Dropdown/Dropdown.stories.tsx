/* eslint-disable no-console */
import type { StoryObj, Meta } from '@storybook/react';
import { Button, Dropdown } from '@/index';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DropdownExample = () => {
  return (
    <>
      <Dropdown>
        <Dropdown.Trigger>
          <Button>Click Me</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.MenuItem>
            <button
              className="w-full text-left"
              onClick={() => console.log('select option 1')}
            >
              Option1
            </button>
          </Dropdown.MenuItem>
          <Dropdown.MenuItem>
            <button
              className="w-full text-left"
              onClick={() => console.log('select option 2')}
            >
              Option2
            </button>
          </Dropdown.MenuItem>
          <Dropdown.MenuItem>
            <button
              className="w-full text-left"
              onClick={() => console.log('select option 3')}
            >
              Option3
            </button>
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const story: Story = {
  render: () => DropdownExample(),
};
