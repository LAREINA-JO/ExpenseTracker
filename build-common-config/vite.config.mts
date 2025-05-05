import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import checker from 'vite-plugin-checker';
import { imagetools } from 'vite-imagetools';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    checker({
      typescript: {
        tsconfigPath: 'tsconfig.build.json',
      },
    }), // tsconfigPath only defines include. We still need define other props.
    imagetools(),
    tsconfigPaths(),
    svgr(),
  ],
});
