export type ConditionalQuery<
  T extends object,
  K extends keyof T,
> = Partial<T> & {
  limit?: number;
  start?: number;
  orderBy?: Partial<{ [key in K]: 'asc' | 'desc' }>[];
};
