import {
  JsonRpcApiProvider,
  JsonRpcApiProviderOptions,
  JsonRpcError,
  JsonRpcPayload,
  JsonRpcResult,
} from 'ethers';
import {JsonRpcProvider as JsonRpcProviderV5} from '@ethersproject/providers';

export class JsonRpcProviderV5Wrapper extends JsonRpcApiProvider {
  #private: JsonRpcProviderV5;

  constructor(
    provider: JsonRpcProviderV5,
    options?: JsonRpcApiProviderOptions
  ) {
    super(provider.network, options as any);
    this.#private = provider;
  }

  _send(
    payload: JsonRpcPayload | Array<JsonRpcPayload>
  ): Promise<Array<JsonRpcResult | JsonRpcError>> {
    if (!Array.isArray(payload)) {
      payload = [payload];
    }
    return Promise.all(
      payload.map(async item => {
        try {
          const params = Array.isArray(item.params)
            ? item.params
            : Object.values(item.params);
          return {
            id: item.id,
            result: await this.#private.send(item.method, params),
          };
        } catch (e: any) {
          return {
            id: item.id,
            error: e,
          };
        }
      })
    );
  }
}
