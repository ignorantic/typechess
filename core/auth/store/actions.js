/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import {
  AUTH_CHECK,
  AUTH_AUTHORIZE,
  AUTH_SIGN_UP,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_RESET,
  AUTH_RESET_REQUEST,
  AUTH_RESET_SUCCESS,
  AUTH_RESET_FAILURE,
} from './action-types';

export function authCheck() {
  return {
    type: AUTH_CHECK,
  };
}

export function authorize(payload) {
  return {
    type: AUTH_AUTHORIZE,
    payload,
  };
}

export function signUp(payload) {
  return {
    type: AUTH_SIGN_UP,
    payload,
  };
}

export function signUpRequest(payload) {
  return {
    type: AUTH_SIGN_UP_REQUEST,
    payload,
  };
}

export function signUpSuccess(payload) {
  return {
    type: AUTH_SIGN_UP_SUCCESS,
    payload,
  };
}

export function signUpFailure(payload) {
  return {
    type: AUTH_SIGN_UP_FAILURE,
    payload,
  };
}

export function login(payload) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function loginRequest(payload) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload,
  };
}

export function logout(payload) {
  return {
    type: AUTH_LOGOUT,
    payload,
  };
}

export function logoutRequest(payload) {
  return {
    type: AUTH_LOGOUT_REQUEST,
    payload,
  };
}

export function logoutSuccess(payload) {
  return {
    type: AUTH_LOGOUT_SUCCESS,
    payload,
  };
}

export function logoutFailure(payload) {
  return {
    type: AUTH_LOGOUT_FAILURE,
    payload,
  };
}

export function reset(payload) {
  return {
    type: AUTH_RESET,
    payload,
  };
}

export function resetRequest(payload) {
  return {
    type: AUTH_RESET_REQUEST,
    payload,
  };
}

export function resetSuccess(payload) {
  return {
    type: AUTH_RESET_SUCCESS,
    payload,
  };
}

export function resetFailure(payload) {
  return {
    type: AUTH_RESET_FAILURE,
    payload,
  };
}
