import { Identifier, Record } from '../../types';
import { UPDATE } from '../dataFetchActions';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';

export const crudUpdate = (
    resource: string,
    id: Identifier,
    data: any,
    previousData: any,
    basePath: string,
): CrudUpdateAction => ({
    type: CRUD_UPDATE,
    payload: { id, data, previousData },
    meta: {
        resource,
        fetch: UPDATE,
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

interface RequestPayload {
    id: Identifier;
    data: any;
    previousData?: any;
}

export const CRUD_UPDATE = 'RA/CRUD_UPDATE';
export interface CrudUpdateAction {
    readonly type: typeof CRUD_UPDATE;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof UPDATE;
        onSuccess: {
            basePath: string;
        };
        onFailure: {
            //
        };
    };
}

export const CRUD_UPDATE_LOADING = 'RA/CRUD_UPDATE_LOADING';
export interface CrudUpdateLoadingAction {
    readonly type: typeof CRUD_UPDATE_LOADING;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
    };
}

export const CRUD_UPDATE_FAILURE = 'RA/CRUD_UPDATE_FAILURE';
export interface CrudUpdateFailureAction {
    readonly type: typeof CRUD_UPDATE_FAILURE;
    readonly error: string | object;
    readonly payload: string;
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        fetchResponse: typeof UPDATE;
        fetchStatus: typeof FETCH_ERROR;
    };
}

export const CRUD_UPDATE_SUCCESS = 'RA/CRUD_UPDATE_SUCCESS';
export interface CrudUpdateSuccessAction {
    readonly type: typeof CRUD_UPDATE_SUCCESS;
    readonly payload: {
        data: Record;
    };
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        basePath: string;
        fetchResponse: typeof UPDATE;
        fetchStatus: typeof FETCH_END;
    };
}
