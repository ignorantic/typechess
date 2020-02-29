import { all, fork } from 'redux-saga/effects';
import watchAuth from '../../core/auth/sagas';
import adminSaga from '../../lib/typecore/sideEffect/admin';
import dataProvider from '../../data-provider';

export default function* rootSaga(): Generator {
  yield all([
    watchAuth(),
    fork(adminSaga(dataProvider)),
  ]);
}
