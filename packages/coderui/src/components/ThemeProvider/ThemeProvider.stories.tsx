import type { StoryObj, Meta } from '@storybook/react';
import { ThemeProvider, defaultLightTheme } from '@/index';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';
import { useEffect } from 'react';

const themeColorControl: Record<string, any> = {};

Object.entries(defaultLightTheme.colors).forEach(([category, colorShades]) => {
  Object.entries(colorShades).forEach(([colorShade, colorValue]) => {
    document.documentElement.style.setProperty(
      `--color-${category}-${colorShade}`,
      colorValue,
    );
    themeColorControl[`theme.colors.${category}.${colorShade}`] = {
      control: { type: 'color' },
    };
  });
});

const meta: TypeWithDeepControls<Meta<typeof ThemeProvider>> = {
  component: ThemeProvider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'], // opened globally
  argTypes: {
    ...themeColorControl,
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// A wrapper component to handle side effects
const Template = (args: any) => {
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(args.theme));
  }, [args]);

  return <ThemeProvider {...args}></ThemeProvider>;
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const themeControl: Story = {
  args: {
    theme: defaultLightTheme,
  },
  render: (args) => <Template {...args} />,
};
