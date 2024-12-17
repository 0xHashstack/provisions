import { ethers } from "ethers";
import proxyClaimAbi from '../abis/proxyClaimAbil1.json'
import { claimContractL1, claimContractL2, getProvider } from "../stark-constants";
import { Contract } from "starknet";

export async function getuserbeneficiaryTicketsL1(address:string) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE
    );
    const contract = new ethers.Contract(claimContractL1, proxyClaimAbi, provider);
    const storedData = await contract.myBeneficiaryTickets(address);
    return storedData
  } catch (err) {
    console.log(err, "err in L1 tickets");
  }
}

export async function getuserbeneficiaryTicketsL2(address:string) {
  try {
      const provider=getProvider()
      const claimsContract = new Contract(proxyClaimAbi, claimContractL2, provider);
      const res:any = await claimsContract.call("myBeneficiaryTickets", [address], {
      blockIdentifier: "pending",
      });
      return res;
  } catch (error) {
    console.log(error,'err in L2 tickets')
  }
}

export async function viewTicketL2(ticket:number) {
  try {
      const provider=getProvider()
      const claimsContract = new Contract(proxyClaimAbi, claimContractL2, provider);
      const res:any = await claimsContract.call("viewTicket", [ticket], {
      blockIdentifier: "pending",
      });
      return res;
  } catch (error) {
    console.log(error,'err in L2 view ticket')
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
      console.log(err, "err in view ticket L1");
    }
  }
