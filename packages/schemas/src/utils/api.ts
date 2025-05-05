import z from 'zod';

type DefaultSerializedType =
  | string
  | number
  | boolean
  | null
  | undefined
  | DefaultSerializedType[]
  | { [key: string]: DefaultSerializedType };

export type SerializedType<T> = T extends DefaultSerializedType
  ? T
  : T extends Date
    ? string
    : T extends Record<string, any>
      ? {
          [key in keyof T]: SerializedType<T[key]>;
        }
      : never;

export const apiErrorSchema = z
  .object({
    errCode: z.number(),
    error: z.string(),
    statusCode: z.number(),
  })
  .strict();

export type APIError<T> = {
  errCode: string;
  error: T;
};

export function isAPIError<T>(err: unknown): err is APIError<T> {
  return (
    typeof err === 'object' &&
    err !== null &&
    'errCode' in err &&
    'error' in err
  );
}

export type APIReqBody<T extends z.Schema> = z.infer<T>;
export type APIReqQuery<T extends z.Schema> = APIReqBody<T>;
export type APIResBody<T extends z.Schema> = SerializedType<z.infer<T>>;
