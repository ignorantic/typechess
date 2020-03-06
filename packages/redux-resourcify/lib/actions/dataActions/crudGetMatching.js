"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetchActions_1 = require("../dataFetchActions");
exports.crudGetMatching = (reference, relatedTo, pagination, sort, filter) => ({
    type: exports.CRUD_GET_MATCHING,
    payload: { pagination, sort, filter },
    meta: {
        resource: reference,
        relatedTo,
        fetch: dataFetchActions_1.GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});
exports.CRUD_GET_MATCHING = 'RA/CRUD_GET_MATCHING';
exports.CRUD_GET_MATCHING_LOADING = 'RA/CRUD_GET_MATCHING_LOADING';
exports.CRUD_GET_MATCHING_FAILURE = 'RA/CRUD_GET_MATCHING_FAILURE';
exports.CRUD_GET_MATCHING_SUCCESS = 'RA/CRUD_GET_MATCHING_SUCCESS';
