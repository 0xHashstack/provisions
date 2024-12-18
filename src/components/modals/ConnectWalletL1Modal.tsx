import BravosIcon from "@/assets/braavos";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  NumberInput,
  NumberInputField,
  Box,
  Text,
  Card,
  ModalHeader,
  Skeleton,
} from "@chakra-ui/react";
import {  useConnectors } from "@starknet-react/core";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { baseSepolia, mainnet, polygon, polygonMumbai, sepolia } from "viem/chains";
import MetamaskIcon from "@/assets/metamaskIcon";
import CoinbaseIcon from "@/assets/coinbaseIcon";
import WalletConnectIcon from "@/assets/walletConnectIcon";

const ConnectWalletL1Modal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [availableDataLoading, setAvailableDataLoading] = useState(false);
  const {address}=useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId:mainnet.id,
    });
    useEffect(() => {
      if (address) {
        onClose();
      }
    }, [address]);
  return (
    <Box>
      <Box
        onClick={() => {
          onOpen();
        }}
        {...restProps}
      >
        {buttonText}
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay bg="rgba(244, 242, 255, 0.5);" mt="3.8rem" />
        <ModalContent mt="8rem" bg={"#02010F"} maxW="464px">
          <ModalHeader
            mt="1rem"
            fontSize="14px"
            fontWeight="600"
            fontStyle="normal"
            lineHeight="20px"
            color="white"
          >
            Connect L1 Wallet
          </ModalHeader>
          <ModalCloseButton color="white" mt="1rem" mr="1rem" />
          {/* <ModalHeader>Borrow</ModalHeader> */}
          <ModalBody color={"#E6EDF3"}>
            {/* <ModalCloseButton mt="1rem" mr="1rem" color="white" /> */}
            {/* <button onClick={onClose}>Cancel</button> */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#191922"
              //   height="100vh"
            >
              {/* <PageCard
      justifyContent="center"
      alignItems="center"
      backgroundColor="#191922"
      height="100vh"
    > */}

              <Box
                display="flex"
                background="#02010F"
                flexDirection="column"
                alignItems="flex-start"
                padding="32px"
                width="462px"
                // height="567px"
                border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                borderRadius="8px"
                // bgColor="red"
              >
                <Card
                  p="1rem"
                  background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
                  border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                  width="400px"
                  // mt="8px"
                >
                  {connectors.map((connector: any) => (
                    <Box
                      w="full"
                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                      py="2"
                      borderRadius="6px"
                      gap="3px"
                      display="flex"
                      justifyContent="space-between"
                      cursor="pointer"
                      mb="16px"
                      // onClick={() => router.push("/market")}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                    >
                      <Box ml="1rem" color="white">
                        {availableDataLoading ? (
                          <Skeleton
                            width="6rem"
                            height="1.4rem"
                            startColor="#101216"
                            endColor="#2B2F35"
                            borderRadius="6px"
                          />
                        ) : connector.id == "metaMask" ? (
                          "MetaMask"
                        ) : connector.id == "coinbaseWallet" ? (
                          "Coinbase"
                        ) : (
                          "Wallet Connect"
                        )}
                      </Box>
                      <Box p="1" mr="16px">
                        {connector.id == "metaMask" ? (
                          <MetamaskIcon />
                        ) : connector.id == "coinbaseWallet" ? (
                          <CoinbaseIcon />
                        ) : (
                          <WalletConnectIcon />
                        )}
                      </Box>
                    </Box>
                  ))}
                </Card>
                <Box
                  display="flex"
                  flexDirection="row"
                  fontSize="12px"
                  lineHeight="30px"
                  fontWeight="400"
                  mt="16px"
                ></Box>
                <Box
                  alignItems="center"
                  fontSize="14px"
                  lineHeight="22px"
                  fontWeight="400"
                  mt="8px"
                >
                  <Text
                    fontSize="14px"
                    lineHeight="22px"
                    fontWeight="400"
                    color="#fff"
                  >
                    By connecting your wallet, you agree to Hashstack&apos;s
                  </Text>
                  <Button
                    variant="link"
                    fontSize="14px"
                    display="inline"
                    color="#4D59E8"
                    cursor="pointer"
                    lineHeight="22px"
                  >
                    terms of service & disclaimer
                  </Button>
                </Box>

                <Box
                  mt="16px"
                  display="flex"
                  flexDirection="column"
                  // pb="32px"
                  // bgColor="blue"
                >
                  <Text
                    fontSize="12px"
                    lineHeight="18px"
                    fontWeight="400"
                    color="#3E415C"
                  >
                    {/* This mainnet is currently in alpha with limitations on the maximum
            supply & borrow amount. This is done in consideration of the current
            network and liquidity constraints of the Starknet. We urge the users
            to use the dapp with caution. Hashstack will not cover any
            accidental loss of user funds. */}
                    Wallets are provided by External Providers and by selecting
                    you agree to Terms of those Providers. Your access to the
                    wallet might be reliant on the External Provider being
                    operational.
                  </Text>
                  <Text
                    fontSize="12px"
                    lineHeight="18px"
                    fontWeight="400"
                    color="#3E415C"
                    mt="1rem"
                  >
                    We urge the users to use the dapp with caution. Hashstack
                    will not cover any accidental loss of user funds.
                  </Text>
                </Box>
              </Box>
              {/* </PageCard> */}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ConnectWalletL1Modal;
