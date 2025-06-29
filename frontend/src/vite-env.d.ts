/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_AWS_API_URL?: string;
  readonly VITE_RENDER_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}