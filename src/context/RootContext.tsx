'use client';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { publicProvider } from '@wagmi/core/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector as StarknetInjector } from '@starknet-react/core';
import { DrawerContextProvider } from '../context/DrawerContext';
import { mainnet } from '@wagmi/core/chains';
import { StarknetProvider } from '@starknet-react/core/dist/providers';
import Layout from '@/components/toasts';

export function RootContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { publicClient } = configureChains([mainnet], [publicProvider()]);
	const connectors = [
		new StarknetInjector({ options: { id: 'braavos' } }),
		new StarknetInjector({ options: { id: 'argentX' } }),
	];
	const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTOR || '';
	const infuraId = process.env.NEXT_PUBLIC_INFURA_MAINNET || '';
	const config = createConfig(
		getDefaultConfig({
			publicClient: publicClient,
			infuraId: infuraId,
			walletConnectProjectId: projectId,
			connectors: [
				new MetaMaskConnector({
					chains: [mainnet],
				}),
				new CoinbaseWalletConnector({
					options: {
						appName: 'wagmi',
					},
					chains: [mainnet],
				}),
				new WalletConnectConnector({
					options: {
						projectId: projectId,
					},
					chains: [mainnet],
				}),
			],
			appName: 'Presale',
			appDescription: 'Your App Description',
			appUrl: 'https://family.co',
			appIcon: 'https://family.co/logo.png',
		})
	);

	return (
		<StarknetProvider
			autoConnect={true}
			connectors={connectors}>
			<DrawerContextProvider>
				<Layout>
					<WagmiConfig config={config}>
						<ConnectKitProvider>{children}</ConnectKitProvider>
					</WagmiConfig>
				</Layout>
			</DrawerContextProvider>
		</StarknetProvider>
	);
}
