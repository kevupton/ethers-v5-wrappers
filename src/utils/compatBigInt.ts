import {BigNumberish} from 'ethers';
import {ethers as v5} from 'ethers-v5';

export const compatBigInt = (
  value: BigNumberish | undefined
): v5.BigNumberish | undefined => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};
