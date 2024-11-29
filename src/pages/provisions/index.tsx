import Navbar from "@/components/Navbar";
import ContributorsChart from "@/components/charts/ContributorsChart";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DetailsForm from "@/components/Form/DetailsForm";
import {
  erc20ABI,
  useBalance,
  useContractWrite,
  useAccount as useAccountL1,
  useWaitForTransaction,
  useDisconnect,
} from "wagmi";
import { useRouter } from "next/router";
import {
  mainnet,
  sepolia,
  goerli,
  polygon,
  optimism,
  polygonMumbai,
} from "@wagmi/core/chains";
import EmissionRateChart from "@/components/charts/EmissionRateChart";
import TokenomicsTable from "@/components/EmissionDashboard";
import EmissionDashboard from "@/components/EmissionDashboard";
import AuthenticateIllustration from "@/assets/authenticateIllustration";
import VerifiedUser from "@/assets/verifiedUser";
import ETHLogo from "@/assets/eth";
import Seperator from "@/assets/seperator";
import airdropIcon from "../../assets/airdrop.jpg";
import ccpIcon from "../../assets/ccp.jpg";
import Image from "next/image";
import HashTokenIconFloater from "@/assets/hashTokenIconFloater";
import ConnectStarknetWalletModal from "@/components/modals/ConnectWalletModal";
import {
  useAccount,
  useConnectors,
  useWaitForTransaction as useWaitForTransactionStarknet,
} from "@starknet-react/core";
import ConnectWalletL1Modal from "@/components/modals/ConnectWalletL1Modal";
import STRKLogo from "@/assets/strk";
import { parseAmount, processAddress } from "@/Blockchain/utils/utils";
import WhitetickIcon from "@/assets/whitetickIcon";
import { toast } from "react-toastify";
import useClaimL1 from "@/Blockchain/hooks/useClaimL1";
import useClaimStarknet from "@/Blockchain/hooks/useClaimStarknet";
import {
  getuserbeneficiaryTicketsL1,
  viewTicket,
} from "@/Blockchain/scripts/claimProxy";
import numberFormatter from "@/functions/numberFormatter";
import numberFormatterPercentage from "@/functions/numberFormatterPercentage";
import ConfirmClaimModal from "@/components/modals/ConfirmClaimModal";
import { useDrawContext } from "@/context/DrawerContext";
export default function Provisions() {
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1248px)");
  const [addressSearched, setaddressSearched] = useState<boolean>(false);
  const [addressDetails, setaddressDetails] = useState<any>();
  const [addressAuthenticated, setaddressAuthenticated] =
    useState<boolean>(false);
  const [walletTypeSelected, setwalletTypeSelected] = useState("");
  const [addressInput, setaddressInput] = useState("");
  const [claimAddress, setclaimAddress] = useState("");
  const [totalClaimableAmount, settotalClaimableAmount] = useState<number>(0)
  const [currentClaimableAmount, setcurrentClaimableAmount] = useState<number>(0)
  const [calltransaction, setcalltransaction] = useState(false)
  const [provisionCategories, setprovisionCategories] = useState([
    {
      ticketId: 0,
      id: "Airdrop 1",
      claimableAmount: 0,
      currentClaimableAmount: 0,
      EmissionRate: 2,
      ticketType: 3,
      description:"You should have completed more than five transactions on Hashstack V1 across three months, with $100+ cumulative value and $25 minimum supply/borrow balance.",
      icon:airdropIcon
    },
    {
      ticketId: 0,
      id: "CCP",
      claimableAmount: 0,
      currentClaimableAmount: 0,
      EmissionRate: 2,
      ticketType: 2,
      description:"You should have generated diverse, original content about Hashstack across multiple platforms, creating at least three distinct pieces in different formats.",
      icon:ccpIcon
    },
    {
      ticketId: 0,
      id: "Investors",
      claimableAmount: 0,
      currentClaimableAmount: 0,
      EmissionRate: 2,
      ticketType: 0,
      description:"You should have completed more than five transactions on Hashstack V1 across three months, with $100+ cumulative value and $25 minimum supply/borrow balance.",
      icon:airdropIcon
    },
    {
      ticketId: 0,
      id: "Others",
      claimableAmount: 0,
      currentClaimableAmount: 0,
      EmissionRate: 2,
      ticketType: 1,
      description:"You should have completed more than five transactions on Hashstack V1 across three months, with $100+ cumulative value and $25 minimum supply/borrow balance.",
      icon:airdropIcon
    },
  ]);

  useEffect(()=>{
    if(addressDetails){
      let valueTotal=0;
      let currentClaimbale=0
      for(var i=0;i<provisionCategories.length;i++){
        valueTotal+=provisionCategories[i].claimableAmount
        currentClaimbale+=provisionCategories[i].currentClaimableAmount
      }
      setcurrentClaimableAmount(currentClaimbale)
      settotalClaimableAmount(valueTotal)
    }
  },[addressDetails])

  const [claimAddressConfirmed, setclaimAddressConfirmed] =
    useState<boolean>(false);

  // const
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 2000);
  }, []);
  const handleSearch = async () => {
    if (addressInput.length === 66 || addressInput.length === 42) {
      // setaddressDetails(1);
      setaddressSearched(true);
    } else {
      toast.error("Please enter correct address", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
      });
    }
  };
  const {
    dataClaimL1,
    isSuccessL1,
    isErrorL1,
    writeClaimL1,
    claimAddressL1,
    setclaimAddressL1,
    ticketId,
    setticketId,
    errorL1,
  } = useClaimL1();
  const { isLoading: approveLoading, isSuccess: approveSuccess } =
    useWaitForTransaction({
      hash: dataClaimL1?.hash,
    });

  const handleTransactionl1 = async () => {
    try {
      if(ticketId!==0){
        const res = await writeClaimL1();
      }
    } catch (error) {
      toast.error("Transaction Declined", {
        position: "bottom-right",
      });
      console.log(error, "err l1");
    }
  };
  useEffect(() => {
    if (approveSuccess && !approveLoading) {
      toast.success("Successfully claimed HSTK Tokens", {
        position: "bottom-right",
      });
      setcalltransaction(false)
    }
  }, [approveSuccess]);

  useEffect(()=>{
    if(claimAddress){
      setclaimAddressL1(claimAddress)
    }
  },[claimAddress,addressAuthenticated])

  const updateProvisionCategories = (incomingData: any) => {
    const updatedCategories = provisionCategories.map((category) => {
      const matchingData = incomingData.find(
        (data: any, index: number) => Number(data[1]) === category.ticketType
      );

      if (matchingData) {
        return {
          ...category,
          ticketId: matchingData.ticketId,
          claimableAmount: parseAmount(matchingData.amount.toString()),
          currentClaimableAmount: parseAmount(matchingData.balance.toString()),
        };
      }

      return category;
    });

    setprovisionCategories(updatedCategories);
  };
  useEffect(() => {
    if (addressInput.length === 42 && addressSearched) {
      let arr:any = [];
      const fetchData = async () => {
        try {
          const res = await getuserbeneficiaryTicketsL1(addressInput);
          const dataTickets = res;

          for (let i = 0; i < dataTickets.length; i++) {
            arr.push(Number(dataTickets[i]));
          }

          let arrTicketValues:any = [];
          if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
              const res2 = await viewTicket(arr[i]);
              const enhancedRes2 = { ...res2, ticketId: arr[i] };
              arrTicketValues.push(enhancedRes2);
            }

            if (arrTicketValues.length > 0) {
              updateProvisionCategories(arrTicketValues);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // Ensure addressSearched is set to true after all calls are complete
          setaddressDetails(provisionCategories)
          // setaddressSearched(true);
        }
      };

      fetchData();
    }
  }, [addressInput, addressSearched]);

  const {
    rToken,
    setRToken,
    rTokenAmount,
    setRTokenAmount,
    dataStakeRequest,
    errorStakeRequest,
    resetStakeRequest,
    writeStakeRequest,
    writeAsyncStakeRequest,
    isErrorStakeRequest,
    isIdleStakeRequest,
    isSuccessStakeRequest,
    statusStakeRequest,
  } = useClaimStarknet();

  const { data, error, isLoading, isError, isSuccess } =
    useWaitForTransactionStarknet({
      hash: "",
      watch: true,
    });

  const { address: addressL1 } = useAccountL1();
  const { address, account } = useAccount();
  const { available, disconnect, connectors } = useConnectors();
  const { disconnect: disconnectL1 } = useDisconnect();
  const [toastPopupConfimred, settoastPopupConfimred] =
    useState<boolean>(false);
  const [loading, setloading] = useState(false);
  const {userConfirmation,toggleConfirmation  } = useDrawContext();
  console.log(userConfirmation,'form')
  useEffect(() => {
    if (addressInput) {
      if (address || addressL1) {
        if (address) {
          if (address === processAddress(addressInput)) {
            setaddressAuthenticated(true);
          } else {
            if (loading) {
              if (!toastPopupConfimred) {
                toast.error("Please sign in with the correct wallet address", {
                  position: "bottom-right",
                });
                settoastPopupConfimred(true);
              }
            }
          }
        }
        if (addressL1) {
          if (addressL1 === addressInput) {
            setaddressAuthenticated(true);
          } else {
            if (loading) {
              if (!toastPopupConfimred) {
                toast.error("Please sign in with the correct wallet address", {
                  position: "bottom-right",
                });
                settoastPopupConfimred(true);
              }
            }
          }
        }
      }
    }
  }, [address, addressL1]);

  useEffect(() => {
    if (!addressInput) {
      if (address) {
        disconnect();
      }
      if (addressL1) {
        disconnectL1();
      }
      setloading(true);
    }
  }, [loading, address, addressL1]);

  useEffect(() => {
    if (addressInput.length === 66 && address) {
      setwalletTypeSelected("L2");
    } else if (addressInput.length === 42 && addressL1) {
      setwalletTypeSelected("L1");
    } else {
      setwalletTypeSelected("");
    }
  }, [addressInput, address, addressL1]);

  useEffect(() => {
    if (walletTypeSelected === "L1") {
      if (claimAddress!=='') {
        if(claimAddress.length===42){
          setclaimAddressConfirmed(true)
        }else{
          setclaimAddressConfirmed(false)
        }
      }
    }else{
      if (claimAddress!=='') {
        if(claimAddress.length===66){
          setclaimAddressConfirmed(true)
        }else{
          setclaimAddressConfirmed(false)
        }
      }
    }
  }, [walletTypeSelected,claimAddress,]);

  useEffect(()=>{
    if(calltransaction){
      if(ticketId!==0){
        handleTransactionl1()
      }
    }
  },[calltransaction,ticketId])

  useEffect(()=>{
    if(walletTypeSelected==='L1'){
      if(claimAddress!==''){
        
      }
    }
  },[walletTypeSelected,claimAddress])

  return (
    <Box>
      <Box
        background={`
            radial-gradient(circle 1800px at top left, rgba(115, 49, 234, 0.10), transparent) top left,
            radial-gradient(circle 1200px at bottom right, rgba(115, 49, 234, 0.10), transparent) bottom right,
            black
          `}
        position={"fixed"}
        zIndex={3}
      >
        <Navbar />
      </Box>
      {
        <Box
          background={`
    radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.2), transparent),
    radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.2), transparent),
    black
  `}
          backgroundAttachment="fixed"
          position="relative"
          color="white"
          zIndex={1}
          padding="0"
          pr="4rem"
          pl={isLargerThan2000 ? "6rem" : "4rem"}
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          pt="6rem"
          pb={isLargerThan1280 ? "7rem" : "0rem"}
        >
          <Box
            position="absolute"
            top={addressAuthenticated ? "6%" : "8%"}
            left="12%"
            transform="rotate(120deg)"
          >
            <HashTokenIconFloater />
          </Box>
          <Box
            position="absolute"
            top={addressAuthenticated ? "11%" : "15%"}
            left="10%"
            width="14px"
            height="14px"
            bg="#9780FF"
            borderRadius="200px"
          />
          <Box
            position="absolute"
            top={addressAuthenticated ? "10%" : "14%"}
            right="8%"
          >
            <HashTokenIconFloater />
          </Box>
          <Box
            position="absolute"
            top={addressAuthenticated ? "7%" : "9%"}
            right="14%"
            width="14px"
            height="14px"
            bg="#9780FF"
            borderRadius="200px"
          />
          <Box width="100%">
            <Box width="100%">
              <Box display="flex" width='100%' justifyContent="center">
                <Text fontSize="56px">
                  Hashstack Provisions
                </Text>
              </Box>
              <Box width="100%" display="flex" justifyContent='center'>
                <Text maxW="1000px" mt="2rem" fontSize="16px" lineHeight="20px" textAlign="center">
                Hashstack team is excited to introduce the HSTK provisions. Over the 4 past years of our existence, we have been fortunate to have worked with the members of various groups in the form of product users, investors, community contributors who have helped advance Hashstack. Through out this journey, we have incentivised your participation through points, token allocation etc. Provisions page is where you claim them, the HSTK tokens.
                </Text>
              </Box>
              <Box display="flex" width='100%' justifyContent="center">
                <Text mt="3rem" color="#00D395" _hover={{textDecor:'underline'}} cursor="pointer">
                  Quick guide to HSTK provisions -{">"}
                </Text>
              </Box>

            </Box>
          </Box>
          <Box display="flex" width="100%" mb="0rem" mt="3rem">
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="32px" fontWeight="700">
                Check Your Eligibility
              </Text>
              <Box display="flex" mt="1rem" background="none">
                <InputGroup
                  width="650px"
                  mt="0rem"
                  border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                  borderRight="0px"
                  borderRadius="6px 0px 0px 6px"
                  height="50px"
                  bg="white"
                >
                  <Input
                    fontSize="16px"
                    height="100%"
                    border="none"
                    pl="0.5rem"
                    color="black"
                    placeholder="enter your address"
                    _placeholder={{}}
                    value={addressInput}
                    ml={"0.4rem"}
                    isDisabled={true}
                    onChange={(e) => {
                      setaddressDetails(null);
                      setaddressSearched(false)
                      setaddressAuthenticated(false);
                      setaddressInput(e.target.value);
                    }}
                    //   value={
                    //     totalBorrow == 0 && totalSupply == 0 ? '****' : refferal
                    //   }
                    paddingInlineStart="0"
                    _focus={{
                      outline: "0",
                      boxShadow: "none",
                    }}
                    //   onChange={handleChange}
                  />
                </InputGroup>
                {addressAuthenticated ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingLeft="16px"
                    paddingRight="16px"
                    borderRightRadius="6px"
                    bg="#323FF4"
                    height="50px"
                  >
                    <WhitetickIcon />
                    <Text ml="0.2rem">Authenticated</Text>
                  </Box>
                ) : addressDetails ? (
                  addressInput.length === 66 ? (
                    <ConnectStarknetWalletModal
                      cursor="pointer"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      paddingLeft="16px"
                      paddingRight="16px"
                      borderRightRadius="6px"
                      bg="#323FF4"
                      buttonText="Authenticate"
                      height="50px"
                    />
                  ) : (
                    <ConnectWalletL1Modal
                      cursor="pointer"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      paddingLeft="16px"
                      paddingRight="16px"
                      borderRightRadius="6px"
                      bg="#323FF4"
                      buttonText="Authenticate"
                      height="50px"
                    />
                  )
                ) : (
                  <Box
                    cursor="pointer"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingLeft="16px"
                    paddingRight="16px"
                    borderRightRadius="6px"
                    bg="#323FF4"
                    onClick={() => {
                      if (addressInput !== "") {
                        handleSearch();
                      }
                      // handleSearch()
                      // handleCopyClick()
                    }}
                  >
                    {addressSearched && (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#010409"
                        size="sm"
                        mr="0.4rem"
                      />
                    )}
                    {!addressSearched ? "Search" : "Verifiying"}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          {addressDetails && (
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              mt="1rem"
              gap="2rem"
            >
              <Box
                display="flex"
                color="white"
                alignItems="center"
                flexDirection="column"
                padding="32px"
                bg="#120F25"
                border="1px solid #2C2B48"
                borderRadius="6px"
                mt="1rem"
              >
                <Text fontWeight="600" fontSize="18px">
                  ${numberFormatter(totalClaimableAmount)}
                </Text>
                <Text>Total Claimable Amount</Text>
              </Box>
              <Box
                display="flex"
                color="white"
                alignItems="center"
                flexDirection="column"
                border="1px solid #2C2B48"
                padding="32px"
                bg="#120F25"
                borderRadius="6px"
                mt="1rem"
              >
                <Text fontWeight="600" fontSize="18px">
                  ${numberFormatter(currentClaimableAmount)}
                </Text>
                <Text>Current Claimable Amount</Text>
              </Box>
            </Box>
          )}
          {addressAuthenticated &&totalClaimableAmount!==0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="1.5rem"
              gap="2rem"
            >
              <Box
                display="flex"
                padding="32px"
                borderRadius="6px"
                flexDirection="column"
                bg="#120F25"
                border="1px solid #2C2B48"
                width="1000px"
              >
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AuthenticateIllustration />
                </Box>
                <Box display="flex" gap="0.3rem" mt="2rem">
                  <VerifiedUser />
                  <Text>You&apos;re almost there!</Text>
                </Box>
                <Text fontSize="24px" fontWeight="700" mt="0.8rem" maxW="95%">
                To claim HSTK tokens on a different account than that is registered with us. 
                This action is irreversible, and can only be changed once.
                </Text>
                <Box
                  display="flex"
                  mt="2.5rem"
                  gap="0.4rem"
                  alignItems="center"
                >
                  <Box
                    bg="#2B2B4A"
                    border="1px solid #2B2B4A"
                    borderRadius="8px"
                    padding="16px"
                    display="flex"
                    alignItems="center"
                    gap="0.2rem"
                    width="450px"
                    height="64px" // Set consistent height
                  >
                    {walletTypeSelected === "L1" ? (
                      <ETHLogo width={16} height={16} />
                    ) : (
                      <STRKLogo width={16} height={16} />
                    )}

                    <Text>{walletTypeSelected === "L1" ? "ETH" : "STRK"}</Text>
                    <Box ml="0.4rem" borderLeft="2px solid #3B4080">
                      <Text ml="0.4rem">
                        {walletTypeSelected === "L1"
                          ? `${addressL1?.substring(
                              0,
                              3
                            )}...${addressL1?.substring(
                              addressL1.length - 9,
                              addressL1.length
                            )}`
                          : `${account?.address.substring(
                              0,
                              3
                            )}...${account?.address.substring(
                              account?.address.length - 9,
                              account?.address.length
                            )}`}
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="64px" // Set same height
                  >
                    <Seperator />
                  </Box>
                  <Box display="flex" mt="0" marginTop="0.5rem" height="64px">
                    {" "}
                    {/* Ensure same height */}
                    <InputGroup
                      width="450px"
                      mt="0rem"
                      borderRight="0px"
                      borderRadius="6px"
                      bg="#2B2B4A"
                      height="100%" // Match parent height
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Input
                        fontSize="16px"
                        height="100%" // Match parent height
                        border="none"
                        color="white"
                        pl="0.8rem"
                        placeholder="enter your address"
                        value={claimAddress}
                        // isDisabled={claimAddressConfirmed}
                        onChange={(e) => {
                          setclaimAddress(e.target.value);
                        }}
                        paddingInlineStart="0"
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                      {claimAddressConfirmed?
                      !userConfirmation?
                      <ConfirmClaimModal
                      allocatedAddress={addressInput}
                      claimAddress={claimAddress}
                      walletTypeSelected={walletTypeSelected}
                      buttonText="Confirm"
                      mr="0.5rem"
                      bg="none"
                      border="1px solid white"
                      borderRadius="6px"
                      cursor="pointer"
                      padding="8px"
                      color="white"
                      _hover={{ bg: "white", color: "black" }}
                      />:                      <Button
                      mr="0.5rem"
                      bg="none"
                      border="1px solid white"
                      color="white"
                      _hover={{ bg: "white", color: "black" }}
                      // onClick={() => {
                      //   setclaimAddressConfirmed(true);
                      // }}
                      isDisabled={
                        userConfirmation
                      }
                    >
                      Confirm
                    </Button>:
                      <Button
                        mr="0.5rem"
                        bg="none"
                        border="1px solid white"
                        color="white"
                        _hover={{ bg: "white", color: "black" }}
                        // onClick={() => {
                        //   setclaimAddressConfirmed(true);
                        // }}
                        isDisabled={
                          claimAddress===""?true:!claimAddressConfirmed
                        }
                      >
                        Confirm
                      </Button>
                      }
                    </InputGroup>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  gap="1rem"
                  mt="1.5rem"
                  justifyContent="center"
                  mr="5.5rem"
                >
                  <Box display="flex" gap="0.5rem">
                    <Text>Current Claimable Amount</Text>
                    <Text>${numberFormatter(currentClaimableAmount)}</Text>
                  </Box>
                  <Box display="flex" gap="0.5rem" borderLeft="1px solid white">
                    <Text ml="1rem">Total Claimable Amount</Text>
                    <Text>${numberFormatter(totalClaimableAmount)}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box width="100%" mt="3rem">
            <Box ml="5rem" gap="0">
              <Box display="flex" gap="0.4rem" fontSize="40px">
                Are you eligible for <Text color="#FFD027">HSTK</Text> tokens ?
              </Box>
            </Box>
            <Box>
              {provisionCategories.map((catgeory: any, index: number) => (
                <Box key={index} ml="5rem">
                  <Box
                    display="flex"
                    gap="3rem"
                    mt="1.5rem"
                    alignItems="center"
                  >
                    <Box
                      borderRadius="6px"
                      border="1px solid #2C2B48"
                      width="360px"
                    >
                      <Image src={catgeory.icon} alt="" />
                    </Box>
                    <Box display="flex" flexDir="column">
                      <Text color="#F0F0F5" fontSize="32px" fontWeight="800">
                        {catgeory.id}
                      </Text>
                      <Text maxW="700px">
                        {catgeory.description}
                      </Text>
                      {addressDetails && (
                        <Box display="flex" gap="1.5rem" mt="0.4rem">
                          <Box>
                            <Text>${numberFormatter(catgeory.claimableAmount)}</Text>
                            <Text>Claimable Amount</Text>
                          </Box>
                          <Box
                            height="50px"
                            borderLeft="2px solid #2C2B48"
                            borderRadius="6px"
                          ></Box>
                          <Box>
                            <Text>${numberFormatter(catgeory.currentClaimableAmount)}</Text>
                            <Text>Current Claimable Amount</Text>
                          </Box>
                          <Box
                            height="50px"
                            borderLeft="2px solid #2C2B48"
                            borderRadius="6px"
                          ></Box>
                          <Box>
                            <Text ml="0.4rem">{numberFormatterPercentage(catgeory.EmissionRate)}%</Text>
                            <Text ml="0.4rem">Emisiion Rate</Text>
                          </Box>
                        </Box>
                      )}
                      {addressAuthenticated && (
                        <Button
                          bg="none"
                          border="1px solid #F0F0F5"
                          color="#F0F0F5"
                          width="200px"
                          height="35px"
                          mt="0.4rem"
                          _hover={{
                            background: "white",
                            color: "black",
                          }}
                          isDisabled={catgeory.ticketId===0? catgeory.claimableAmount===0:claimAddress!==""?!userConfirmation: catgeory.currentClaimableAmount===0}
                          onClick={()=>{
                            if(catgeory.id==="Investors" || catgeory.id==="Others"){
                              setticketId(catgeory.ticketId)
                              setcalltransaction(true)
                            }
                          }}
                        >
                          Claim
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Box
                    height="1px"
                    border="1px solid #2C2B48"
                    mt="1.5rem"
                  ></Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* <Text color="white" mt="3rem" mb="2rem">
          Tokenomics
        </Text>
        <ContributorsChart/> */}
        </Box>
      }
    </Box>
  );
}
