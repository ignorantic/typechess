"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudUpdate = (resource, id, data, previousData, basePath) => ({
    type: exports.CRUD_UPDATE,
    payload: { id, data, previousData },
    meta: {
        resource,
        fetch: dataFetchActions_1.UPDATE,
        onSuccess: {
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
exports.CRUD_UPDATE = 'RA/CRUD_UPDATE';
exports.CRUD_UPDATE_LOADING = 'RA/CRUD_UPDATE_LOADING';
exports.CRUD_UPDATE_FAILURE = 'RA/CRUD_UPDATE_FAILURE';
exports.CRUD_UPDATE_SUCCESS = 'RA/CRUD_UPDATE_SUCCESS';
