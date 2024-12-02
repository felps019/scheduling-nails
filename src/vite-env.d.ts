/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string
  readonly VITE_API_KEY: string
  readonly VITE_DISCOVERY_DOC: string
  readonly VITE_SCOPES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}