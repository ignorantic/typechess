import {
  call,
  delay,
  put,
  select,
} from 'redux-saga/effects';
import { path, prop, propOr } from 'ramda';
import { logout } from '../auth';

/**
 * Handle caught form error
 *
 * @param {Object} params
 * @param {string} params.message
 * @param {string} params.id
 * @return {*}
 */
export function* showError(params) {
  const { message, id } = params;

  // Hide toast with received id.
  if (id) {
    // eslint-disable-next-line no-console
    yield call(console.error, id);
    yield delay(500);
  }

  // Show new toast and return its id
  // eslint-disable-next-line no-console
  const newId = yield call(console.error, String(message));
  return yield newId;
}

/**
 * Handle caught form error
 *
 * @param {Object} params
 * @param {Object} params.err
 * @param {?string} params.form
 * @param {?function} params.failureAction
 * @param {?function} params.selectError
 * @return {*}
 */
export function* handleError(params) {
  const {
    err,
    form = null,
    failureAction,
    selectError,
  } = params;

  // Prepare messages.
  const message = prop('message', err);
  const status = path(['response', 'status'], err);
  const responseMessage = path(['response', 'data', 'message'], err) || message;

  // Get id of current toast with previous error message.
  const error = selectError ? yield select(selectError) : null;
  const toastId = propOr(null, 'toastId', error);

  // Show new error message.
  const id = yield call(showError, { message: responseMessage, id: toastId });

  if (failureAction) {
    yield put(failureAction({ message, status, toastId: id }));
  }

  if (status === 401) {
    yield put(logout());
  }

  // Stop submit form
  if (form) {
    const responseErrors = path(['response', 'data', 'errors'], err);
    const errors = status === 422 ? responseErrors : { message, responseMessage };
  }
}
