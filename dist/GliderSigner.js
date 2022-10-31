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
exports.GliderSigner = void 0;
const sendRelayTransaction_1 = require("./sendRelayTransaction");
class GliderSigner {
    constructor(signer, config) {
        this.signer = signer;
        this.config = config;
    }
    sendTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.populateTransaction(transaction);
            return yield (0, sendRelayTransaction_1.sendRelayTransaction)(tx, this.signer, this.config);
        });
    }
    connect(...args) {
        return new GliderSigner(this.signer.connect(...args), this.config);
    }
    get _isSigner() {
        return this.signer._isSigner;
    }
    getAddress(...args) {
        return this.signer.getAddress(...args);
    }
    signMessage(...args) {
        return this.signer.signMessage(...args);
    }
    signTransaction(...args) {
        return this.signer.signTransaction(...args);
    }
    _checkProvider(...args) {
        return this.signer._checkProvider(...args);
    }
    _signTypedData(...args) {
        //@ts-ignore
        if (!this.signer._signTypedData) {
            throw Error('Signer does not support _signTypedData');
        }
        //@ts-ignore
        return this.signer._signTypedData(...args);
    }
    call(...args) {
        return this.signer.call(...args);
    }
    getBalance(...args) {
        return this.signer.getBalance(...args);
    }
    getTransactionCount(...args) {
        return this.signer.getTransactionCount(...args);
    }
    estimateGas(...args) {
        return this.signer.estimateGas(...args);
    }
    getChainId(...args) {
        return this.signer.getChainId(...args);
    }
    getGasPrice(...args) {
        return this.signer.getGasPrice(...args);
    }
    populateTransaction(...args) {
        return this.signer.populateTransaction(...args);
    }
    getFeeData(...args) {
        return this.signer.getFeeData(...args);
    }
    resolveName(...args) {
        return this.signer.resolveName(...args);
    }
    checkTransaction(...args) {
        return this.signer.checkTransaction(...args);
    }
}
exports.GliderSigner = GliderSigner;
//# sourceMappingURL=GliderSigner.js.map