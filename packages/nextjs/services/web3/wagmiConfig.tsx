import { wagmiConnectors } from "./wagmiConnectors";
import { Chain, createClient, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import { createConfig } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";
import { coinbaseWallet } from 'wagmi/connectors'

const { targetNetworks } = scaffoldConfig;

export const XRP = {
  id: 1440002,
  name: ' EVM Sidechain - Devnet',
  network: 'EVM Sidechain - Devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EVM Sidechain - Devnet',
    symbol: 'XRP',
  },
  rpcUrls: {
    public: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
    default: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'EVM Sidechain - Devnet', url: 'https://evm-sidechain.xrpl.org/' },
    default: { name: 'EVM Sidechain - Devnet', url: 'https://evm-sidechain.xrpl.org/' },
  },
  contracts: {
    multicall3: {
      address: '0x4D80104E7e642e5f084030F6Da4e6f2B4f3B97ca',
      // blockCreated: 11_907_934,
    },
  },
} 


// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
