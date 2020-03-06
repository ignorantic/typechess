declare class HttpError extends Error {
    readonly message: string;
    readonly status: number;
    readonly body: null;
    constructor(message: string, status: number, body?: null);
}
export default HttpError;
