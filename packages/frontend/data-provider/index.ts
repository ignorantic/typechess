import config from '../config';
import jsonServerProvider from './jsonServerProvider';
import httpClient from './httpClient';
import { DataProvider } from '../lib/redux-resource';
import convertLegacyDataProvider from './convertLegacyDataProvider';

const dataProvider: DataProvider = convertLegacyDataProvider(
  jsonServerProvider(config.API_URL, httpClient),
);

export default dataProvider;
