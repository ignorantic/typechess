import { Identifier, Record } from '../../types';
import { DELETE_MANY } from '../dataFetchActions';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
export declare const crudDeleteMany: (resource: string, ids: (string | number)[], basePath: string) => CrudDeleteManyAction;
interface RequestPayload {
    ids: Identifier[];
}
export declare const CRUD_DELETE_MANY = "RA/CRUD_DELETE_MANY";
export interface CrudDeleteManyAction {
    readonly type: typeof CRUD_DELETE_MANY;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof DELETE_MANY;
        onSuccess: {
            basePath: string;
            unselectAll: boolean;
        };
        onFailure: {};
    };
}
export declare const CRUD_DELETE_MANY_LOADING = "RA/CRUD_DELETE_MANY_LOADING";
export interface CrudDeleteManyLoadingAction {
    readonly type: typeof CRUD_DELETE_MANY_LOADING;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
    };
}
export declare const CRUD_DELETE_MANY_FAILURE = "RA/CRUD_DELETE_MANY_FAILURE";
export interface CrudDeleteMAnyFailureAction {
    readonly type: typeof CRUD_DELETE_MANY_FAILURE;
    readonly error: string | object;
    readonly payload: string;
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        fetchResponse: typeof DELETE_MANY;
        fetchStatus: typeof FETCH_ERROR;
    };
}
export declare const CRUD_DELETE_MANY_SUCCESS = "RA/CRUD_DELETE_MANY_SUCCESS";
export interface CrudDeleteManySuccessAction {
    readonly type: typeof CRUD_DELETE_MANY_SUCCESS;
    readonly payload: {
        data: Record[];
    };
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        basePath: string;
        unselectAll: boolean;
        fetchResponse: typeof DELETE_MANY;
        fetchStatus: typeof FETCH_END;
    };
}
export {};
