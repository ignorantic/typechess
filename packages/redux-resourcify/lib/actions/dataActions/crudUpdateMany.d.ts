import { Identifier } from '../../types';
import { UPDATE_MANY } from '../dataFetchActions';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
export declare const crudUpdateMany: (resource: string, ids: (string | number)[], data: any, basePath: string) => CrudUpdateManyAction;
interface RequestPayload {
    ids: Identifier[];
    data: any;
}
export declare const CRUD_UPDATE_MANY = "RA/CRUD_UPDATE_MANY";
export interface CrudUpdateManyAction {
    readonly type: typeof CRUD_UPDATE_MANY;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof UPDATE_MANY;
        onSuccess: {
            basePath: string;
            unselectAll: boolean;
        };
        onFailure: {};
    };
}
export declare const CRUD_UPDATE_MANY_LOADING = "RA/CRUD_UPDATE_MANY_LOADING";
export interface CrudUpdateManyLoadingAction {
    readonly type: typeof CRUD_UPDATE_MANY_LOADING;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
    };
}
export declare const CRUD_UPDATE_MANY_FAILURE = "RA/CRUD_UPDATE_MANY_FAILURE";
export interface CrudUpdateManyFailureAction {
    readonly type: typeof CRUD_UPDATE_MANY_FAILURE;
    readonly error: string | object;
    readonly payload: string;
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        fetchResponse: typeof UPDATE_MANY;
        fetchStatus: typeof FETCH_ERROR;
    };
}
export declare const CRUD_UPDATE_MANY_SUCCESS = "RA/CRUD_UPDATE_MANY_SUCCESS";
export interface CrudUpdateManySuccessAction {
    readonly type: typeof CRUD_UPDATE_MANY_SUCCESS;
    readonly payload: {
        data: Identifier[];
    };
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        basePath: string;
        unselectAll: boolean;
        fetchResponse: typeof UPDATE_MANY;
        fetchStatus: typeof FETCH_END;
    };
}
export {};
