import HttpError from './HttpError';

export default class AuthError<T> extends HttpError<T> {
  constructor(public override errData: T) {
    super(errData, 401);
  }
}
