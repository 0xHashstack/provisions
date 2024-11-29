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
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import numberFormatter from "@/functions/numberFormatter";
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
    "ID",
    "sub",
    "Distribution",
    "Total",
    "Unlock & vesting",
  ];
  const data = [
    {
      title: "Hastack Investors",
      subData: ["Private round", "Public sale"],
      distributions: [11.4, 2],
      totals: [1026000000, 180000000],
      criterias: [
        "10% unlocked at tge, 3 months cliff, 15 months linear release.",
        "25% unlocked at tge, 3 months cliff, 6 months linear release(hourly).",
      ],
    },
    {
      title: "Adoption Incentives",
      subData: [
        "Airdrop",
        "Grants - Build on Hashstack",
        "Integration Incentives",
        "Liquidity mining",
      ],
      distributions: [2, 5, 7, 15],
      totals: [180000000, 450000000, 630000000, 1350000000],
      criterias: [
        "6 months cliff. 3 months linear release(hourly)",
        "0% unlocked at tge. 12.5% quarterly deployed over 24 months",
        "0% unlocked at tge. 60% linearly deployed in year 1, 24% in year 2. 16% in year 3",
        "60% dripped over 24 months after lockdrop. Equally distributed to supply/borrow. 40% non-linearly dripped over 20 months.",
      ],
    },
    {
      title: "Community",
      subData: ["Community"],
      distributions: [3.3],
      totals: [297000000],
      criterias: ["3 months cliff, linear release over 24 months"],
    },
    {
      title: "Product development",
      subData: ["Infrastructure fund"],
      distributions: [14],
      totals: [1260000000],
      criterias: ["9 months cliff, 36 months linear release"],
    },
    {
      title: "Founder(s) & team",
      subData: ["Team"],
      distributions: [26],
      totals: [2340000000],
      criterias: ["12 months cliff, linear release for 48 months"],
    },
    {
      title: "Exchange liquidity",
      subData: ["Exchange Liquidity"],
      distributions: [14.3],
      totals: [1287000000],
      criterias: [
        "25% unlocked within 7 days of tge. 75% linear release over 12 months",
      ],
    },
  ];
  return (
    <Box
      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
      bg="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
      borderRadius="8px"
      p={8}
      shadow="lg"
      color="white"
    >
      <TableContainer>
        <Table variant="unstyled" width="100%">
          <Thead>
            <Tr>
              {columnItems.map((columnItem, index: number) => (
                <Th
                  key={index}
                  color="#BDBFC1"
                  fontSize="sm"
                  textAlign="left"
                >
                  {columnItem}
                </Th>
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
        display="table-row" // Ensure it behaves as a table row
      >
        {idx === 0 && (
          <Td
            rowSpan={item.subData.length}
            color="#F0F0F5"
            fontSize="14px"
            width="200px" // Increased width for better space
            whiteSpace="normal" // Allows text wrapping
            wordBreak="break-word" // Break long words if needed
          >
            {item.title}
          </Td>
        )}
        <Td
          width="180px" // Increased width for the "SUB" column
          whiteSpace="normal" // Allows wrapping
          wordBreak="break-word" // Breaks long words
        >
          {sub}
        </Td>
        <Td
          color="#F0F0F5"
          fontSize="14px"
          width="100px"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          {item.distributions[idx]}%
        </Td>
        <Td
          color="#F0F0F5"
          fontSize="14px"
          width="120px"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          <Text
            bg="#BEE3C8"
            color="black"
            borderRadius="6px"
            padding="8px"
            width="100px"
            textAlign="center"
          >
            {numberFormatter(item.totals[idx])}
          </Text>
        </Td>
        <Td
          width="200px" // Allocated more space to this column
          whiteSpace="normal"
          wordBreak="break-word"
        >
          <Text color="#F0F0F5" fontSize="14px">
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
