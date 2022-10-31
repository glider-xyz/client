import { ethers } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
export declare type TypedDataTypes = Record<string, Array<TypedDataField>>;
export interface Forwarder<T> {
    getEip712Domain(): Promise<TypedDataDomain>;
    getRequestTypes(): Promise<TypedDataTypes>;
    getRequestMessage(transactionRequest: TransactionRequest): Promise<T>;
}
declare type MinimalForwarderForwardRequest = {
    from: string;
    to: string;
    value: string;
    data: string;
    gas: string;
    nonce: string;
};
export declare class MinimalForwarder implements Forwarder<MinimalForwarderForwardRequest> {
    chainId: number;
    contract: ethers.Contract;
    constructor(chainId: number, contractAddress: string, provider: Provider);
    getEip712Domain(): Promise<TypedDataDomain>;
    getRequestTypes(): Promise<TypedDataTypes>;
    getRequestMessage(transactionRequest: TransactionRequest): Promise<MinimalForwarderForwardRequest>;
    __getSignerNonce(signerAddress: string): Promise<string>;
}
export {};
//# sourceMappingURL=MinimalForwarder.d.ts.map