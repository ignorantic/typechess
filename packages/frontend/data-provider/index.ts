import config from '../config';
import jsonServerProvider from './jsonServerProvider';
import httpClient from './httpClient';

const dataProvider = jsonServerProvider(config.API_URL, httpClient);

export default dataProvider;
