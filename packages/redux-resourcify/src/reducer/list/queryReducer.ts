import { Reducer } from 'redux';
import { ListParams } from '../../actions';
export const SET_SORT = 'SET_SORT';
export const SORT_ASC = 'ASC';
export const SORT_DESC = 'DESC';

export const SET_PAGE = 'SET_PAGE';
export const SET_PER_PAGE = 'SET_PER_PAGE';

export const SET_FILTER = 'SET_FILTER';

// @ts-ignore
const oppositeOrder = direction =>
    direction === SORT_DESC ? SORT_ASC : SORT_DESC;

/**
 * This reducer is for the react-router query string, NOT for redux.
 */
// @ts-ignore
const queryReducer: Reducer<ListParams> = (
    previousState,
    { type, payload }
) => {
    switch (type) {
        case SET_SORT:
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
                order: payload.order || SORT_ASC,
                page: 1,
            };

        case SET_PAGE:
            return { ...previousState, page: payload };

        case SET_PER_PAGE:
            return { ...previousState, page: 1, perPage: payload };

        case SET_FILTER: {
            return { ...previousState, page: 1, filter: payload };
        }

        default:
            return previousState;
    }
};

export default queryReducer;
