import DiscordLogo from '@/assets/discordLogo'
import HashstackLogo from '@/assets/hashstacklogo'
import SettingsLogo from '@/assets/settingsLogo'
import { HStack,Text,Box, Skeleton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useDisclosure, DrawerCloseButton, useMediaQuery } from '@chakra-ui/react'
  import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
// import "./Navbar.css";

const Navbar = () => {
  const [NavDropdown, setNavDropdown] = useState(false)
  const [addressFetched, setaddressFetched] = useState(false)
  const{address}=useAccount();
  const {disconnect} = useDisconnect();
  const [isLessThan1210] = useMediaQuery("(max-width: 1210px)");
  const [isLessThan700] = useMediaQuery("(max-width: 700px)");
  const router = useRouter()
  useEffect(()=>{
    if(address){
      setaddressFetched(true)
    }
  },[address])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (newSize: any) => {
    // setSize(newSize);
    // toggleDrawer();
    onOpen();
  };
  // co
  return (
    <HStack
    padding="10px"
    width="100vw"
    display="flex"
    background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px"
      justifyContent="space-between"
      alignItems="center"
      color="#fff"
      height="3.8125rem"
    >
      <Box display="flex" gap="2rem">
        <Box  ml="1rem" cursor="pointer" onClick={()=>{
          router.push('/provisions')
        }}>
          <HashstackLogo/>
        </Box>
        {!isLessThan1210 &&<Box display="flex" gap="1rem" justifyContent="center" alignItems="center">
          <Box cursor="pointer" onClick={()=>{
            router.push('/provisions')
          }}>
            <Text color={router.pathname==='/provisions'? "#4D59E8":"#676D9A"}>
              Provisions
            </Text>
          </Box>
          <Box cursor="pointer" onClick={()=>{
            router.push('/tokenomics')
          }}>
            <Text color={router.pathname==='/tokenomics'? "#4D59E8":"#676D9A"}>
              Tokenomics
            </Text>
          </Box>
          <Box>
            <Link href="https://app.hashstack.finance" target='blank'>
              <Text color={"#676D9A"}>
                Go to App
              </Text>
            </Link>
          </Box>
        </Box>}
      </Box>
        {isLessThan1210 && <Box border="2px solid #2C2B48" padding="2px" borderRadius="6px" onClick={() => handleClick("sm")}>
          <Image
            src="/hamburgerIcon.svg"
            alt="picture of author"
          width={isLessThan700?30: 40}
          height={isLessThan700?30: 40}
          />
        </Box>}
        {!isLessThan1210 &&<HStack color="white" mr="1rem">
          <Box color="#676D9A" mr="0.5rem">
          Need help? Talk to us:
          </Box>
          <Link href="https://discord.com/invite/VaThqq8vbS" target="blank">
            <Box display="flex" alignItems="center" gap="0.3rem" cursor="pointer">
              <DiscordLogo/>
              <Text color="#676D9A">
                Discord
              </Text>
            </Box>
          </Link>
            {/* <Text color="white">
                Connect Wallet
            </Text> */}
            {
          //   addressFetched && address &&  
          //   <Box
          //     position={'relative'}
          //   fontSize="12px"
          //   color="#FFF"
          //   // width="13rem"
          //   height="2rem"
          //   cursor="pointer"
          //   display="flex"
          //   flexDirection="column"
          //   alignItems="center"
          //   justifyContent="center"
          //   gap="10px"
          //   flexGrow="1"
          //   // ref={ref2}
          // >
          //   <Box
          //     // backgroundColor="#2DA44E"
          //     display="flex"
          //     border="1px solid var(--secondary, #4D59E8)"
          //     borderRadius="6px"
          //     flexDirection="row"
          //     paddingY="6px"
          //     pr="1rem"
          //     pl="1rem"
          //     justifyContent="flex-start"
          //     alignItems="center"
          //     gap="5px"
          //     width="100%"
          //     height="100%"
          //     // bgColor="blue"
          //     onClick={() => {
          //       setNavDropdown(!NavDropdown);
          //     }}
          //   >
          //     {addressFetched && address ? (
          //       <Box
          //         // bgColor="red"
          //         width="100%"
          //         // gap={1}
          //         display="flex"
          //         justifyContent="flex-start"
          //         alignItems="center"
          //         // pl={5}
          //         gap={5.5}
          //       >
          //         {/* <Image
          //           // onClick={() => {
          //           //   setConnectWallet(false);
          //           // }}
          //           alt=""
          //           src={"/starknetLogoBordered.svg"}
          //           width="16"
          //           height="16"
          //           style={{ cursor: "pointer" }}
          //         /> */}
          //         <Text
          //           fontSize="14px"
          //           fontWeight="500"
          //           color="#FFFFFF"
          //           lineHeight="20px"
          //           display="flex"
          //           justifyContent="center"
          //           alignItems="center"
          //           // bgColor="blue"
          //         >
          //           {/* {`${account.substring(0, 3)}...${account.substring(
          //             account.length - 10,
          //             account.length
          //           )}`}{" "} */}
          //           {`${address.substring(
          //             0,
          //             3
          //           )}...${address.substring(
          //             address.length - 9,
          //             address.length
          //           )}`}{" "}
          //         </Text>
          //       </Box>
          //     ) : (
          //       <>
          //         <Skeleton width="7rem" height="100%" borderRadius="2px" />
          //       </>
          //     )}
          //     <Box  right="0.7rem">
          //       {!NavDropdown ? (
          //         <Image
          //           src={"/connectWalletArrowDown.svg"}
          //           alt="arrow"
          //           width="16"
          //           height="16"
          //           style={{
          //             cursor: "pointer",
          //           }}
          //         />
          //       ) : (
          //         <Image
          //           src={"/connectWalletArrowDown.svg"}
          //           alt="arrow"
          //           width="16"
          //           height="14"
          //           style={{
          //             cursor: "pointer",
          //           }}
          //         />
          //       )}
          //     </Box>
          //   </Box>
          //   {NavDropdown && (
          //     <Box
          //       width="100%"
          //       display="flex"
          //       position={"absolute"}
          //       top= "100%"
          //       left= "0"
          //       zIndex= "2"
          //       justifyContent="center"
          //       flexDirection="column"
          //       alignItems="flex-end"
          //       gap="7px"
          //       padding="0.5rem 0"
          //       mt="0.4rem"
          //       boxShadow="1px 2px 8px rgba(0, 0, 0, 0.5), 4px 8px 24px #010409"
          //       borderRadius="6px"
          //       background="var(--Base_surface, #02010F)"
          //       border="1px solid rgba(103, 109, 154, 0.30)"
          //     >
          //       {address ? (
          //         // walletConnectionDropdown.map((val, idx) => {
          //         //   return (
          //         <>
          //           <Box
          //             // key={idx}
          //             padding="4px 11px"
          //             marginRight="8px"
          //             borderRadius="6px"
          //             background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
          //             border="1px solid #2B2F35"
          //             onClick={() => {
          //               setNavDropdown(false);
          //               disconnect();
          //               router.push("/registrations")

          //             }}
          //           >
          //             Disconnect
          //           </Box>
                  
          //         </>
          //       ) : (
          //         //   );
          //         // })
          //         <Box
          //           padding="4px 11px"
          //           marginRight="8px"
          //           borderRadius="6px"
          //           border="1px solid #2B2F35"
          //           background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
          //           onClick={() => {
          //             // alert("hey");
          //             // const walletConnected =
          //             //   localStorage.getItem("lastUsedConnector");
          //             // if (connector?.options?.id == "braavos") {
          //             //   disconnect();
          //             //   connect(connectors[1]);
          //             // } else {
          //             //   disconnect();
          //             //   connect(connectors[0]);
          //             // }
          //             ////console.log("navbar", account);
          //             // localStorage.setItem("account", JSON.stringify(account));
          //           }}
          //         >
          //           Connect
          //         </Box>
          //       )}
     
          //     </Box>
          //   )}
          // </Box>
          }
            {/* <Text color="white">
                <SettingsLogo/>
            </Text> */}
        </HStack>}
        <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
          <DrawerOverlay />
          <DrawerContent zIndex={500}>
            {/* <DrawerCloseButton width="50%"  /> */}
            <DrawerBody padding="0">
              <Box display="flex" bg="#000" alignItems="center" height="100vh" flexDirection="column">
                <Box display="flex" flexDirection="row" cursor="pointer" mt="2rem">
                  {/* {isLessThan500 ? <HashstackLogoMobile /> : <HashstackLogo />} */}
                </Box>
                <Text
                  color={router.pathname==='/provisions'? "#4D59E8":"#fff"}
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  lineHeight="20px"
                  cursor="pointer"
                  height="64px"
                  mt="2rem"
                  border="1px solid rgb(26, 26, 31)"
                  mb="0rem"
                  onClick={()=>{
                    router.push('/provisions')
                  }}
                >
                  Provisions
                </Text>
                <Text
                  color={router.pathname==='/tokenomics'? "#4D59E8":"#fff"}
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  lineHeight="20px"
                  cursor="pointer"
                  height="64px"
                  // mt="2rem"
                  border="1px solid rgb(26, 26, 31)"
                  mb="0rem"
                  onClick={()=>{
                    router.push('/tokenomics')
                  }}
                >
                  Tokenomics
                </Text>
                <Text
                  color="#fff"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgb(26, 26, 31)"
                  margin="0"
                  onClick={() => {
                    router.push('https://docs.hashstack.finance/')
                  }}
                >
                  Docs
                </Text>
                <Text
                  color="#fff"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgb(26, 26, 31)"
                  margin="0"
                  onClick={() => {
                    router.push('https://docs.hashstack.finance/developers/')
                  }}
                >
                  Developers
                </Text>
                <Text
                  color="#fff"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgb(26, 26, 31)"
                  margin="0"
                  onClick={() => {
                    router.push('https://docs.hashstack.finance/developers/supply-and-borrow/borrow/use-cases')
                  }}
                >
                  Use-cases
                </Text>
                <Text
                  color="#fff"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgb(26, 26, 31)"
                  margin="0"
                >
                  HASH token
                </Text>
                <Text
                  color="#fff"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgb(26, 26, 31)"
                  margin="0"
                  onClick={() => {
                    router.push('https://app.hashstack.finance/v1/airdrop_leaderboard')
                  }}
                >
                  Airdrop Leaderboard
                </Text>
                <Box>
                </Box>
                <Text
                  color="#fff"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgb(26, 26, 31)"
                  margin="0"
                  onClick={() => {
                    router.push('https://hashstack.finance/c2e')
                  }}
                >
                  Contribute-2-Earn
                </Text>
              </Box>
                <DrawerCloseButton position="fixed" bottom="10%" top="74%"  left="45%" width="48px" height="48px" borderRadius="8px" bg="transparent" color="white"/>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </HStack>
  )
}

export default Navbar