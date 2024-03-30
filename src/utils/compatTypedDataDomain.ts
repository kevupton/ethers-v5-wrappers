import {TypedDataDomain} from 'ethers';
import {ethers as v5} from 'ethers-v5';
import {compatNull} from './compatNull';
import {compatNumber} from './compatNumber';

export const compatTypedDataDomain = (
  domain: TypedDataDomain
): v5.TypedDataDomain => {
  return {
    name: compatNull(domain.name),
    version: compatNull(domain.version),
    chainId: compatNumber(compatNull(domain.chainId)),
    verifyingContract: compatNull(domain.verifyingContract),
    salt: compatNull(domain.salt),
  };
};
