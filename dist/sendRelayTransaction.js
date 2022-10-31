"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRelayTransaction = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
const MinimalForwarder_1 = require("./MinimalForwarder");
const __resolveTransactionRequest = (tx, signer) => __awaiter(void 0, void 0, void 0, function* () {
    const resolvedTx = (yield signer.populateTransaction(tx));
    return resolvedTx;
});
const sendRelayTransaction = (transaction, signer, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { forwarderContractAddress, provider, relayServerUrl, chainId } = options;
    if (transaction.data === undefined) {
        throw new Error('transaction.data is undefined');
    }
    if (transaction.value !== undefined && !ethers_1.BigNumber.from(transaction.value).eq(0)) {
        throw new Error('transaction.value must be 0 in order to be accepted by the relayer');
    }
    const [signerChainId, providerChainId, resolvedTx] = yield Promise.all([
        signer.getChainId(),
        provider.getNetwork().then((network) => network.chainId),
        __resolveTransactionRequest(transaction, signer),
    ]);
    const { chainId: txChainId } = resolvedTx;
    if (signerChainId !== providerChainId) {
        throw new Error(`signer's chainId ${signerChainId} is not the same as the provider's chainId ${providerChainId}`);
    }
    if (txChainId !== signerChainId) {
        throw new Error(`transaction's chainId ${txChainId} is not the same as the signer's chainId ${signerChainId}`);
    }
    if (chainId !== signerChainId) {
        throw new Error(`GliderConfig.chainId ${chainId} is not the same as the signer's chainId ${signerChainId}`);
    }
    const forwarder = new MinimalForwarder_1.MinimalForwarder(chainId, forwarderContractAddress, provider);
    const [domain, types, forwardRequest] = yield Promise.all([
        forwarder.getEip712Domain(),
        forwarder.getRequestTypes(),
        forwarder.getRequestMessage(resolvedTx),
    ]);
    //@ts-ignore
    if (!signer._signTypedData) {
        throw Error('Signer does not support _signTypedData');
    }
    //@ts-ignore
    const signature = yield signer._signTypedData(domain, types, forwardRequest);
    const response = yield (0, utils_1.fetchPost)(relayServerUrl, {
        transactionBase: forwardRequest,
        signature,
        chainId,
    });
    return {
        from: response.from,
        hash: response.hash,
        confirmations: response.confirmations,
        nonce: response.nonce,
        gasLimit: ethers_1.BigNumber.from(response.gasLimit),
        data: response.data,
        value: ethers_1.BigNumber.from(response.value),
        chainId: response.chainId,
        wait: (confirmations) => {
            return provider.waitForTransaction(response.hash, confirmations);
        },
    };
});
exports.sendRelayTransaction = sendRelayTransaction;
//# sourceMappingURL=sendRelayTransaction.js.map