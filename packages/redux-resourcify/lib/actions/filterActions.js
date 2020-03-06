"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_SHOW_FILTER = 'RA/CRUD_SHOW_FILTER';
exports.showFilter = (resource, field) => ({
    type: exports.CRUD_SHOW_FILTER,
    payload: { field },
    meta: { resource },
});
exports.CRUD_HIDE_FILTER = 'RA/CRUD_HIDE_FILTER';
exports.hideFilter = (resource, field) => ({
    type: exports.CRUD_HIDE_FILTER,
    payload: { field },
    meta: { resource },
});
exports.CRUD_SET_FILTER = 'RA/CRUD_SET_FILTER';
exports.setFilter = (resource, field, value) => ({
    type: exports.CRUD_SET_FILTER,
    payload: { field, value },
    meta: { resource },
});
