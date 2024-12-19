import {
  Box,
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Th,
  Text,
  Tooltip,
  Tbody,
  VStack,
  HStack,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import numberFormatter from "@/functions/numberFormatter";
import HashstackIllustrationTokenomics from "@/assets/hashstackIllustrationTokenomics";
import AdoptionIncentives from "@/assets/adoptionIncentives";
import CommunityIncentives from "@/assets/communityIncentives";
import ProductIncentives from "@/assets/productIncentives";
import FoundersIncentives from "@/assets/foundersIncentives";
import ExchangeLiquidity from "@/assets/exchangeLiquidity";
const EmissionDashboard = () => {
  const tooltips = [
    "",
    "",
    "Tokens held as security for tokenomiced funds.",
    "Collateral you will be using to execute the strategy.",
    "Leverage you will be getting. If you increase the collateral amount the leverage will be reduced and vice versa.",
    "The quantity of tokens you want to tokenomic from the title.",
    "Estimated maximum return you may receive from the strategy.",
    "Loan risk metric comparing collateral value to tokenomiced amount to check potential liquidation.",
  ];
  const columnItems = [
    "Category",
    "Sub",
    "Distribution",
    "Total",
    "Unlock & vesting",
  ];
  const data = [
    {
      title: "Hastack Investors",
      subData: ["Private round"],
      distributions: [18],
      totals: [1620000000],
      icon: HashstackIllustrationTokenomics,
      criterias: [
        "10% unlocked at tge, 3 months cliff, 15 months linear release.",
      ],
    },
    {
      title: "Adoption Incentives",
      subData: [
        "Airdrop",
        "Integration Incentives",
        "Liquidity mining",
      ],
      distributions: [2.4, 7, 15],
      icon: AdoptionIncentives,
      totals: [216000000, 630000000, 1350000000],
      criterias: [
        "6 months cliff. 3 months linear release",
        "0% unlocked at tge. 12.5% quarterly deployed over 24 months",
        "60% dripped over 24 months after lockdrop. Equally distributed to supply/borrow. 40% non-linearly dripped over 20 months.",
      ],
    },
    {
      title: "Community",
      subData: ["Community"],
      distributions: [3.3],
      icon: CommunityIncentives,
      totals: [297000000],
      criterias: ["3 months cliff, linear release over 24 months"],
    },
    {
      title: "Product development",
      subData: ["Infrastructure fund"],
      distributions: [14],
      icon: ProductIncentives,
      totals: [1260000000],
      criterias: ["9 months cliff, 36 months linear release"],
    },
    {
      title: "Founder(s) & team",
      subData: ["Team"],
      distributions: [26],
      icon: FoundersIncentives,
      totals: [2340000000],
      criterias: ["12 months cliff, linear release for 48 months"],
    },
    {
      title: "Exchange liquidity",
      subData: ["Exchange Liquidity"],
      distributions: [14.3],
      icon: ExchangeLiquidity,
      totals: [1287000000],
      criterias: [
        "25% unlocked within 7 days of tge. 75% linear release over 12 months",
      ],
    },
  ];
  const [isSmallerThan1250] = useMediaQuery("(max-width: 1250px)");
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  return (
    <Box
      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
      bg="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
      borderRadius="8px"
      p={8}
      shadow="lg"
      color="white"
      overflow={isSmallerThan1250 ? "scroll" : "hidden"}
      overflowX="visible"
    >
      <TableContainer   css={{
    '&::-webkit-scrollbar': {
      display: 'block', // Override global styles
      height: '8px', // Ensure the scrollbar height is defined
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(103, 109, 154, 0.5)', // Style the thumb
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(103, 109, 154, 0.2)', // Style the track
    },
  }} overflowX="visible"  overflow={isSmallerThan1250 ? "scroll" : "hidden"}>
        <Text fontSize={isSmallerThan500?"22px": "32px"} fontWeight="600" mb="1rem">
          HSTK Tokenomics
        </Text>
        <Table variant="unstyled" width="100%">
          <Thead>
            <Tr>
              {columnItems.map((columnItem, index: number) => (
                <Td
                  key={index}
                  color="#676D9A"
                  fontSize={isSmallerThan500?"14px": "16px"}
                  fontWeight="500"
                  textAlign="left"
                >
                  {columnItem}
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) =>
              item.subData.map((sub, idx) => (
                <Box
                  as="tr"
                  key={`${index}-${idx}`}
                  border="1px solid rgba(103, 109, 154, 0.30)" // Full row border
                  borderRadius="8px" // Rounded corners
                  color="#F0F0F5"
                  display="table-row" // Ensure it behaves as a table row
                >
                  {idx === 0 && (
                    <Td
                      rowSpan={item.subData.length}
                      color="#F0F0F5"
                      fontSize={isSmallerThan500?"12px": "16px"}
                      // display="flex"
                      // justifyContent="center"
                      // alignItems="center"
                      gap="0.5rem"
                      width="200px" // Increased width for better space
                      whiteSpace="normal" // Allows text wrapping
                      wordBreak="break-word" // Break long words if needed
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="0.5rem"
                        fontSize={isSmallerThan500?"12px": "16px"}
                        whiteSpace="nowrap"
                      >
                        {item.icon && <item.icon />}
                        {item.title}
                      </Box>
                    </Td>
                  )}
                  <Td
                    width="180px" // Increased width for the "SUB" column
                    wordBreak="break-word" // Breaks long words
                    fontWeight="300"
                    fontSize={isSmallerThan500?"12px": "16px"}
                   whiteSpace="nowrap" 
                  >
                    {sub}
                  </Td>
                  <Td
                    color="#F0F0F5"
                    fontSize={isSmallerThan500?"12px": "16px"}
                    width="100px"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    fontWeight="300"
                  >
                    {item.distributions[idx]}%
                  </Td>
                  <Td
                    color="#F0F0F5"
                    fontSize={isSmallerThan500?"12px": "16px"}
                    width="120px"
                    whiteSpace="nowrap"
                    wordBreak="break-word"
                    fontWeight="300"
                  >
                    {numberFormatter(item.totals[idx])}
                  </Td>
                  <Td
                    width="200px" // Allocated more space to this column
                    whiteSpace="normal"
                    wordBreak="break-word"
                    fontWeight="300"
                  >
                    <Text color="#F0F0F5" fontSize={isSmallerThan500?"12px": "16px"}>
                      {item.criterias[idx]}
                    </Text>
                  </Td>
                </Box>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmissionDashboard;
