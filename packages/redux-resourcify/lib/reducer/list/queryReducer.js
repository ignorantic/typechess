"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_SORT = 'SET_SORT';
exports.SORT_ASC = 'ASC';
exports.SORT_DESC = 'DESC';
exports.SET_PAGE = 'SET_PAGE';
exports.SET_PER_PAGE = 'SET_PER_PAGE';
exports.SET_FILTER = 'SET_FILTER';
// @ts-ignore
const oppositeOrder = direction => direction === exports.SORT_DESC ? exports.SORT_ASC : exports.SORT_DESC;
/**
 * This reducer is for the react-router query string, NOT for redux.
 */
// @ts-ignore
const queryReducer = (previousState, { type, payload }) => {
    switch (type) {
        case exports.SET_SORT:
            // @ts-ignore
            if (payload.sort === previousState.sort) {
                return {
                    ...previousState,
                    // @ts-ignore
                    order: oppositeOrder(previousState.order),
                    page: 1,
                };
            }
            return {
                ...previousState,
                sort: payload.sort,
                order: payload.order || exports.SORT_ASC,
                page: 1,
            };
        case exports.SET_PAGE:
            return { ...previousState, page: payload };
        case exports.SET_PER_PAGE:
            return { ...previousState, page: 1, perPage: payload };
        case exports.SET_FILTER: {
            return { ...previousState, page: 1, filter: payload };
        }
        default:
            return previousState;
    }
};
exports.default = queryReducer;
