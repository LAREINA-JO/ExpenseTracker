const omit = <T, U extends keyof T>(obj: T, arr: U[]) => {
  const newObj = { ...obj };
  for (const key of arr) {
    delete newObj[key];
  }

  return newObj as Omit<T, U>;
};

export default omit;
