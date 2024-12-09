import Navbar from "@/components/Navbar";
import ContributorsChart from "@/components/charts/ContributorsChart";
import {
  Box,
  HStack,
  Spinner,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DetailsForm from "@/components/Form/DetailsForm";
import { useAccount, useBalance } from "wagmi";
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

export default function Tokenomics() {
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1248px)");

  // const
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 2000);
  }, []);
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
      { (
        <Box
        background={`
          radial-gradient(circle 600px at 30% 10%, rgba(83, 49, 234, 0.2), transparent),
          radial-gradient(circle 600px at bottom right, rgba(83, 49, 234, 0.3), transparent),
          black
        `}
        backgroundAttachment="fixed"
        position="relative"
          color="white"
          zIndex={1}
          padding="0"
          // mb="4rem"
          // pr="4rem"
          pl={isLargerThan2000 ? "6rem" : "4rem"}
          display="flex"
          flexDirection="column"
          minHeight={"100vh"}
          pt="6rem"
          pb={isLargerThan1280 ? "7rem" : "0rem"}
        >
          <Text
            borderBottom={"thick"}
            color="white"
            width={"15%"}
            display="flex"
            flexDirection={"row"}
            justifyContent="begin"
          ></Text>
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            gap="14%"
            mb="2rem"
          >
            <Box display="flex" flexDirection="column" gap="1rem" maxW="700px">
              <Text fontSize="52px" fontWeight="700" maxW="400px">Lorem ipsum dolor sit amet</Text>
              <Text maxW="400px">
                Lorem ipsum dolor sit amet consectetur. Placerat felis sapien
                nunc maecenas arcu commodo ultricies consectetur. Blandit vitae
                duis tristique ut sed.
              </Text>
              <Box height="1px" border="1px solid #272943" width="60%"></Box>
              <Box display="flex" flexDirection="column" mt="0.5rem">
                    <Box borderRadius="500px" bg="#7331EA" width="22px" height="22px" display="flex" justifyContent="center" alignItems="center">
                        1
                    </Box>
                    <Text mt="0.8rem" fontWeight="700">
                        Store of authority(Governance)
                    </Text>
                    <Text mt="0.5rem" lineHeight="20px" fontSize="16px" color="#676D9A">
                    To enable decentralised governance.
                    </Text>
                </Box>
                <Box display="flex" flexDirection="column" mt="0.5rem">
                    <Box borderRadius="500px" bg="#7331EA" width="22px" height="22px" display="flex" justifyContent="center" alignItems="center">
                        2
                    </Box>
                    <Text mt="0.8rem" fontWeight="700">
                    Store of authority(Store of value(Utility))
                    </Text>
                    <Text mt="0.5rem" lineHeight="20px" fontSize="16px" color='#676D9A' maxW="500px">
                    For payment of in-dapp transaction fees, compensating partner projects, KOLs, and community participants who help secure/further the Hashstack ecosystem.
                    </Text>
                </Box>
                <Box display="flex" flexDirection="column" mt="0.5rem">
                    <Box borderRadius="500px" bg="#7331EA" width="22px" height="22px" display="flex" justifyContent="center" alignItems="center">
                        3
                    </Box>
                    <Text mt="0.8rem" fontWeight="700">
                    Unlock liquidator role
                    </Text>
                    <Text mt="0.5rem" lineHeight="20px" fontSize="16px" color="#676D9A" maxW="500px">
                    Liquidators on Hashstack take the responsibility of repaying the bad debt to the Hashstack protocol, in-exchange for acquiring them at a discount.
                    </Text>
                </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="0rem"
              mt="2rem"
            >
              <ContributorsChart />
              <Box display="flex" flexDirection="column" gap="2rem" mt="3rem">
                <Box display="flex" gap="1.5rem">
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderLeft="4px solid #3E7CFF"
                  >
                    <Text ml="0.4rem" fontWeight="700">
                      13.4%
                    </Text>
                    <Text ml="0.4rem" fontWeight="600" color="#676D9A">
                      Hashstack Investors
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderLeft="4px solid #00D395"
                  >
                    <Text ml="0.4rem" fontWeight="700">
                      29%
                    </Text>
                    <Text ml="0.4rem" fontWeight="600" color='#676D9A'>
                      Adoption Incentives
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderLeft="4px solid #00C7F2"
                  >
                    <Text ml="0.4rem" fontWeight="700">
                      3.3%
                    </Text>
                    <Text ml="0.4rem" fontWeight="600" color="#676D9A">
                      Community
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" gap="1.5rem">
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderLeft="4px solid #FFAB80"
                  >
                    <Text ml="0.4rem" fontWeight="700">
                      14%
                    </Text>
                    <Text ml="0.4rem" fontWeight="600" color="#676D9A">
                      Product development
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderLeft="4px solid #A38CFF"
                  >
                    <Text ml="0.4rem" fontWeight="700">
                      26%
                    </Text>
                    <Text ml="0.4rem" fontWeight="600" color="#676D9A">
                      Founder(s) & team
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderLeft="4px solid #FFD347"
                  >
                    <Text ml="0.4rem" fontWeight="700">
                      14.3%
                    </Text>
                    <Text ml="0.4rem" fontWeight="600" color='#676D9A'>
                      Exchange liquidity
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box paddingLeft="7rem" paddingRight="7rem" mt="2rem">
            <EmissionDashboard />
          </Box>
          <HStack
            mt="3rem"
            w="100%"
            h="30%"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            paddingLeft="7rem"
            paddingRight="7rem"
          >
            <EmissionRateChart />
          </HStack>

          {/* <Text color="white" mt="3rem" mb="2rem">
          Tokenomics
        </Text>
        <ContributorsChart/> */}
        </Box>
      )}
    </Box>
  );
}
