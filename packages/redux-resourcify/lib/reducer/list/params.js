"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../actions");
const defaultState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {},
};
// @ts-ignore
const paramsReducer = (
// @ts-ignore
previousState = defaultState, action) => {
    switch (action.type) {
        case actions_1.CRUD_CHANGE_LIST_PARAMS:
            return action.payload;
        default:
            return previousState;
    }
};
exports.default = paramsReducer;
