"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataActions_1 = require("./dataActions");
exports.CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE';
exports.crudGetManyAccumulate = (resource, ids) => ({
    type: exports.CRUD_GET_MANY_ACCUMULATE,
    payload: { resource, ids },
    meta: { accumulate: dataActions_1.crudGetMany },
});
exports.CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE';
exports.crudGetMatchingAccumulate = (reference, relatedTo, pagination, sort, filter) => {
    const action = dataActions_1.crudGetMatching(reference, relatedTo, pagination, sort, filter);
    return {
        type: exports.CRUD_GET_MATCHING_ACCUMULATE,
        meta: {
            accumulate: () => action,
            accumulateValues: () => true,
            accumulateKey: JSON.stringify({
                resource: reference,
                relatedTo,
                ...action.payload,
            }),
        },
    };
};
