import { Signer } from 'ethers';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { GliderConfig } from './types/GliderConfig';
declare const sendRelayTransaction: (transaction: TransactionRequest, signer: Signer, options: GliderConfig) => Promise<TransactionResponse>;
export { sendRelayTransaction };
//# sourceMappingURL=sendRelayTransaction.d.ts.map