import { ethers } from "ethers";
import proxyClaimAbi from '../abis/proxyClaimAbil1.json'
import { claimContractL1, claimContractL2, getProvider } from "../stark-constants";
import { Contract, uint256 } from "starknet";
import proxyClaimAbiL2 from '../abis/proxyClaimAbiL2.json'
import { parseAmount } from "../utils/utils";
import metricsAbi from '../abis/metrics_abi.json'
export async function getuserbeneficiaryTicketsL1(address:string) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_NODE_ENV==="testnet"? process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE:process.env.NEXT_PUBLIC_INFURA_MAINNET
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
      const claimsContract = new Contract(proxyClaimAbiL2, claimContractL2, provider);
      const res:any = await claimsContract.call("my_beneficiary_tickets", [address], {
      blockIdentifier: "pending",
      });
      return res;
  } catch (error) {
    console.log(error,'err in L2 tickets')
  }
}
function parseProtocolReserves(protocolReservesData: any): any {
  try {
    let protocolReserves: any = {
      totalReserves: parseAmount(
        uint256.uint256ToBN(protocolReservesData?.total_reserves).toString(),
        8
      ),
      availableReserves: parseAmount(
        uint256
          .uint256ToBN(protocolReservesData?.available_reserves)
          .toString(),
        8
      ),
      avgAssetUtilisation: parseAmount(
        uint256
          .uint256ToBN(protocolReservesData?.avg_asset_utilisation)
          .toString(),
        2
      ),
    };
    return protocolReserves;
  } catch (error) {
    console.warn("getProtocol reserves: ", error);
    throw "get protocol stat error";
  }
}
export async function getProtocolReserves() {
  const provider = getProvider();
  try {
    const metricsContract = new Contract(
      metricsAbi,
      '0x548f38cb45720a101a1ec2edfaf608b47d2b39d137d0d3134087315f1b5f4a5',
      provider
    );
    const res:any = await metricsContract.call("get_protocol_reserves", [], {
      blockIdentifier: "pending",
    });
    const protocolReserves = parseProtocolReserves(res?.protocol_reserves);
    return protocolReserves;
  } catch (e) {
   //console.log("get_protocol_reserves failed: ", e);
    return parseProtocolReserves({});
  }
}

export async function viewTicketL2(ticket:number) {
  try {
      const provider=getProvider()
      const claimsContract = new Contract(proxyClaimAbiL2, claimContractL2, provider);
      const res:any = await claimsContract.call("view_ticket", [ticket], {
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
        process.env.NEXT_PUBLIC_NODE_ENV==="testnet"? process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE:process.env.NEXT_PUBLIC_INFURA_MAINNET
      );
      const contract = new ethers.Contract(claimContractL1, proxyClaimAbi, provider);
      const storedData = await contract.viewTicket(ticket);
      return storedData
    } catch (err) {
      console.log(err, "err in view ticket L1");
    }
  }
