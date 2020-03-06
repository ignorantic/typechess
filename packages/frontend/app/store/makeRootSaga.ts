import { all, fork } from 'redux-saga/effects';
import { resourceRootSaga, DataProvider } from 'redux-resourcify';
import watchAuth from '../../core/auth/sagas';

export default function makeRootSaga(dataProvider: DataProvider) {
  return function* rootSaga(): Generator {
    yield all([
      watchAuth(),
      fork(resourceRootSaga(dataProvider)),
    ]);
  };
}
