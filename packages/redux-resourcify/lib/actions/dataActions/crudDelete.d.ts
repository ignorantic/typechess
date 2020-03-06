import { Identifier, Record } from '../../types';
import { DELETE } from '../dataFetchActions';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
export declare const crudDelete: (resource: string, id: string | number, previousData: Record, basePath: string) => CrudDeleteAction;
interface RequestPayload {
    id: Identifier;
    previousData: Record;
}
export declare const CRUD_DELETE = "RA/CRUD_DELETE";
export interface CrudDeleteAction {
    readonly type: typeof CRUD_DELETE;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof DELETE;
        onSuccess: {
            basePath: string;
        };
        onFailure: {};
    };
}
export declare const CRUD_DELETE_LOADING = "RA/CRUD_DELETE_LOADING";
export interface CrudDeleteLoadingAction {
    readonly type: typeof CRUD_DELETE_LOADING;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
    };
}
export declare const CRUD_DELETE_FAILURE = "RA/CRUD_DELETE_FAILURE";
export interface CrudDeleteFailureAction {
    readonly type: typeof CRUD_DELETE_FAILURE;
    readonly error: string | object;
    readonly payload: string;
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        fetchResponse: typeof CRUD_DELETE;
        fetchStatus: typeof FETCH_ERROR;
    };
}
export declare const CRUD_DELETE_SUCCESS = "RA/CRUD_DELETE_SUCCESS";
export interface CrudDeleteSuccessAction {
    readonly type: typeof CRUD_DELETE_SUCCESS;
    readonly payload: {
        data: Record;
    };
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        basePath: string;
        fetchResponse: typeof CRUD_DELETE;
        fetchStatus: typeof FETCH_END;
    };
}
export {};
