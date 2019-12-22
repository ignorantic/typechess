import { all } from 'redux-saga/effects';
import watchAuth from '../core/auth/sagas';

export default function* rootSaga() {
  yield all([
    watchAuth(),
  ]);
}
