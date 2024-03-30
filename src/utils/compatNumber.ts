export const compatNumber = <T>(
  value: string | number | bigint | T
): T | number => {
  if (typeof value === 'string') {
    return +value;
  }
  if (typeof value === 'bigint') {
    return +value.toString();
  }
  return value;
};
