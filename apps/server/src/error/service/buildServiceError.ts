import ServiceError, { ServiceErrorMetadataMapType } from './ServiceError';

const buildServiceError = <U extends ServiceErrorMetadataMapType, T = any>(
  errMetadataMap: U,
) => {
  return class extends ServiceError<T> {
    constructor(
      errorMetadataKey: keyof U,
      public override serviceErrData?: T,
      public override originalError?: unknown,
    ) {
      const errMetadata = errMetadataMap[errorMetadataKey];
      super(errMetadata, serviceErrData, originalError);
    }
  };
};

export default buildServiceError;
