import HttpError from '../http/HttpError';

export type ServiceErrorMetadataType = {
  errCode: string;
  httpStatusCode: number;
  errDataDefault: any;
};

export type ServiceErrorMetadataMapType = {
  [key: string]: ServiceErrorMetadataType;
};

export default abstract class ServiceError<T> extends HttpError<T> {
  constructor(
    serviceErrMetadata: ServiceErrorMetadataType,
    public serviceErrData?: T,
    public originalError?: unknown,
  ) {
    const { errCode, httpStatusCode, errDataDefault } = serviceErrMetadata;

    super(serviceErrData ?? errDataDefault, httpStatusCode, errCode);
  }
}
