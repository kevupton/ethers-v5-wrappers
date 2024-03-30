export const compatNull = <T>(value: T | null): T | undefined => {
  if (value === null) {
    return undefined;
  }
  return value;
};
