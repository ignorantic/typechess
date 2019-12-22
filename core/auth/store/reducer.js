// import libs
import Cookies from 'js-cookie';
import { createSelector } from 'reselect';
import { identity, path } from 'ramda';
import { setAuthToken } from '../../http/Http';
import {
  AUTH_CHECK,
  AUTH_AUTHORIZE,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_RESET_REQUEST,
  AUTH_RESET_SUCCESS,
  AUTH_RESET_FAILURE,
} from './action-types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

function request(state) {
  return {
    ...state,
    loading: true,
  };
}

function signUpSuccess(state, payload) {
  const { token } = payload;
  Cookies.set('token', token, { expires: 7 });
  setAuthToken(token);

  return {
    ...state,
    isAuthenticated: true,
    loading: false,
    error: null,
  };
}

function loginSuccess(state, payload) {
  const { token } = payload;
  Cookies.set('token', token, { expires: 1 });
  setAuthToken(token);

  return {
    ...state,
    isAuthenticated: true,
    loading: false,
    error: null,
  };
}

function logoutSuccess() {
  Cookies.remove('token');

  return initialState;
}

function resetSuccess(state) {
  return {
    ...state, ...initialState,
  };
}

function failure(state, payload) {
  Cookies.remove('token');

  return {
    ...state,
    loading: false,
    isAuthenticated: false,
    error: payload,
  };
}

function check(state) {
  const token = Cookies.get('token');
  const isAuthenticated = Boolean(token);
  const newState = { ...state, isAuthenticated };

  if (newState.isAuthenticated) {
    setAuthToken(token);
  }

  return newState;
}

function authorize(state, payload) {
  return {
    ...state, ...payload,
  };
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTH_SIGN_UP_REQUEST:
    case AUTH_LOGIN_REQUEST:
    case AUTH_LOGOUT_REQUEST:
    case AUTH_RESET_REQUEST:
      return request(state);
    case AUTH_SIGN_UP_SUCCESS:
      return signUpSuccess(state, payload);
    case AUTH_LOGIN_SUCCESS:
      return loginSuccess(state, payload);
    case AUTH_LOGOUT_SUCCESS:
      return logoutSuccess();
    case AUTH_RESET_SUCCESS:
      return resetSuccess(state, payload);
    case AUTH_SIGN_UP_FAILURE:
    case AUTH_LOGIN_FAILURE:
    case AUTH_LOGOUT_FAILURE:
    case AUTH_RESET_FAILURE:
      return failure(state);
    case AUTH_CHECK:
      return check(state);
    case AUTH_AUTHORIZE:
      return authorize(state, payload);
    default:
      return state;
  }
};

export default reducer;

export const selectAuth = createSelector(
  path(['auth', 'isAuthenticated']),
  identity(Boolean),
);

export const selectAuthorized = createSelector(
  path(['auth', 'isAuthorized']),
  identity(Boolean),
);

export const selectCompanyAdmin = createSelector(
  path(['auth', 'isCompanyAdmin']),
  identity(Boolean),
);

export const selectAuthLoading = createSelector(
  path(['auth', 'loading']),
  identity(Boolean),
);

export const selectAuthError = createSelector(
  path(['auth', 'error']),
  identity,
);
