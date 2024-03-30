import {Provider, TransactionResponse} from 'ethers';
import type {TransactionResponse as V5TransactionResponse} from '@ethersproject/abstract-provider';
import {formatTransactionResponse} from './format';

export const compatTransactionResponse = (
  response: V5TransactionResponse,
  provider: Provider
): TransactionResponse => {
  return new TransactionResponse(formatTransactionResponse(response), provider);
};
