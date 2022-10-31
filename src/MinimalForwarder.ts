import { ethers } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { ResolvedTransactionRequest } from './types/ResolvedTransactionRequest';

export type TypedDataTypes = Record<string, Array<TypedDataField>>;

export interface Forwarder<T> {
  getEip712Domain(): Promise<TypedDataDomain>;
  getRequestTypes(): Promise<TypedDataTypes>;
  getRequestMessage(transactionRequest: TransactionRequest): Promise<T>;
}

const MinimalForwarderAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gas',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct Forwarder.ForwardRequest',
        name: 'req',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
    ],
    name: 'getNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gas',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct Forwarder.ForwardRequest',
        name: 'req',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'verify',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

type MinimalForwarderForwardRequest = {
  from: string;
  to: string;
  value: string;
  data: string;
  gas: string;
  nonce: string;
};

export class MinimalForwarder implements Forwarder<MinimalForwarderForwardRequest> {
  chainId: number;
  contract: ethers.Contract;

  constructor(chainId: number, contractAddress: string, provider: Provider) {
    this.chainId = chainId;
    this.contract = new ethers.Contract(contractAddress, MinimalForwarderAbi, provider);
  }

  async getEip712Domain(): Promise<TypedDataDomain> {
    return {
      chainId: this.chainId,
      verifyingContract: this.contract.address,
      name: 'MinimalForwarder',
      version: '0.0.1',
    };
  }

  async getRequestTypes(): Promise<TypedDataTypes> {
    return {
      ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
      ],
    };
  }

  async getRequestMessage(
    transactionRequest: TransactionRequest,
  ): Promise<MinimalForwarderForwardRequest> {
    const { from, data, to, gasLimit } = <ResolvedTransactionRequest>transactionRequest;

    const nonce = await this.__getSignerNonce(from);
    return {
      from,
      to,
      gas: gasLimit.toString(),
      value: '0x0',
      nonce: nonce.toString(),
      data: data.toString(),
    };
  }

  async __getSignerNonce(signerAddress: string): Promise<string> {
    try {
      return await this.contract.getNonce(signerAddress);
    } catch (e) {
      throw new Error('Failed to get nonce from MinimalForwarder contract.');
    }
  }
}
