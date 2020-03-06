import { Record } from '../../types';
import { CREATE } from '../dataFetchActions';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
export declare const crudCreate: (resource: string, data: any, basePath: string) => CrudCreateAction;
interface RequestPayload {
    data: any;
}
export declare const CRUD_CREATE = "RA/CRUD_CREATE";
export interface CrudCreateAction {
    readonly type: typeof CRUD_CREATE;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof CREATE;
        onSuccess: {
            basePath: string;
        };
        onFailure: {};
    };
}
export declare const CRUD_CREATE_LOADING = "RA/CRUD_CREATE_LOADING";
export interface CrudCreateLoadingAction {
    readonly type: typeof CRUD_CREATE_LOADING;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
    };
}
export declare const CRUD_CREATE_FAILURE = "RA/CRUD_CREATE_FAILURE";
export interface CrudCreateFailureAction {
    readonly type: typeof CRUD_CREATE_FAILURE;
    readonly error: string | object;
    readonly payload: string;
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        fetchResponse: typeof CREATE;
        fetchStatus: typeof FETCH_ERROR;
    };
}
export declare const CRUD_CREATE_SUCCESS = "RA/CRUD_CREATE_SUCCESS";
export interface CrudCreateSuccessAction {
    readonly type: typeof CRUD_CREATE_SUCCESS;
    readonly payload: {
        data: Record;
    };
    readonly requestPayload: RequestPayload;
    readonly meta: {
        resource: string;
        basePath: string;
        fetchResponse: typeof CREATE;
        fetchStatus: typeof FETCH_END;
    };
}
export {};
