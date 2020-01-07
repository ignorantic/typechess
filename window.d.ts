declare interface Env {
  API_VERSION?: string;
  API_URL?: string;
}

declare interface Window {
  env: Env;
}

declare let window: Window;
