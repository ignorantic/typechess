import { fetchJson } from '../lib/redux-resource/util/fetch';

type Options = {
  headers: Headers;
}

const httpClient = (url: string, options: Options) => {
  const appliedOption: Options = { ...options };
  if (!appliedOption.headers) {
    appliedOption.headers = new Headers({ Accept: 'application/json' });
  }

  return fetchJson(url, appliedOption);
};

export default httpClient;
