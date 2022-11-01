## Glider

Easiest way to get started with meta-transactions in your DApp 🛫

### Quick start

First, install the package with its peer dependency [ethers](https://www.npmjs.com/package/ethers)

```bash
npm install @glider-xyz/client ethers
```

Then, wrap your signer using GliderSigner

```typescript
import { GliderSigner } from '@glider-xyz/client';
import { ethers, Signer, Contract } from ethers;

// Following example is for a local test chain (like Hardhat Network)
const gliderConfig = {
	chainId: 31337,
	provider: new ethers.providers.JsonRpcProvider('http://localhost:8545'),
	forwarderContractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
	relayServerUrl:  'http://localhost:3001/relayer/send'
};

const SendMetaTransactionButton = ({
	signer,
	contract
} : {
	signer: Signer,
	contract: Contract,
}) => {
	return (
		<button onClick={async () => {
			// Wrap your existing ethers Signer using GliderSigner.
			const gliderSigner = new GliderSigner(signer, gliderConfig);
			const connectedContract = contract.connect(gliderSigner);
			const txResponse = await contract.doSomething();
			await txResponse.wait();
		}}>
		Send Transaction
		</button>
	);
}

```

### Testing on a local chain

To test locally without deploying to a public testnet, check out [@glider-xyz/relay-server](https://www.npmjs.com/package/@glider-xyz/relay-server)

### Documentation

Check out [docs.useglider.xyz](https://docs.useglider.xyz) for more detailed guides and walkthroughs!
