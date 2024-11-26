import React from "react";
import { erc20ABI, sepolia, useContractWrite } from "wagmi";

const useClaimL1 = () => {
  const {
    data: dataClaimL1,
    isSuccess: isSuccessL1,
    isError: isErrorL1,
    writeAsync: writeClaimL1,
  } = useContractWrite({
    address: `0x`,
    abi: erc20ABI,
    functionName: "approve",
    args: [`0x`, BigInt(30 * 1000000)],
    chainId: sepolia.id,
  });
  return {
    dataClaimL1,
    isSuccessL1,
    isErrorL1,
    writeClaimL1,
  };
};

export default useClaimL1;
