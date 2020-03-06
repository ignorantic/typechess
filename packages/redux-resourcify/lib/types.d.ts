export declare type Identifier = string | number;
export interface Record {
    id: Identifier;
    [key: string]: any;
}
export interface ReduxState {
    admin: {
        resources: {
            [name: string]: {
                data: any;
                list: {
                    params: any;
                    ids: Identifier[];
                    loadedOnce: boolean;
                    selectedIds: Identifier[];
                    total: number;
                };
            };
        };
        references: {
            oneToMany: {
                [relatedTo: string]: {
                    ids: Identifier[];
                    total: number;
                };
            };
        };
        loading: number;
        customQueries: {
            [key: string]: any;
        };
    };
}
export interface Sort {
    field: string;
    order: string;
}
export interface Pagination {
    page: number;
    perPage: number;
}
export declare type DataProvider = {
    getList: (resource: string, params: GetListParams) => Promise<GetListResult>;
    getOne: (resource: string, params: GetOneParams) => Promise<GetOneResult>;
    getMany: (resource: string, params: GetManyParams) => Promise<GetManyResult>;
    getManyReference: (resource: string, params: GetManyReferenceParams) => Promise<GetManyReferenceResult>;
    update: (resource: string, params: UpdateParams) => Promise<UpdateResult>;
    updateMany: (resource: string, params: UpdateManyParams) => Promise<UpdateManyResult>;
    create: (resource: string, params: CreateParams) => Promise<CreateResult>;
    delete: (resource: string, params: DeleteParams) => Promise<DeleteResult>;
    deleteMany: (resource: string, params: DeleteManyParams) => Promise<DeleteManyResult>;
    [key: string]: any;
};
export declare type LegacyDataProvider = (type: string, resource: string, params: any) => Promise<any>;
export interface GetListParams {
    pagination: Pagination;
    sort: Sort;
    filter: any;
}
export interface GetListResult {
    data: Record[];
    total: number;
}
export interface GetOneParams {
    id: Identifier;
}
export interface GetOneResult {
    data: Record;
}
export interface GetManyParams {
    ids: Identifier[];
}
export interface GetManyResult {
    data: Record[];
}
export interface GetManyReferenceParams {
    target: string;
    id: Identifier;
    pagination: Pagination;
    sort: Sort;
    filter: any;
}
export interface GetManyReferenceResult {
    data: Record[];
    total: number;
}
export interface UpdateParams {
    id: Identifier;
    data: any;
    previousData: Record;
}
export interface UpdateResult {
    data: Record;
}
export interface UpdateManyParams {
    ids: Identifier[];
    data: any;
}
export interface UpdateManyResult {
    data?: Identifier[];
}
export interface CreateParams {
    data: any;
}
export interface CreateResult {
    data: Record;
}
export interface DeleteParams {
    id: Identifier;
}
export interface DeleteResult {
    data?: Record;
}
export interface DeleteManyParams {
    ids: Identifier[];
}
export interface DeleteManyResult {
    data?: Identifier[];
}
