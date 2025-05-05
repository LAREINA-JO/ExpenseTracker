type TupleToObject<T extends readonly any[]> = {
  readonly [P in T[number]]: P;
};

export const mirrorTupleToObj = <T extends readonly any[]>(
  arr: T,
): TupleToObject<T> => {
  return arr.reduce((prev, curr) => {
    if (!(curr in prev)) {
      prev[curr] = curr;
    }
    return prev;
  }, {});
};

type ReversedKeyValueObj<T extends Record<keyof T, any>> = {
  [P in T[keyof T]]: {
    [K in keyof T]: T[K] extends P ? K : never;
  }[keyof T];
};

/**
 *
 * @param obj passed in obj should be a const, otherwise cannot get intellisense,
 * obj must have uniq values, otherwise may give override value
 * @returns the reversed key value pair
 */
export const mirrorReverseKeyValue = <T extends Record<keyof T, any>>(
  obj: T,
): ReversedKeyValueObj<T> => {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[value] = key;
    }
  }

  return result;
};
