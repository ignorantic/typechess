"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudUpdateMany = (resource, ids, data, basePath) => ({
    type: exports.CRUD_UPDATE_MANY,
    payload: { ids, data },
    meta: {
        resource,
        fetch: dataFetchActions_1.UPDATE_MANY,
        onSuccess: {
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
exports.CRUD_UPDATE_MANY = 'RA/CRUD_UPDATE_MANY';
exports.CRUD_UPDATE_MANY_LOADING = 'RA/CRUD_UPDATE_MANY_LOADING';
exports.CRUD_UPDATE_MANY_FAILURE = 'RA/CRUD_UPDATE_MANY_FAILURE';
exports.CRUD_UPDATE_MANY_SUCCESS = 'RA/CRUD_UPDATE_MANY_SUCCESS';
