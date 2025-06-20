import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { publicProvider } from '@wagmi/core/providers/public'
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useState } from "react";
// import starknet
import {
  
  InjectedConnector as StarknetInjector,
  // StarknetProviderProps,
} from "@starknet-react/core";
import { StarknetProviderProps } from "@starknet-react/core";
import {DrawerContextProvider} from '../context/DrawerContext'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { mainnet, sepolia,goerli, polygon, optimism, polygonMumbai } from '@wagmi/core/chains'
import { StarknetProvider } from "@starknet-react/core/dist/providers";
import Layout from "@/components/toasts";
import { baseSepolia } from "viem/chains";
// const chainsAllowedTestnet= [polygon];
let chainT=[polygonMumbai];
let chainM=[polygon]
const theme = extendTheme({
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          _disabled: {
            background: "#676D9A1A",
            opacity: "100%",
            cursor: "pointer",
          },
          "> *:first-of-type": {
            background: "#676D9A1A",
            opacity: "100%",
          },
        },
      },
    },
    // Checkbox: {
    //   parts: ["control","icon"],
    //   baseStyle: {
    //     control: {
    //       _checked: {
    //         _disabled: {
    //           bg: "#4D59E8",
    //           borderColor:"#2B2F35",

    //         }
    //       }
    //     },
    //     icon:{
    //       bg:"white.600"
    //     }
    //   }
    // }
    Checkbox: {
      baseStyle: {
        // {color:'black',}
        icon: {
          // color: 'white',
          bg: '#4D59E8',
          color: 'white',
          borderWidth: '0px',


          // borderColor: '#4D59E8',
          _disabled: {
            borderWidth: '0px',
            padding: '0px',
            color: '#4D59E8',
            bg: '#4D59E8',
            colorScheme: "#4D59E8",
            // iconColor:'white.800'
            // borderColor: '#4D59E8',
            // bg: 'red.800',

          },


        },
        control: {
          // border: '1px',
          // borderColor: 'gray.300',
          borderRadius: 'base',
          _disabled: {
            borderWidth: '0px',
            padding: '0px',
            color: 'black',
            bg: '#4D59E8',


            // borderColor: '#4D59E8',
            // bg: '#4D59E8',
          },
        },

      },
    },
    // Radio: {
    //   control: {
    //     _checked: {
    //       color: "red.800",
    //       bg:"red.800"
    //     },
    //   },

    // },
    // Radio: {
    //       bg:'red.800',
    //       control: {
    //         _checked: {
    //           color: 'green.800',
    //           bg:`black`,
    //         },
    //       },


    // },
  },


  colors: {
    customBlue: {
      500: "#0969DA",
    },
    customPurple: {
      500: "#4D59E8",
    }
  },
  fonts: {
    body: "Inter, sans-serif",
  },
});
const lightTheme = extendTheme({
  // Add your light theme styles here
});



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
      // Required API Keys
      infuraId: infuraId, // or infuraId
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

      // Required
      appName: "Presale",

      // Optional
      appDescription: "Your App Description",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );
  const [feedback, setFeedback] = useState(false);
  // loadSpace(spaceApiKey)
  //   .then((api) => {
  //     if (!feedback) {
  //       api.init();
  //       setFeedback(true);
  //     }
  //   })
  //   .catch((err) => console.log(err));

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
          content="Hashstack provides a permissionless zk-native money market protocol enabling secure under-collateralised loans to the crypto retail. Built on Starknet L2 [announcement], Hashstack leverages the capability of zero-knowledge proofs to provide a cost & capital-efficient lending solution."
        />
        
        <link rel="shortcut icon" href="/favicon-32x32.png" />
      </Head>
      
      <ChakraProvider theme={theme}>
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
