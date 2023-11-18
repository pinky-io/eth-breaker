import React from 'react';
import '@walletconnect/react-native-compat';
import {WagmiConfig} from 'wagmi';
import {mainnet, polygon, arbitrum} from 'viem/chains';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID';

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

type Props = {children: React.ReactNode};

export default function WagmiProvider({children}: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
      <Web3Modal />
    </WagmiConfig>
  );
}
