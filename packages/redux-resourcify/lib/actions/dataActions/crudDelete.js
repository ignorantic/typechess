"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudDelete = (resource, id, previousData, basePath) => ({
    type: exports.CRUD_DELETE,
    payload: { id, previousData },
    meta: {
        resource,
        fetch: dataFetchActions_1.DELETE,
        onSuccess: {
            //
            basePath,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});
exports.CRUD_DELETE = 'RA/CRUD_DELETE';
exports.CRUD_DELETE_LOADING = 'RA/CRUD_DELETE_LOADING';
exports.CRUD_DELETE_FAILURE = 'RA/CRUD_DELETE_FAILURE';
exports.CRUD_DELETE_SUCCESS = 'RA/CRUD_DELETE_SUCCESS';
