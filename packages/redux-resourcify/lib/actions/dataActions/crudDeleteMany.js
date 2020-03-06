"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudDeleteMany = (resource, ids, basePath) => ({
    type: exports.CRUD_DELETE_MANY,
    payload: { ids },
    meta: {
        resource,
        fetch: dataFetchActions_1.DELETE_MANY,
        onSuccess: {
            //
            basePath,
            unselectAll: true,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});
exports.CRUD_DELETE_MANY = 'RA/CRUD_DELETE_MANY';
exports.CRUD_DELETE_MANY_LOADING = 'RA/CRUD_DELETE_MANY_LOADING';
exports.CRUD_DELETE_MANY_FAILURE = 'RA/CRUD_DELETE_MANY_FAILURE';
exports.CRUD_DELETE_MANY_SUCCESS = 'RA/CRUD_DELETE_MANY_SUCCESS';
