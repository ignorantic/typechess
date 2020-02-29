class HttpError extends Error {
    constructor(
        // @ts-ignore
        public readonly message,
        // @ts-ignore
        public readonly status,
        public readonly body = null
    ) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
        this.stack = new Error().stack;
    }
}

export default HttpError;
