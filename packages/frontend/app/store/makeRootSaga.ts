import { all, fork } from 'redux-saga/effects';
import watchAuth from '../../core/auth/sagas';
import { resourceRootSaga, DataProvider } from '../../lib/redux-resource';

export default function makeRootSaga(dataProvider: DataProvider) {
  return function* rootSaga(): Generator {
    yield all([
      watchAuth(),
      fork(resourceRootSaga(dataProvider)),
    ]);
  };
}
