"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const actions_1 = require("../actions");
const getFetchedAt_1 = __importDefault(require("../util/getFetchedAt"));
/**
 * Make the fetchedAt property non enumerable
 */
exports.hideFetchedAt = (records) => {
    Object.defineProperty(records, 'fetchedAt', {
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return records;
};
/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
exports.addRecordsAndRemoveOutdated = (newRecords = [], oldRecords) => {
    const newRecordsById = {};
    // @ts-ignore
    newRecords.forEach((record) => (newRecordsById[record.id] = record));
    const newFetchedAt = getFetchedAt_1.default(newRecords.map(({ id }) => id), oldRecords.fetchedAt);
    const records = { fetchedAt: newFetchedAt };
    Object.keys(newFetchedAt).forEach((id) => 
    // @ts-ignore
    (records[id] = newRecordsById[id]
        // @ts-ignore
        ? isEqual_1.default(newRecordsById[id], oldRecords[id])
            ? oldRecords[id] // do not change the record to avoid a redraw
            // @ts-ignore
            : newRecordsById[id]
        : oldRecords[id]));
    return exports.hideFetchedAt(records);
};
/**
 * Add new records to the pool, without touching the other ones.
 */
exports.addRecords = (newRecords = [], oldRecords) => {
    const newRecordsById = { ...oldRecords };
    newRecords.forEach((record) => {
        newRecordsById[record.id] = isEqual_1.default(record, oldRecords[record.id])
            ? oldRecords[record.id]
            : record;
    });
    const updatedFetchedAt = getFetchedAt_1.default(newRecords.map(({ id }) => id), oldRecords.fetchedAt);
    Object.defineProperty(newRecordsById, 'fetchedAt', {
        value: { ...oldRecords.fetchedAt, ...updatedFetchedAt },
        enumerable: false,
    });
    return newRecordsById;
};
exports.addOneRecord = (newRecord, oldRecords, date = new Date()) => {
    const newRecordsById = {
        ...oldRecords,
        [newRecord.id]: isEqual_1.default(newRecord, oldRecords[newRecord.id])
            ? oldRecords[newRecord.id] // do not change the record to avoid a redraw
            : newRecord,
    };
    return Object.defineProperty(newRecordsById, 'fetchedAt', {
        value: { ...oldRecords.fetchedAt, [newRecord.id]: date },
        enumerable: false,
    });
};
/**
 * Remove records from the pool
 */
const removeRecords = (removedRecordIds = [], oldRecords) => {
    const records = Object.entries(oldRecords)
        .filter(([key]) => !removedRecordIds.includes(key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {
        fetchedAt: {},
    });
    records.fetchedAt = Object.entries(oldRecords.fetchedAt)
        .filter(([key]) => !removedRecordIds.includes(key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
    return exports.hideFetchedAt(records);
};
const initialState = exports.hideFetchedAt({ fetchedAt: {} });
const dataReducer = (previousState = initialState, { payload, meta }) => {
    if (meta && meta.optimistic) {
        if (meta.fetch === actions_1.UPDATE) {
            const updatedRecord = {
                ...previousState[payload.id],
                ...payload.data,
            };
            return exports.addOneRecord(updatedRecord, previousState);
        }
        if (meta.fetch === actions_1.UPDATE_MANY) {
            // @ts-ignore
            const updatedRecords = payload.ids.map((id) => ({
                ...previousState[id],
                ...payload.data,
            }));
            return exports.addRecordsAndRemoveOutdated(updatedRecords, previousState);
        }
        if (meta.fetch === actions_1.DELETE) {
            return removeRecords([payload.id], previousState);
        }
        if (meta.fetch === actions_1.DELETE_MANY) {
            return removeRecords(payload.ids, previousState);
        }
    }
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== actions_1.FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case actions_1.GET_LIST:
            return exports.addRecordsAndRemoveOutdated(payload.data, previousState);
        case actions_1.GET_MANY:
        case actions_1.GET_MANY_REFERENCE:
            return exports.addRecords(payload.data, previousState);
        case actions_1.UPDATE:
        case actions_1.CREATE:
        case actions_1.GET_ONE:
            return exports.addOneRecord(payload.data, previousState);
        default:
            return previousState;
    }
};
// @ts-ignore
exports.getRecord = (state, id) => state[id];
exports.default = dataReducer;
