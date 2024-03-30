import type {TransactionLike} from 'ethers';
import {
  AbstractSigner,
  assertArgument,
  copyRequest,
  resolveAddress,
  resolveProperties,
  TransactionRequest,
} from 'ethers';

export async function populate(
  signer: AbstractSigner,
  tx: TransactionRequest
): Promise<TransactionLike<string>> {
  const pop: any = copyRequest(tx);

  // eslint-disable-next-line eqeqeq
  if (pop.to != null) {
    pop.to = resolveAddress(pop.to, signer);
  }

  // eslint-disable-next-line eqeqeq
  if (pop.from != null) {
    const from = pop.from;
    pop.from = Promise.all([
      signer.getAddress(),
      resolveAddress(from, signer),
    ]).then(([address, from]) => {
      assertArgument(
        address.toLowerCase() === from.toLowerCase(),
        'transaction from mismatch',
        'tx.from',
        from
      );
      return address;
    });
  } else {
    pop.from = signer.getAddress();
  }

  return await resolveProperties(pop);
}
