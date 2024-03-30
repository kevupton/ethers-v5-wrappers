import {TransactionRequest} from 'ethers';
import type {TransactionRequest as V5TransactionRequest} from '@ethersproject/abstract-provider';
import {compatAddress} from './compatAddress';
import {compatNull} from './compatNull';
import {compatNumber} from './compatNumber';
import {compatBigInt} from './compatBigInt';
import {Deferrable} from 'ethers-v5/lib/utils';

export const compatTransactionRequest = ({
  to,
  from,
  nonce,
  gasLimit,
  gasPrice,
  data,
  value,
  chainId,
  type,
  accessList,
  maxPriorityFeePerGas,
  maxFeePerGas,
  blockTag,
  ...tx
}: TransactionRequest): Deferrable<V5TransactionRequest> => {
  return {
    to: compatAddress(compatNull(to)),
    from: compatAddress(compatNull(from)),
    nonce: compatNull(nonce),
    gasLimit: compatNull(gasLimit),
    gasPrice: compatNull(gasPrice),
    data: compatNull(data),
    value: compatNull(value),
    chainId: compatNull(compatNumber(chainId)),
    type: compatNull(type),
    accessList: compatNull(accessList),
    maxPriorityFeePerGas: compatBigInt(compatNull(maxPriorityFeePerGas)),
    maxFeePerGas: compatBigInt(compatNull(maxFeePerGas)),
    ...tx,
  };
};
