"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const actions_1 = require("../actions");
function validateResponseFormat(
// @ts-ignore
response, 
// @ts-ignore
type, logger = console.error) {
    if (!response.hasOwnProperty('data')) {
        logger(`The response to '${type}' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '${type}'.`);
        throw new Error('ra.notification.data_provider_error');
    }
    if (actions_1.fetchActionsWithArrayOfRecordsResponse.includes(type)
        && !Array.isArray(response.data)) {
        logger(`The response to '${type}' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '${type}'`);
        throw new Error('ra.notification.data_provider_error');
    }
    if (actions_1.fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type)
        && Array.isArray(response.data)
        && response.data.length > 0
        // @ts-ignore
        && response.data.some((d) => !d.hasOwnProperty('id'))) {
        logger(`The response to '${type}' must be like { data : [{ id: 123, ...}, ...] }, but at least one received data item do not have an 'id' key. The dataProvider is probably wrong for '${type}'`);
        throw new Error('ra.notification.data_provider_error');
    }
    if (actions_1.fetchActionsWithRecordResponse.includes(type)
        // eslint-disable-next-line no-prototype-builtins
        && !response.data.hasOwnProperty('id')) {
        logger(`The response to '${type}' must be like { data: { id: 123, ... } }, but the received data does not have an 'id' key. The dataProvider is probably wrong for '${type}'`);
        throw new Error('ra.notification.data_provider_error');
    }
    if (actions_1.fetchActionsWithTotalResponse.includes(type)
        && !response.hasOwnProperty('total')) {
        logger(`The response to '${type}' must be like  { data: [...], total: 123 }, but the received response does not have a 'total' key. The dataProvider is probably wrong for '${type}'`);
        throw new Error('ra.notification.data_provider_error');
    }
}
function* handleFetch(dataProvider, action) {
    const { type, payload, meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta }, } = action;
    const restType = fetchMeta;
    const successSideEffects = onSuccess instanceof Function ? {} : onSuccess;
    const failureSideEffects = onFailure instanceof Function ? {} : onFailure;
    try {
        yield effects_1.all([
            effects_1.put({ type: `${type}_LOADING`, payload, meta }),
            effects_1.put({ type: actions_1.FETCH_START }),
        ]);
        const response = yield effects_1.call(dataProvider[actions_1.sanitizeFetchType(restType)], meta.resource, payload);
        // @ts-ignore
        if (process.env.NODE_ENV !== 'production') {
            validateResponseFormat(response, restType);
        }
        yield effects_1.put({
            type: `${type}_SUCCESS`,
            payload: response,
            requestPayload: payload,
            meta: {
                ...meta,
                ...successSideEffects,
                fetchResponse: restType,
                fetchStatus: actions_1.FETCH_END,
            },
        });
        yield effects_1.put({ type: actions_1.FETCH_END });
    }
    catch (error) {
        yield effects_1.put({
            type: `${type}_FAILURE`,
            error: error.message ? error.message : error,
            payload: error.body ? error.body : null,
            requestPayload: payload,
            meta: {
                ...meta,
                ...failureSideEffects,
                fetchResponse: restType,
                fetchStatus: actions_1.FETCH_ERROR,
            },
        });
        yield effects_1.put({ type: actions_1.FETCH_ERROR, error });
    }
    finally {
        if (yield effects_1.cancelled()) {
            yield effects_1.put({ type: actions_1.FETCH_CANCEL });
        }
    }
}
exports.handleFetch = handleFetch;
// @ts-ignore
exports.takeFetchAction = (action) => action.meta && action.meta.fetch;
const fetchSaga = (dataProvider) => function* watchFetch() {
    yield effects_1.takeEvery(exports.takeFetchAction, handleFetch, dataProvider);
};
exports.default = fetchSaga;
