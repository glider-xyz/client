import { ethers, Signer } from 'ethers';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { GliderConfig } from './types/GliderConfig';
export declare class GliderSigner implements Signer {
    private signer;
    private config;
    constructor(signer: Signer, config: GliderConfig);
    sendTransaction(transaction: ethers.utils.Deferrable<TransactionRequest>): Promise<TransactionResponse>;
    connect(...args: Parameters<Signer['connect']>): ReturnType<Signer['connect']>;
    get _isSigner(): boolean;
    getAddress(...args: Parameters<Signer['getAddress']>): Promise<string>;
    signMessage(...args: Parameters<Signer['signMessage']>): ReturnType<Signer['signMessage']>;
    signTransaction(...args: Parameters<Signer['signTransaction']>): ReturnType<Signer['signTransaction']>;
    _checkProvider(...args: Parameters<Signer['_checkProvider']>): ReturnType<Signer['_checkProvider']>;
    _signTypedData(...args: Parameters<TypedDataSigner['_signTypedData']>): ReturnType<TypedDataSigner['_signTypedData']>;
    call(...args: Parameters<Signer['call']>): ReturnType<Signer['call']>;
    getBalance(...args: Parameters<Signer['getBalance']>): ReturnType<Signer['getBalance']>;
    getTransactionCount(...args: Parameters<Signer['getTransactionCount']>): ReturnType<Signer['getTransactionCount']>;
    estimateGas(...args: Parameters<Signer['estimateGas']>): ReturnType<Signer['estimateGas']>;
    getChainId(...args: Parameters<Signer['getChainId']>): ReturnType<Signer['getChainId']>;
    getGasPrice(...args: Parameters<Signer['getGasPrice']>): ReturnType<Signer['getGasPrice']>;
    populateTransaction(...args: Parameters<Signer['populateTransaction']>): ReturnType<Signer['populateTransaction']>;
    getFeeData(...args: Parameters<Signer['getFeeData']>): ReturnType<Signer['getFeeData']>;
    resolveName(...args: Parameters<Signer['resolveName']>): ReturnType<Signer['resolveName']>;
    checkTransaction(...args: Parameters<Signer['checkTransaction']>): ReturnType<Signer['checkTransaction']>;
}
//# sourceMappingURL=GliderSigner.d.ts.map