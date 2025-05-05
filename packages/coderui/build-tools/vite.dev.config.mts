import { mergeConfig, defineConfig } from 'vite';
import commonConfig from './vite.config.mjs';

export default mergeConfig(
  commonConfig,
  defineConfig({
    build: {
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      reportCompressedSize: false,
      watch: {
        include: ['src/**'],
      },
    },
  }),
);
