import {TypedDataDomain} from 'ethers';
import {TypedDataDomain as TypedDataDomainV5} from '@ethersproject/abstract-signer';
import {compatNull} from './compatNull';
import {compatNumber} from './compatNumber';

export const compatTypedDataDomain = (
  domain: TypedDataDomain
): TypedDataDomainV5 => {
  return {
    name: compatNull(domain.name),
    version: compatNull(domain.version),
    chainId: compatNumber(compatNull(domain.chainId)),
    verifyingContract: compatNull(domain.verifyingContract),
    salt: compatNull(domain.salt),
  };
};
