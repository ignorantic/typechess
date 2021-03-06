"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLEAR_STATE = 'RA/CLEAR_STATE';
// The CLEAR_STATE action will completely reset the react-admin redux state to its initial value.
// This should only be called once the user has been redirected to a page which do not use the
// state such as the login page.
exports.clearState = () => ({
    type: exports.CLEAR_STATE,
});
