"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
exports.changeListParams = (resource, params) => ({
    type: exports.CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource },
});
exports.SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
exports.setListSelectedIds = (resource, ids) => ({
    type: exports.SET_LIST_SELECTED_IDS,
    payload: ids,
    meta: { resource },
});
exports.TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';
exports.toggleListItem = (resource, id) => ({
    type: exports.TOGGLE_LIST_ITEM,
    payload: id,
    meta: { resource },
});
