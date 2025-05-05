import { NonUndefined } from '@/types/helper';

export type ResultType<
  T extends NonUndefined<any>,
  Err extends NonUndefined<any> = unknown,
> =
  | ({
      isError: false;
    } & {
      data: T;
      error?: undefined;
    })
  | ({
      isError: true;
    } & {
      error: Err;
      data?: undefined;
    });

export type ResultPromiseType<T, Err = unknown> = Promise<ResultType<T, Err>>;

export function isResult<T = unknown, Err = unknown>(
  obj: unknown,
): obj is ResultType<T, Err> {
  return typeof obj === 'object' && obj !== null && 'isError' in obj;
}

const Result = {
  success: <T = {}>(data: T): ResultType<T, never> => {
    return { isError: false, data };
  },
  error: <Err = unknown>(error: Err): ResultType<never, Err> => {
    return { isError: true, error };
  },
};

export default Result;
