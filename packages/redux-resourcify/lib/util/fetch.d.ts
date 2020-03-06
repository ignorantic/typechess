import { stringify } from 'query-string';
export interface Options extends RequestInit {
    user?: {
        authenticated?: boolean;
        token?: string;
    };
}
export declare const createHeadersFromOptions: (options: Options) => Headers;
export declare const fetchJson: (url: string, options?: Options) => Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>;
export declare const queryParameters: typeof stringify;
export declare function flattenObject<T, P>(value: T, path?: Array<string>): T | {};
