import { TransactionRequest } from '@ethersproject/abstract-provider';

export type ResolvedTransactionRequest = Required<
  Pick<TransactionRequest, 'to' | 'data' | 'gasLimit' | 'from' | 'chainId'>
> &
  TransactionRequest;
