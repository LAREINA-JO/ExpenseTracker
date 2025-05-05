import type { StoryObj, Meta } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { FcStart } from 'react-icons/fc';
import { Autocomplete } from '@/index';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: 'components/Autocomplete/Sync',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'], // opened globally
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
    async: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
    clearable: false,
    debounceTime: 300,
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const autocompleteSync: Story = {
  args: {
    label: 'Autocomplete',
    options: [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
      { value: 'Option 3', label: 'Option 3' },
    ],
  },
};

export const autocompleteSyncClearable: Story = {
  args: {
    label: 'Autocomplete',
    options: [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
      { value: 'Option 3', label: 'Option 3' },
    ],
    clearable: true,
  },
};

faker.seed(1);
function createRandomUser() {
  return {
    value: faker.string.uuid(),
    label: faker.internet.userName(),
  };
}

export const autocompleteSyncLongOptions: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Autocomplete',
    className: 'max-w-60',
    options: faker.helpers.multiple(createRandomUser, {
      count: 100,
    }),
    clearable: true,
  },
};

export const autocompleteSyncCustomRender: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Autocomplete',
    className: 'max-w-60',
    options: faker.helpers.multiple(createRandomUser, {
      count: 10,
    }),
    clearable: true,
    customRenderOption: (option) => {
      return (
        <div className="flex items-center justify-between">
          <span>{option.label}</span>
          <span>
            <FcStart />
          </span>
        </div>
      );
    },
  },
};
