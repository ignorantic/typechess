"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudCreate = (resource, data, basePath) => ({
    type: exports.CRUD_CREATE,
    payload: { data },
    meta: {
        resource,
        fetch: dataFetchActions_1.CREATE,
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
exports.CRUD_CREATE = 'RA/CRUD_CREATE';
exports.CRUD_CREATE_LOADING = 'RA/CRUD_CREATE_LOADING';
exports.CRUD_CREATE_FAILURE = 'RA/CRUD_CREATE_FAILURE';
exports.CRUD_CREATE_SUCCESS = 'RA/CRUD_CREATE_SUCCESS';
