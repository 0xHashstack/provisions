import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { publicProvider } from '@wagmi/core/providers/public'
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useEffect, useState } from "react";
import {
  InjectedConnector as StarknetInjector,
} from "@starknet-react/core";
import {DrawerContextProvider} from '../context/DrawerContext'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { mainnet, sepolia, polygon, optimism, polygonMumbai } from '@wagmi/core/chains'
import { StarknetProvider } from "@starknet-react/core/dist/providers";
import Layout from "@/components/toasts";
import 'preline/preline';

let chainT=[polygonMumbai];
let chainM=[polygon]

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } =   configureChains(
    [mainnet],
    [publicProvider()],
  )
  const connectors = [
    new StarknetInjector({ options: { id: "braavos" } }),
    new StarknetInjector({ options: { id: "argentX" } }),
  ];
  const projectId=process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTOR || "";
  const infuraId=process.env.NEXT_PUBLIC_INFURA_MAINNET || "";
  const config = createConfig(
    getDefaultConfig(
      {
        publicClient:publicClient,
      infuraId: infuraId,
      walletConnectProjectId: projectId,
      connectors:  [
        new MetaMaskConnector({
          chains: [mainnet],
      }),
      new CoinbaseWalletConnector({
      options: {
        appName: 'wagmi',
      },
      chains:[mainnet]
    }),
    new WalletConnectConnector({
      options: {
        projectId: projectId,
      },
      chains:[mainnet]
    }),
      ],
      appName: "Presale",
      appDescription: "Hashstack Token Claims",
      appUrl: "https://token.hashstack.finance",
      appIcon: "https://token.hashstack.finance/favicon-32x32.png",
    }),
  );

  const [feedback, setFeedback] = useState(false);

  // Initialize Preline on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.HSStaticMethods?.autoInit?.();
    }
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="google-site-verification" content="9U0-YnKdWueBdZmj8Y5_JEkGNPOiV-_d8cPrmjIgifs" />
        <title>Hashstack | Under-collateralised loans | Defi</title>
        <meta
          name="description"
          content="Hashstack provides a permissionless zk-native money market protocol enabling secure under-collateralised loans to the crypto retail. Built on Starknet L2, Hashstack leverages the capability of zero-knowledge proofs to provide a cost & capital-efficient lending solution."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon-32x32.png" />
      </Head>

      <ChakraProvider>
        <StarknetProvider autoConnect={true} connectors={connectors}>
          <DrawerContextProvider>
            <Layout>
              <WagmiConfig config={config}>
                <ConnectKitProvider>
                  <Component {...pageProps} />
                </ConnectKitProvider>
              </WagmiConfig>
            </Layout>
          </DrawerContextProvider>
        </StarknetProvider>
      </ChakraProvider>
    </>
  );
}
