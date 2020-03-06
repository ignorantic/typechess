"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudGetAll = (resource, sort, filter, maxResults) => ({
    type: exports.CRUD_GET_ALL,
    payload: { sort, filter, pagination: { page: 1, perPage: maxResults } },
    meta: {
        resource,
        fetch: dataFetchActions_1.GET_LIST,
        onSuccess: {
        //
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});
exports.CRUD_GET_ALL = 'RA/CRUD_GET_ALL';
exports.CRUD_GET_ALL_LOADING = 'RA/CRUD_GET_ALL_LOADING';
exports.CRUD_GET_ALL_FAILURE = 'RA/CRUD_GET_ALL_FAILURE';
exports.CRUD_GET_ALL_SUCCESS = 'RA/CRUD_GET_ALL_SUCCESS';
