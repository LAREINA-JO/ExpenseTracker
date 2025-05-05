import HttpError from './HttpError';

export default class BadRequestError<T> extends HttpError<T> {
  constructor(public override errData: T) {
    super(errData, 400);
  }
}
