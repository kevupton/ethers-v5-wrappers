import {AddressLike} from 'ethers';

export const compatAddress = (
  address: AddressLike | undefined
): string | Promise<string> | undefined => {
  if (address && typeof address === 'object' && 'getAddress' in address) {
    return address.getAddress();
  }
  return address;
};
