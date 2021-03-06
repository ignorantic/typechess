"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudGetList = (resource, pagination, sort, filter = {}) => ({
    type: exports.CRUD_GET_LIST,
    payload: { pagination, sort, filter },
    meta: {
        resource,
        fetch: dataFetchActions_1.GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});
exports.CRUD_GET_LIST = 'RA/CRUD_GET_LIST';
exports.CRUD_GET_LIST_LOADING = 'RA/CRUD_GET_LIST_LOADING';
exports.CRUD_GET_LIST_FAILURE = 'RA/CRUD_GET_LIST_FAILURE';
exports.CRUD_GET_LIST_SUCCESS = 'RA/CRUD_GET_LIST_SUCCESS';
