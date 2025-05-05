import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import containerQueriesPlugin from '@tailwindcss/container-queries';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        roboto: [...defaultTheme.fontFamily.sans],
        open_sans: [...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        paper:
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
      },
      colors: {
        primary: {
          main: 'var(--color-primary-main)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        error: {
          main: 'var(--color-error-main)',
          light: 'var(--color-error-light)',
          dark: 'var(--color-error-dark)',
        },
        warning: {
          main: 'var(--color-warning-main)',
          light: 'var(--color-warning-light)',
          dark: 'var(--color-warning-dark)',
        },
        success: {
          main: 'var(--color-success-main)',
          light: 'var(--color-success-light)',
          dark: 'var(--color-success-dark)',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.1s ease-in-out',
      },
    },
  },
  plugins: [containerQueriesPlugin],
};
export default config;
