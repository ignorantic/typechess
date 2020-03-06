"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_LOCALE = 'RA/CHANGE_LOCALE';
exports.changeLocale = (locale) => ({
    type: exports.CHANGE_LOCALE,
    payload: locale,
});
exports.CHANGE_LOCALE_SUCCESS = 'RA/CHANGE_LOCALE_SUCCESS';
exports.changeLocaleSuccess = (locale, messages) => ({
    type: exports.CHANGE_LOCALE_SUCCESS,
    payload: {
        locale,
        messages,
    },
});
exports.CHANGE_LOCALE_FAILURE = 'RA/CHANGE_LOCALE_FAILURE';
exports.changeLocaleFailure = (locale, error) => ({
    type: exports.CHANGE_LOCALE_FAILURE,
    error,
    payload: {
        locale,
    },
});
