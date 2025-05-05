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
      backgroundImage: {
        'auth-background': "url('/images/auth/bg1.jpg')",
      },
    },
  },
  plugins: [containerQueriesPlugin],
};
export default config;
