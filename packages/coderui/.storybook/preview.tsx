import React from 'react';
import type { Preview } from '@storybook/react';
import { defaultLightTheme, ThemeProvider } from '../src';

const preview: Preview = {
  decorators: [
    (Story) => {
      const localTheme = localStorage.getItem('theme');
      const theme = localTheme ? JSON.parse(localTheme) : defaultLightTheme;

      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    deepControls: { enabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'requiredFirst',
    },
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
  tags: ['autodocs'],
};

export default preview;
