const isServer = typeof window === 'undefined';

const API_VERSION = isServer ? process.env.API_VERSION : window.env.API_VERSION;
const API_URL = isServer ? process.env.API_URL : window.env.API_URL;

const index: Env = {
  API_VERSION,
  API_URL,
};

export default index;
