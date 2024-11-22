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
import { erc20ABI, useBalance, useContractWrite,useAccount as useAccountL1 } from "wagmi";
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
import { useAccount } from "@starknet-react/core";
import ConnectWalletL1Modal from "@/components/modals/ConnectWalletL1Modal";
export default function Provisions() {
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1248px)");
  const [addressSearched, setaddressSearched] = useState<boolean>(false);
  const [addressDetails, setaddressDetails] = useState(1);
  const [addressAuthenticated, setaddressAuthenticated] =
    useState<boolean>(false);
  const [addressInput, setaddressInput] = useState("");

  // const
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 2000);
  }, []);

  const handleSearch = async () => {};
  const {
    data,
    isSuccess,
    isError,
    writeAsync: writeApproval,
  } = useContractWrite({
    address: `0x`,
    abi: erc20ABI,
    functionName: "approve",
    args: [`0x`, BigInt(30 * 1000000)],
    chainId:
      process.env.NEXT_PUBLIC_NODE_ENV == "mainnet"
        ? polygon.id
        : polygonMumbai.id,
  });
  const { address:addressL1 } = useAccountL1();
  const { address } = useAccount();
  console.log(addressL1,'l1')
  useEffect(() => {
    if (addressInput !== "") {
    }
  }, [addressInput]);

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
    radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.3), transparent),
    radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.3), transparent),
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
            top="8%"
            left="18%"
            transform="rotate(120deg)"
          >
            <HashTokenIconFloater />
          </Box>
          <Box
            position="absolute"
            top="13%"
            left="24%"
            width="14px"
            height="14px"
            bg="#9780FF"
            borderRadius="200px"
          />
          <Box position="absolute" top="12%" right="18%">
            <HashTokenIconFloater />
          </Box>
          <Box
            position="absolute"
            top="9%"
            right="24%"
            width="14px"
            height="14px"
            bg="#9780FF"
            borderRadius="200px"
          />
          <Box display="flex" width="100%" mb="0rem">
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="56px" fontWeight="700">
                Borrow 500% of your
              </Text>
              <Text fontSize="56px" fontWeight="700">
                collateral for liquidity
              </Text>
              <Box display="flex" mt="0" background="none" marginTop="0.5rem">
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
                    onChange={(e) => {
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
                {addressDetails ? (
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
                        setaddressSearched(!addressSearched);
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
                color="black"
                alignItems="center"
                flexDirection="column"
                padding="16px"
                bg="#00CE8A"
                borderRadius="6px"
                mt="1rem"
              >
                <Text fontWeight="600" fontSize="18px">
                  $44000
                </Text>
                <Text>Total Claimable Amount</Text>
              </Box>
              <Box
                display="flex"
                color="black"
                alignItems="center"
                flexDirection="column"
                padding="16px"
                bg="#9780FF"
                borderRadius="6px"
                mt="1rem"
              >
                <Text fontWeight="600" fontSize="18px">
                  $44000
                </Text>
                <Text>Current Claimable Amount</Text>
              </Box>
            </Box>
          )}
          {addressAuthenticated && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="1rem"
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
                  <Text>You$apos;re almost there!</Text>
                </Box>
                <Text fontSize="24px" fontWeight="700" mt="0.8rem">
                  Your wallet is successfully connected—just one more step to
                  go!
                </Text>
                <Text>
                  Simply add a claim address to verify this wallet belongs to
                  you
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
                    <ETHLogo width={16} height={16} />
                    <Text>ETH</Text>
                    <Box ml="0.4rem" borderLeft="2px solid #3B4080">
                      <Text ml="0.2rem">0x050111...a1de3534</Text>
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
                    >
                      <Input
                        fontSize="20px"
                        height="100%" // Match parent height
                        border="none"
                        color="white"
                        placeholder="enter your address"
                        value={addressInput}
                        onChange={(e) => {
                          setaddressInput(e.target.value);
                        }}
                        paddingInlineStart="0"
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
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
                    <Text>$ 500</Text>
                  </Box>
                  <Box display="flex" gap="0.5rem" borderLeft="1px solid white">
                    <Text ml="1rem">Total Claimable Amount</Text>
                    <Text>$ 500</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box width="100%" mt="2rem">
            <Box ml="5rem" gap="0">
              <Text fontSize="40px">Are you eligible</Text>
              <Box display="flex" fontSize="40px" gap="0.5rem">
                <Text>for</Text>
                <Text color="#FFD027">HSTK</Text>
                <Text>tokens ?</Text>
              </Box>
            </Box>
            <Box ml="5rem">
              <Box display="flex" gap="3rem" mt="1.5rem" alignItems="center">
                <Box
                  borderRadius="6px"
                  border="1px solid #2C2B48"
                  width="440px"
                >
                  <Image src={airdropIcon} alt="" />
                </Box>
                <Box display="flex" flexDir="column" gap="1rem">
                  <Text color="#F0F0F5" fontSize="40px" fontWeight="800">
                    Airdrop 1
                  </Text>
                  <Text maxW="500px">
                    Lorem ipsum dolor sit amet consectetur. Suscipit lectus
                    gravida vitae commodo nulla pretium.
                  </Text>
                  {addressDetails && (
                    <Box display="flex" gap="2rem">
                      <Box>
                        <Text>987</Text>
                        <Text>Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">987</Text>
                        <Text ml="0.4rem">Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">$987</Text>
                        <Text ml="0.4rem">Claimable Amount</Text>
                      </Box>
                    </Box>
                  )}
                  {addressAuthenticated && (
                    <Button
                      bg="none"
                      border="1px solid #F0F0F5"
                      color="#F0F0F5"
                      width="200px"
                    >
                      Claim
                    </Button>
                  )}
                </Box>
              </Box>
              <Box display="flex" gap="3rem" mt="1.5rem" alignItems="center">
                <Box
                  borderRadius="6px"
                  border="1px solid #2C2B48"
                  width="440px"
                >
                  <Image src={ccpIcon} alt="" />
                </Box>
                <Box display="flex" flexDir="column" gap="1rem">
                  <Text color="#F0F0F5" fontSize="40px" fontWeight="800">
                    Airdrop 1
                  </Text>
                  <Text maxW="500px">
                    Lorem ipsum dolor sit amet consectetur. Suscipit lectus
                    gravida vitae commodo nulla pretium.
                  </Text>
                  {addressDetails && (
                    <Box display="flex" gap="2rem">
                      <Box>
                        <Text>987</Text>
                        <Text>Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">987</Text>
                        <Text ml="0.4rem">Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">$987</Text>
                        <Text ml="0.4rem">Claimable Amount</Text>
                      </Box>
                    </Box>
                  )}
                  {addressAuthenticated && (
                    <Button
                      bg="none"
                      border="1px solid #F0F0F5"
                      color="#F0F0F5"
                      width="200px"
                    >
                      Claim
                    </Button>
                  )}
                </Box>
              </Box>
              <Box display="flex" gap="3rem" mt="1.5rem" alignItems="center">
                <Box
                  borderRadius="6px"
                  border="1px solid #2C2B48"
                  width="440px"
                >
                  <Image src={airdropIcon} alt="" />
                </Box>
                <Box display="flex" flexDir="column" gap="1rem">
                  <Text color="#F0F0F5" fontSize="40px" fontWeight="800">
                    Airdrop 1
                  </Text>
                  <Text maxW="500px">
                    Lorem ipsum dolor sit amet consectetur. Suscipit lectus
                    gravida vitae commodo nulla pretium.
                  </Text>
                  {addressDetails && (
                    <Box display="flex" gap="2rem">
                      <Box>
                        <Text>987</Text>
                        <Text>Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">987</Text>
                        <Text ml="0.4rem">Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">$987</Text>
                        <Text ml="0.4rem">Claimable Amount</Text>
                      </Box>
                    </Box>
                  )}
                  {addressAuthenticated && (
                    <Button
                      bg="none"
                      border="1px solid #F0F0F5"
                      color="#F0F0F5"
                      width="200px"
                    >
                      Claim
                    </Button>
                  )}
                </Box>
              </Box>
              <Box display="flex" gap="3rem" mt="1.5rem" alignItems="center">
                <Box
                  borderRadius="6px"
                  border="1px solid #2C2B48"
                  width="440px"
                >
                  <Image src={airdropIcon} alt="" />
                </Box>
                <Box display="flex" flexDir="column" gap="1rem">
                  <Text color="#F0F0F5" fontSize="40px" fontWeight="800">
                    Airdrop 1
                  </Text>
                  <Text maxW="500px">
                    Lorem ipsum dolor sit amet consectetur. Suscipit lectus
                    gravida vitae commodo nulla pretium.
                  </Text>
                  {addressDetails && (
                    <Box display="flex" gap="2rem">
                      <Box>
                        <Text>987</Text>
                        <Text>Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">987</Text>
                        <Text ml="0.4rem">Tokens</Text>
                      </Box>
                      <Box borderLeft="2px solid #2C2B48">
                        <Text ml="0.4rem">$987</Text>
                        <Text ml="0.4rem">Claimable Amount</Text>
                      </Box>
                    </Box>
                  )}
                  {addressAuthenticated && (
                    <Button
                      bg="none"
                      border="1px solid #F0F0F5"
                      color="#F0F0F5"
                      width="200px"
                    >
                      Claim
                    </Button>
                  )}
                </Box>
              </Box>
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
