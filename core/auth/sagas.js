import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  compose,
  nth,
  path,
  prop,
  split,
} from 'ramda';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logoutSuccess,
  logoutRequest,
  logoutFailure,
  resetRequest,
  resetSuccess,
  resetFailure,
} from './store/actions';
import Http from '../http/Http';
import {
  AUTH_SIGN_UP,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESET,
} from './store/action-types';
import { handleError } from '../workers/errorHandlers';

const cropBearer = compose(
  nth(1),
  split(' '),
  path(['data', 'token']),
);

/**
 * Create new account
 *
 * @param params
 * @return {*}
 */
function* register(params) {
  const form = 'companySignUp';
  const credentials = prop('payload', params);
  yield put(signUpRequest());
  try {
    const res = yield call(Http.post, 'company/oauth/sign_up', credentials);
    const token = cropBearer(res);
    yield put(signUpSuccess({ token }));
  } catch (err) {
    const args = { err, form, action: signUpFailure };
    yield call(handleError, args);
  }
}

/**
 * Fetch authenticate token
 *
 * @param params
 * @return {*}
 */
function* authenticate(params) {
  const form = 'login';
  const credentials = prop('payload', params);
  yield put(loginRequest());
  try {
    const res = yield call(Http.post, 'users/oauth/login', credentials);
    const token = cropBearer(res);
    yield put(loginSuccess({ token }));
  } catch (err) {
    const args = { err, form, action: loginFailure };
    yield call(handleError, args);
  }
}

/**
 * Forgot authenticate token
 *
 * @return {*}
 */
function* exit() {
  yield put(logoutRequest());
  try {
    yield call(Http.delete, 'users/oauth/logout');
    yield put(logoutSuccess());
  } catch (err) {
    const message = path(['message'], err);
    const status = path(['response', 'status'], err);
    yield put(logoutFailure({ message, status }));
  }
}

/**
 * Restore password
 *
 * @param params
 * @return {*}
 */
function* reset(params) {
  const form = 'reset';
  const credentials = prop('payload', params);
  yield put(resetRequest());
  try {
    yield call(Http.post, 'users/oauth/restore', credentials);
    yield put(resetSuccess());
  } catch (err) {
    const args = { err, form, action: resetFailure };
    yield call(handleError, args);
  }
}

export default function* watchAuth() {
  yield takeLatest(AUTH_SIGN_UP, register);
  yield takeLatest(AUTH_LOGIN, authenticate);
  yield takeLatest(AUTH_LOGOUT, exit);
  yield takeLatest(AUTH_RESET, reset);
}
