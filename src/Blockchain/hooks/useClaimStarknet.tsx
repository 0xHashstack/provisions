import { useAccount, useContractWrite } from "@starknet-react/core";
import { useState } from "react";
import { etherToWeiBN } from "../utils/utils";
import { claimContractL2, getProvider } from "../stark-constants";
const useClaimStarknet = () => {
  const [claimAddressL2, setclaimAddressL2] = useState<string>("")
  const [ticketIdL2, setticketIdL2] = useState<number>(0)
  const { address: owner } = useAccount();
  // const provider=getProvider();
  // const claimContract = new Contract(proxyClaimAbi, claimAddressL2, provider)
  // const call = claimContract.populate('claim', {amount:strkAmount, proof: proof})
  ////console.log("rToken stake request - ", rToken);

  const {
    data: dataClaimL2,
    error: errorClaimL2,
    reset: resetClaimL2,
    write: writeClaimL2,
    writeAsync: writeAsyncClaimL2,
    isError: isErrorClaimL2,
    isIdle: isIdleClaimL2,
    isSuccess: isSuccessClaimL2,
    status: statusClaimL2,
  } = useContractWrite({
    calls: [
      {
        contractAddress:claimContractL2,
        entrypoint: "claim_ticket",
        calldata: [ticketIdL2 as any,claimAddressL2===""?owner:claimAddressL2],
      },
      
    ],
  });

  return {
    claimAddressL2,
    setclaimAddressL2,
    ticketIdL2,
    setticketIdL2,
    dataClaimL2,
    errorClaimL2,
    resetClaimL2,
    writeClaimL2,
    writeAsyncClaimL2,
    isErrorClaimL2,
    isIdleClaimL2,
    isSuccessClaimL2,
    statusClaimL2,
  };
};

export default useClaimStarknet;
