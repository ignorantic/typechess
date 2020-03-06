"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, status, body = null) {
        super(message);
        this.message = message;
        this.status = status;
        this.body = body;
        this.name = this.constructor.name;
        // @ts-ignore
        if (typeof Error.captureStackTrace === 'function') {
            // @ts-ignore
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = new Error(message).stack;
        }
        this.stack = new Error().stack;
    }
}
exports.default = HttpError;
