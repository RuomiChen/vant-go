interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  // 你可以在这里继续声明其他环境变量，比如：
  // readonly VITE_APP_TITLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
