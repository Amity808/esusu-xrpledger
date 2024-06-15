import * as chains from "viem/chains";
// import { Chain } from '@wagmi/core'


export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};
export const XRPL = {
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


const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [XRPL],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
