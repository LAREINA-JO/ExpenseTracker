export default class HttpError<T> extends Error {
  constructor(
    public errData: T,
    public httpStatusCode = 500,
    public errCode: string = '-1',
  ) {
    super(JSON.stringify(errData));

    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace !== undefined) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
