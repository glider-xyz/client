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
exports.MinimalForwarder = void 0;
const ethers_1 = require("ethers");
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
class MinimalForwarder {
    constructor(chainId, contractAddress, provider) {
        this.chainId = chainId;
        this.contract = new ethers_1.ethers.Contract(contractAddress, MinimalForwarderAbi, provider);
    }
    getEip712Domain() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                chainId: this.chainId,
                verifyingContract: this.contract.address,
                name: 'MinimalForwarder',
                version: '0.0.1',
            };
        });
    }
    getRequestTypes() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getRequestMessage(transactionRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, data, to, gasLimit } = transactionRequest;
            const nonce = yield this.__getSignerNonce(from);
            return {
                from,
                to,
                gas: gasLimit.toString(),
                value: '0x0',
                nonce: nonce.toString(),
                data: data.toString(),
            };
        });
    }
    __getSignerNonce(signerAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.contract.getNonce(signerAddress);
            }
            catch (e) {
                throw new Error('Failed to get nonce from MinimalForwarder contract.');
            }
        });
    }
}
exports.MinimalForwarder = MinimalForwarder;
//# sourceMappingURL=MinimalForwarder.js.map