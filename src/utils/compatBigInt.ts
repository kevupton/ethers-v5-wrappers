import {BigNumberish} from 'ethers';
import {BigNumberish as BigNumberishV5} from '@ethersproject/bignumber';

export const compatBigInt = (
  value: BigNumberish | undefined
): BigNumberishV5 | undefined => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};
