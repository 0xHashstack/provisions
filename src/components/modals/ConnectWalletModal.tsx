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
import { useAccount, useConnectors } from "@starknet-react/core";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

const ConnectStarknetWalletModal =()=>{
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [availableDataLoading, setAvailableDataLoading] = useState(true);
  const { account, address, status, isConnected } = useAccount();
  // const { data, isLoading, error, refetch } = useBalance({
  //   address
  // })
  console.log(address);
  const { available, disconnect, connect, connectors, refresh } =
    useConnectors();

      useEffect(() => {
        const interval = setInterval(refresh, 2000)
        // setAvailableDataLoading(false);
        return () => clearInterval(interval)
      }, [refresh])
    useEffect(() => {
        const timeout = setTimeout(() => {
          setAvailableDataLoading(false);
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, [refresh]);
useEffect(()=>{
    if(address){
        onClose()

    }
},[address])
    return(
        <Box>
          {!address ?  <Button variant='ghost' _hover={{background:'transparent'}}  background="transparent"  color={'white'} onClick={onOpen}>Connect</Button>:<Button variant='ghost' _hover={{background:'transparent'}}   background="transparent"  color={'white'} onClick={disconnect}>Disconnect</Button>}
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
            Connect Starknet Wallet
          </ModalHeader>
          <ModalCloseButton color="white" mt="1rem" mr="1rem" />
          {/* <ModalHeader>Borrow</ModalHeader> */}
          <ModalBody  color={"#E6EDF3"}>
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
          mt="8px"
        >
          {available?.[0]?.options?.id == "braavos" ||
          available?.[1]?.options?.id == "braavos" ? (
            <Box
              w="full"
              border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
              py="2"
              borderRadius="6px"
              gap="3px"
              display="flex"
              justifyContent="space-between"
              cursor="pointer"
              // onClick={() => router.push("/market")}
              onClick={() => {
                // localStorage.setItem("lastUsedConnector", "braavos");
                // localStorage.setItem("connected", "braavos");
                disconnect();
                connect(connectors[0]);
                // dispatch(setTransactionRefresh("reset"));
              }}
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
                ) : available?.[0]?.options?.id == "braavos" ||
                  available?.[1]?.options?.id == "braavos" ? (
                  // || availableDataLoading
                  "Braavos Wallet"
                ) : (
                  "Download Braavos Wallet"
                )}
              </Box>
              <Box p="1" mr="16px">
                <BravosIcon />
              </Box>
            </Box>
          ) : (
            <Link href="https://braavos.app" target="_blank">
              <Box
                w="full"
                border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                py="2"
                borderRadius="6px"
                gap="3px"
                display="flex"
                justifyContent="space-between"
                cursor="pointer"
                // onClick={() => router.push("/market")}
                // onClick={() =>
                //   connect(connectors[0])
                // }
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
                  ) : available[0]?.options?.id == "braavos" ||
                    available[1]?.options?.id == "braavos" ? (
                    // || availableDataLoading
                    "Braavos Wallet"
                  ) : (
                    "Download Braavos Wallet"
                  )}
                </Box>
                <Box p="1" mr="16px">
                  <BravosIcon />
                </Box>
              </Box>
            </Link>
          )}

          {available[1]?.options.id == "argentX" ||
          available[0]?.options.id == "argentX" ? (
            <Box
              w="full"
              py="2"
              border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
              borderRadius="6px"
              gap="3px"
              mt="1rem"
              display="flex"
              justifyContent="space-between"
              cursor="pointer"
              onClick={() => {
                // localStorage.setItem("lastUsedConnector", "argentX");
                // localStorage.setItem("connected", "argentX");
                disconnect();
                connect(connectors[1]);
                // dispatch(setTransactionRefresh("reset"));
              }}
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
                ) : available[1]?.options.id == "argentX" ||
                  available[0]?.options.id == "argentX" ? (
                  // || availableDataLoading
                  "Argent X Wallet"
                ) : (
                  "Download Argent X Wallet"
                )}
              </Box>
              <Box p="1" mr="16px">
                <Image
                  src="/ArgentXlogo.svg"
                  alt="Picture of the author"
                  width="15"
                  height="15"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          ) : (
            <Link href="https://www.argent.xyz/argent-x" target="_black">
              <Box
                w="full"
                py="2"
                border="1px solid #2B2F35"
                borderRadius="6px"
                gap="3px"
                mt="1rem"
                display="flex"
                justifyContent="space-between"
                cursor="pointer"
                // onClick={() => connect(connectors[1])}
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
                  ) : available[1]?.options.id == "argentX" ||
                    available[0]?.options.id == "argentX" ? (
                    // || availableDataLoading
                    "Argent X Wallet"
                  ) : (
                    "Download Argent X Wallet"
                  )}
                </Box>
                <Box p="1" mr="16px">
                  <Image
                    src="/ArgentXlogo.svg"
                    alt="Picture of the author"
                    width="15"
                    height="15"
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Box>
            </Link>
          )}
        </Card>
   
      </Box>
      {/* </PageCard> */}
    </Box>
</ModalBody></ModalContent></Modal>
      
    </Box>
      )
}
export default ConnectStarknetWalletModal;