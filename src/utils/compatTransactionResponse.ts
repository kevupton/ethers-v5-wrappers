import {Provider, TransactionResponse} from 'ethers';
import type {TransactionResponse as V5TransactionResponse} from '@ethersproject/abstract-provider';
import {formatTransactionResponse} from './format';
//
// {
//   hash: string;
//
//   // Only if a transaction has been mined
//   blockNumber?: number,
//     blockHash?: string,
//     timestamp?: number,
//
//     confirmations: number,
//
//   // Not optional (as it is in Transaction)
//   from: string;
//
//   // The raw transaction
//   raw?: string,
//
//     // This function waits until the transaction has been mined
//     wait: (confirmations?: number) => Promise<TransactionReceipt>
// }

export const compatTransactionResponse = (
  response: V5TransactionResponse,
  provider: Provider
): TransactionResponse => {
  return new TransactionResponse(formatTransactionResponse(response), provider);
};
