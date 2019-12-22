const isServer = typeof window === 'undefined';

const API_VERSION = isServer ? process.env.API_VERSION : window.env.API_VERSION;
const API_URL = isServer ? process.env.API_URL : window.env.API_URL;
const IMAGES_URL = isServer ? process.env.IMAGES_URL : window.env.IMAGES_URL;

export {
  API_VERSION,
  API_URL,
  IMAGES_URL,
};
