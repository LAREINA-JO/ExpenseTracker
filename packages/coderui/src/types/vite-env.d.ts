/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
