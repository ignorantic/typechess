import { all, fork } from 'redux-saga/effects';
import watchAuth from '../../core/auth/sagas';
import resourcesSaga from '../../lib/redux-resource/sideEffect/resources';
import { DataProvider } from '../../lib/redux-resource/types';

export default function makeRootSaga(dataProvider: DataProvider) {
  return function* rootSaga(): Generator {
    yield all([
      watchAuth(),
      fork(resourcesSaga(dataProvider)),
    ]);
  };
}
