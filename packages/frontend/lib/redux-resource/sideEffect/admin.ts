import { all } from 'redux-saga/effects';
import { DataProvider } from '../types';
import fetch from './fetch';

/**
 * @param {Object} dataProvider A Data Provider function
 // * @param {Function} authProvider An Authentication Provider object
 */
export default (
  dataProvider: DataProvider,
  // authProvider: AuthProvider | null
) => function* admin() {
  yield all([
    // auth(authProvider)(),
    // undo(),
    fetch(dataProvider)(),
    // accumulate(),
    // redirection(),
    // refresh(),
    // notification(),
    // callback(),
  ]);
};
