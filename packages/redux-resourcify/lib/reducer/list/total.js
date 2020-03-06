"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataActions_1 = require("../../actions/dataActions");
const actions_1 = require("../../actions");
const totalReducer = (previousState = 0, action) => {
    if (action.type === dataActions_1.CRUD_GET_ONE_SUCCESS) {
        return previousState === 0 ? 1 : previousState;
    }
    if (action.type === dataActions_1.CRUD_GET_LIST_SUCCESS) {
        return action.payload.total;
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === actions_1.DELETE) {
            return previousState - 1;
        }
        if (action.meta.fetch === actions_1.DELETE_MANY) {
            // @ts-ignore
            return previousState - action.payload.ids.length;
        }
    }
    return previousState;
};
exports.default = totalReducer;
