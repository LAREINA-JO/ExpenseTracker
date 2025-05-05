declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'test' | 'development' | 'production';
    }
  }

  interface ObjectConstructor {
    keys<T extends Record<string, unknown>>(o: T): UnionToTuple<keyof T>;
  }
}

export type Constructor<T extends new (...args: any) => any> = new (
  ...args: any[]
) => InstanceType<T>;

export type Valueof<T extends Record<keyof T, any>> = T[keyof T];

type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> =
  UnionToIntersection<T extends never ? never : (t: T) => T> extends (
    _: never,
  ) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

export type AllOrNothing<T extends Record<string, any>> =
  | T
  | {
      [key in keyof T]?: undefined;
    };

export type ConvertToNestedKey<T> =
  T extends NonNullable<Record<string, any>>
    ? {
        [K in keyof T]-?: K extends string
          ? NonNullable<T[K]> extends Record<string, any>
            ? `${K}.${ConvertToNestedKey<NonNullable<T[K]>>}`
            : K
          : '';
      }[keyof T]
    : never;

export type OnlyNestedKey<T extends Record<string, any>> = Extract<
  ConvertToNestedKey<T>,
  `${string}.${string}`
>;

export type RequiredOnly<
  T extends Record<string, any>,
  K extends keyof T,
> = Required<Pick<T, K>> & Partial<Omit<T, K>>;
