import type { StoryObj, Meta } from '@storybook/react';
import { Autocomplete } from '@/index';
import axios from 'axios';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: 'components/Autocomplete/Async',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: 'text',
    },
    debounceTime: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    clearable: {
      control: 'boolean',
    },
    onFetchOption: {
      control: false,
    },
    onInputChange: {
      control: false,
    },
    onSelectOption: {
      control: false,
    },
    onError: {
      control: false,
    },
    async: {
      control: false,
    },
  },
  args: {
    disabled: false,
    clearable: false,
    async: true,
    error: '',
    debounceTime: 300,
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AutocompleteAsync: Story = {
  args: {
    label: 'Autocomplete',
    clearable: true,
    onFetchOption: async (searchValue: string) => {
      const resp = await axios.get<{
        total: number;
        users: { userId: string; username: string }[];
      }>(
        `https://mock-server-8tkd.onrender.com/api/v1/users?start=1&limit=10&username=${searchValue}`,
        {
          headers: {
            'api-key': 'Msm55T9ExX',
          },
        },
      );
      return resp.data.users.map((user) => ({
        label: user.username,
        value: user.userId,
      }));
    },
  },
};
