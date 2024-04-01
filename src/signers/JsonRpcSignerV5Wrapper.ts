import type {TransactionLike} from 'ethers';
import {
  assert,
  BlockTag,
  JsonRpcApiProvider,
  JsonRpcSigner,
  type Provider,
  Signer,
  TransactionRequest,
  TransactionResponse,
  TypedDataDomain,
  TypedDataField,
} from 'ethers';
import {JsonRpcSigner as JsonRpcSignerV5} from '@ethersproject/providers';
import {
  compatTransactionRequest,
  compatTransactionResponse,
  compatTypedDataDomain,
  populate,
} from '../utils';
import {JsonRpcProviderV5Wrapper} from '../providers'; // Assuming ethers v6 is the "ethers" package

export class JsonRpcSignerV5Wrapper implements JsonRpcSigner {
  readonly #signer: JsonRpcSignerV5;

  public readonly address: string;
  readonly provider: JsonRpcApiProvider;

  constructor(signer: JsonRpcSignerV5) {
    this.#signer = signer;
    this.address = signer._address;
    this.provider = new JsonRpcProviderV5Wrapper(signer.provider);
  }

  // Example method wrapping
  async getAddress(): Promise<string> {
    // Assuming getAddress exists in both v5 and v6 and has not changed
    return this.#signer.getAddress();
  }

  async call(tx: TransactionRequest): Promise<string> {
    return this.#signer.call(
      compatTransactionRequest(tx),
      tx.blockTag?.toString()
    );
  }

  async estimateGas(tx: TransactionRequest): Promise<bigint> {
    const result = await this.#signer.estimateGas(compatTransactionRequest(tx));
    return BigInt(result.toString());
  }

  getNonce(blockTag: BlockTag | undefined): Promise<number> {
    return this.#signer.getTransactionCount(blockTag?.toString());
  }

  populateCall(tx: TransactionRequest): Promise<TransactionLike<string>> {
    return populate(this, tx);
  }

  resolveName(name: string): Promise<string | null> {
    return this.#signer.provider.resolveName(name);
  }

  signMessage(message: string | Uint8Array): Promise<string> {
    return this.#signer.signMessage(message);
  }

  signTransaction(tx: TransactionRequest): Promise<string> {
    return this.#signer.signTransaction(compatTransactionRequest(tx));
  }

  signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    return this.#signer._signTypedData(
      compatTypedDataDomain(domain),
      types,
      value
    );
  }

  // @ts-ignore
  _legacySignMessage(_message: string | Uint8Array): Promise<string> {
    return this.#signer._legacySignMessage(_message);
  }

  // @ts-ignore
  connect(provider: null | Provider): Signer {
    assert(false, 'cannot reconnect JsonRpcSigner', 'UNSUPPORTED_OPERATION', {
      operation: 'signer.connect',
    });
  }

  populateTransaction(tx: TransactionRequest): Promise<TransactionLike> {
    return this.populateCall(tx);
  }

  async sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
    const response = await this.#signer.sendTransaction(
      compatTransactionRequest(tx)
    );

    return compatTransactionResponse(response, this.provider);
  }

  sendUncheckedTransaction(_tx: TransactionRequest): Promise<string> {
    return this.#signer.sendUncheckedTransaction(compatTransactionRequest(_tx));
  }

  unlock(password: string): Promise<boolean> {
    return this.#signer.unlock(password);
  }
}
