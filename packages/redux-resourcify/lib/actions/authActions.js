"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_LOGIN = 'RA/USER_LOGIN';
exports.USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
exports.USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
exports.USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';
exports.userLogin = (payload, pathName) => ({
    type: exports.USER_LOGIN,
    payload,
    meta: { auth: true, pathName },
});
exports.USER_CHECK = 'RA/USER_CHECK';
exports.USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
exports.userCheck = (payload, pathName, routeParams = {}) => ({
    type: exports.USER_CHECK,
    payload: {
        ...payload,
        routeParams,
    },
    meta: { auth: true, pathName },
});
exports.USER_LOGOUT = 'RA/USER_LOGOUT';
/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
exports.userLogout = (redirectTo) => ({
    type: exports.USER_LOGOUT,
    payload: { redirectTo },
    meta: { auth: true },
});
