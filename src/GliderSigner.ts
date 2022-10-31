import { ethers, Signer } from 'ethers';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { TypedDataSigner } from '@ethersproject/abstract-signer';

import { sendRelayTransaction } from './sendRelayTransaction';
import { GliderConfig } from './types/GliderConfig';

export class GliderSigner implements Signer {
  private signer: Signer;
  private config: GliderConfig;

  constructor(signer: Signer, config: GliderConfig) {
    this.signer = signer;
    this.config = config;
  }

  async sendTransaction(
    transaction: ethers.utils.Deferrable<TransactionRequest>,
  ): Promise<TransactionResponse> {
    const tx = await this.populateTransaction(transaction);
    return await sendRelayTransaction(tx, this.signer, this.config);
  }

  connect(...args: Parameters<Signer['connect']>): ReturnType<Signer['connect']> {
    return new GliderSigner(this.signer.connect(...args), this.config);
  }

  get _isSigner(): boolean {
    return this.signer._isSigner;
  }

  getAddress(...args: Parameters<Signer['getAddress']>) {
    return this.signer.getAddress(...args);
  }

  signMessage(...args: Parameters<Signer['signMessage']>): ReturnType<Signer['signMessage']> {
    return this.signer.signMessage(...args);
  }

  signTransaction(
    ...args: Parameters<Signer['signTransaction']>
  ): ReturnType<Signer['signTransaction']> {
    return this.signer.signTransaction(...args);
  }

  _checkProvider(
    ...args: Parameters<Signer['_checkProvider']>
  ): ReturnType<Signer['_checkProvider']> {
    return this.signer._checkProvider(...args);
  }

  _signTypedData(
    ...args: Parameters<TypedDataSigner['_signTypedData']>
  ): ReturnType<TypedDataSigner['_signTypedData']> {
    //@ts-ignore
    if (!this.signer._signTypedData) {
      throw Error('Signer does not support _signTypedData');
    }
    //@ts-ignore
    return this.signer._signTypedData(...args);
  }

  call(...args: Parameters<Signer['call']>): ReturnType<Signer['call']> {
    return this.signer.call(...args);
  }

  getBalance(...args: Parameters<Signer['getBalance']>): ReturnType<Signer['getBalance']> {
    return this.signer.getBalance(...args);
  }

  getTransactionCount(
    ...args: Parameters<Signer['getTransactionCount']>
  ): ReturnType<Signer['getTransactionCount']> {
    return this.signer.getTransactionCount(...args);
  }

  estimateGas(...args: Parameters<Signer['estimateGas']>): ReturnType<Signer['estimateGas']> {
    return this.signer.estimateGas(...args);
  }

  getChainId(...args: Parameters<Signer['getChainId']>): ReturnType<Signer['getChainId']> {
    return this.signer.getChainId(...args);
  }

  getGasPrice(...args: Parameters<Signer['getGasPrice']>): ReturnType<Signer['getGasPrice']> {
    return this.signer.getGasPrice(...args);
  }

  populateTransaction(
    ...args: Parameters<Signer['populateTransaction']>
  ): ReturnType<Signer['populateTransaction']> {
    return this.signer.populateTransaction(...args);
  }

  getFeeData(...args: Parameters<Signer['getFeeData']>): ReturnType<Signer['getFeeData']> {
    return this.signer.getFeeData(...args);
  }

  resolveName(...args: Parameters<Signer['resolveName']>): ReturnType<Signer['resolveName']> {
    return this.signer.resolveName(...args);
  }

  checkTransaction(
    ...args: Parameters<Signer['checkTransaction']>
  ): ReturnType<Signer['checkTransaction']> {
    return this.signer.checkTransaction(...args);
  }
}
