"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudGetOne = (resource, id, basePath) => ({
    type: exports.CRUD_GET_ONE,
    payload: { id },
    meta: {
        resource,
        fetch: dataFetchActions_1.GET_ONE,
        basePath,
        onFailure: {
            notification: {
                body: 'ra.notification.item_doesnt_exist',
                level: 'warning',
            },
            redirectTo: 'list',
        },
    },
});
exports.CRUD_GET_ONE = 'RA/CRUD_GET_ONE';
exports.CRUD_GET_ONE_LOADING = 'RA/CRUD_GET_ONE_LOADING';
exports.CRUD_GET_ONE_FAILURE = 'RA/CRUD_GET_ONE_FAILURE';
exports.CRUD_GET_ONE_SUCCESS = 'RA/CRUD_GET_ONE_SUCCESS';
