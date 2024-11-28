import { ethers } from "ethers";
import proxyClaimAbi from '../abis/proxyClaimAbil1.json'
import { claimContractL1 } from "../stark-constants";

export async function getuserbeneficiaryTicketsL1(address:string) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE
    );
    const contract = new ethers.Contract(claimContractL1, proxyClaimAbi, provider);
    const storedData = await contract.myBeneficiaryTickets(address);
    return storedData
  } catch (err) {
    console.log(err, "err in supply asset");
  }
}

export async function viewTicket(ticket:number) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE
      );
      const contract = new ethers.Contract(claimContractL1, proxyClaimAbi, provider);
      const storedData = await contract.viewTicket(ticket);
      return storedData
    } catch (err) {
      console.log(err, "err in supply asset");
    }
  }
