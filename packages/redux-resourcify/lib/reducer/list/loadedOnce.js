"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataActions_1 = require("../../actions/dataActions");
/**
 * This resource reducer is false until the list loads successfully
 */
const loadedOnce = (previousState = false, { type }) => {
    // early return
    if (previousState === true) {
        return previousState;
    }
    if (type === dataActions_1.CRUD_GET_LIST_SUCCESS) {
        return true;
    }
    return previousState;
};
exports.default = loadedOnce;
