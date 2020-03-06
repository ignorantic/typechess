"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../actions");
const actions_2 = require("../../actions");
// @ts-ignore
const initialState = [];
// @ts-ignore
const selectedIdsReducer = (
// @ts-ignore
previousState = initialState, action) => {
    if (action.type === actions_1.SET_LIST_SELECTED_IDS) {
        return action.payload;
    }
    if (action.type === actions_1.TOGGLE_LIST_ITEM) {
        const index = previousState.indexOf(action.payload);
        if (index > -1) {
            return [
                ...previousState.slice(0, index),
                ...previousState.slice(index + 1),
            ];
        }
        else {
            return [...previousState, action.payload];
        }
    }
    if (action.type === actions_1.CRUD_DELETE_SUCCESS) {
        const index = previousState.indexOf(action.payload.data.id);
        if (index > -1) {
            return [
                ...previousState.slice(0, index),
                ...previousState.slice(index + 1),
            ];
        }
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === actions_2.DELETE) {
            const index = previousState.indexOf(action.payload.id);
            if (index === -1) {
                return previousState;
            }
            return [
                ...previousState.slice(0, index),
                ...previousState.slice(index + 1),
            ];
        }
        if (action.meta.fetch === actions_2.DELETE_MANY) {
            return previousState.filter(id => !action.payload.ids.includes(id));
        }
    }
    return action.meta && action.meta.unselectAll
        // @ts-ignore
        ? initialState
        : previousState;
};
exports.default = selectedIdsReducer;
