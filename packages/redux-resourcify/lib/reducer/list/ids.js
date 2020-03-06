"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniq_1 = __importDefault(require("lodash/uniq"));
const actions_1 = require("../../actions");
const actions_2 = require("../../actions");
// @ts-ignore
const idsReducer = (previousState = [], action) => {
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === actions_2.DELETE) {
            const index = previousState
                .map(el => el === action.payload.id) // eslint-disable-line eqeqeq
                .indexOf(true);
            if (index === -1) {
                return previousState;
            }
            return [
                ...previousState.slice(0, index),
                ...previousState.slice(index + 1),
            ];
        }
        if (action.meta.fetch === actions_2.DELETE_MANY) {
            const newState = previousState.filter(el => !action.payload.ids.includes(el));
            return newState;
        }
    }
    switch (action.type) {
        case actions_1.CRUD_GET_LIST_SUCCESS:
            return action.payload.data.map(({ id }) => id);
        case actions_1.CRUD_CREATE_SUCCESS:
            return uniq_1.default([action.payload.data.id, ...previousState]);
        default:
            return previousState;
    }
};
exports.default = idsReducer;
// @ts-ignore
exports.getIds = state => state;
