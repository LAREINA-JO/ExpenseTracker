import { mergeConfig, defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import commonConfig from '../../../build-common-config/vite.config.mjs';
import react from '@vitejs/plugin-react';

export default mergeConfig(
  commonConfig,
  defineConfig({
    base: './',
    envDir: './env',
    define: {
      'process.env': process.env, // pick up system environment variables
    },
    css: {
      postcss: {
        plugins: [tailwindcssNesting, tailwindcss],
      },
    },
    server: {
      open: true,
    },
    plugins: [
      react(),
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint src/',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
    ],
  }),
);
