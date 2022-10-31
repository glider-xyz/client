import { Provider } from '@ethersproject/abstract-provider';

export type NetworkGliderConfig = {
  chainId: number;
  forwarderContractAddress: string;
  provider: Provider;
};

export type GliderConfig = {
  apiKey?: string;
  relayServerUrl: string;
  chainId: number;
  forwarderContractAddress: string;
  provider: Provider;
};
