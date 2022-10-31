import { Signer, BigNumber } from 'ethers';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';

import { fetchPost } from './utils';
import { GliderConfig } from './types/GliderConfig';
import { MinimalForwarder } from './MinimalForwarder';

type ResolvedTransactionRequest = Required<
  Pick<TransactionRequest, 'to' | 'data' | 'gasLimit' | 'from' | 'chainId'>
> &
  TransactionRequest;

const __resolveTransactionRequest = async (
  tx: TransactionRequest,
  signer: Signer,
): Promise<ResolvedTransactionRequest> => {
  const resolvedTx: ResolvedTransactionRequest = <ResolvedTransactionRequest>(
    await signer.populateTransaction(tx)
  );
  return resolvedTx;
};

const sendRelayTransaction = async (
  transaction: TransactionRequest,
  signer: Signer,
  options: GliderConfig,
): Promise<TransactionResponse> => {
  const { forwarderContractAddress, provider, relayServerUrl, chainId } = options;

  if (transaction.data === undefined) {
    throw new Error('transaction.data is undefined');
  }

  if (transaction.value !== undefined && !BigNumber.from(transaction.value).eq(0)) {
    throw new Error('transaction.value must be 0 in order to be accepted by the relayer');
  }

  const [signerChainId, providerChainId, resolvedTx] = await Promise.all([
    signer.getChainId(),
    provider.getNetwork().then((network) => network.chainId),
    __resolveTransactionRequest(transaction, signer),
  ]);

  const { chainId: txChainId } = resolvedTx;

  if (signerChainId !== providerChainId) {
    throw new Error(
      `signer's chainId ${signerChainId} is not the same as the provider's chainId ${providerChainId}`,
    );
  }

  if (txChainId !== signerChainId) {
    throw new Error(
      `transaction's chainId ${txChainId} is not the same as the signer's chainId ${signerChainId}`,
    );
  }

  if (chainId !== signerChainId) {
    throw new Error(
      `GliderConfig.chainId ${chainId} is not the same as the signer's chainId ${signerChainId}`,
    );
  }

  const forwarder = new MinimalForwarder(chainId, forwarderContractAddress, provider);

  const [domain, types, forwardRequest] = await Promise.all([
    forwarder.getEip712Domain(),
    forwarder.getRequestTypes(),
    forwarder.getRequestMessage(resolvedTx),
  ]);

  //@ts-ignore
  if (!signer._signTypedData) {
    throw Error('Signer does not support _signTypedData');
  }

  //@ts-ignore
  const signature = await signer._signTypedData(domain, types, forwardRequest);

  const response: RelayTransactionResponse = await fetchPost(relayServerUrl, {
    transactionBase: forwardRequest,
    signature,
    chainId,
  });

  return {
    from: response.from,
    hash: response.hash,
    confirmations: response.confirmations,
    nonce: response.nonce,
    gasLimit: BigNumber.from(response.gasLimit),
    data: response.data,
    value: BigNumber.from(response.value),
    chainId: response.chainId,
    wait: (confirmations?: number | undefined) => {
      return provider.waitForTransaction(response.hash, confirmations);
    },
  };
};

type RelayTransactionResponse = {
  from: string;
  hash: string;
  confirmations: number;
  nonce: number;
  gasLimit: string;
  data: string;
  value: string;
  chainId: number;
};

export { sendRelayTransaction };
