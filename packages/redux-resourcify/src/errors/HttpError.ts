class HttpError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
    public readonly body = null,
  ) {
    super(message);
    this.name = this.constructor.name;
    // @ts-ignore
    if (typeof Error.captureStackTrace === 'function') {
      // @ts-ignore
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    this.stack = new Error().stack;
  }
}

export default HttpError;
