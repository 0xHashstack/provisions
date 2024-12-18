import React, { useState } from "react";
import { erc20ABI, useAccount, useContractWrite } from "wagmi";
import proxyClaimAbi from '../abis/proxyClaimAbil1.json'
import { baseSepolia, mainnet } from "viem/chains";
import { claimContractL1 } from "../stark-constants";
import { AnyCnameRecord } from "dns";
const useClaimL1 = () => {
  const [claimAddressL1, setclaimAddressL1] = useState<string>("")
  const [ticketId, setticketId] = useState<number>(0)
  const {address}=useAccount()
  console.log(mainnet.id,claimContractL1,'id')
  const {
    data: dataClaimL1,
    isSuccess: isSuccessL1,
    isError: isErrorL1,
    error:errorL1,
    writeAsync: writeClaimL1,
  } = useContractWrite({
    address: claimContractL1 as any,
    abi: proxyClaimAbi,
    functionName: "claimTicket",
    args: [BigInt(ticketId),claimAddressL1===""?address:claimAddressL1],
    // chainId: process.env.NEXT_PUBLIC_NODE_ENV==='testnet'? baseSepolia.id:mainnet.id,
    onError:(err)=>{
      console.log(err,'error l1')
    }
  });
  return {
    claimAddressL1,
    setclaimAddressL1,
    ticketId,
    setticketId,
    dataClaimL1,
    isSuccessL1,
    isErrorL1,
    errorL1,
    writeClaimL1,
  };
};

export default useClaimL1;
