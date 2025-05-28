import { ethers } from 'ethers';
import proxyClaimAbi from '../abis/proxyClaimAbil1.json';
import {
	claimContractL1,
	claimContractL2,
	getProvider,
	uniswapPoolAddress,
} from '../stark-constants';
import { Contract, uint256 } from 'starknet';
import proxyClaimAbiL2 from '../abis/proxyClaimAbiL2.json';
import { parseAmount } from '../utils/utils';
import metricsAbi from '../abis/metrics_abi.json';
import poolAbi from '../abis/uniswap_poolAbi.json';
export async function getuserbeneficiaryTicketsL1(address: string) {
	try {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.NEXT_PUBLIC_NODE_ENV === 'testnet' ?
				process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE
			:	process.env.NEXT_PUBLIC_INFURA_MAINNET
		);
		const contract = new ethers.Contract(
			claimContractL1,
			proxyClaimAbi,
			provider
		);
		const storedData = await contract.myBeneficiaryTickets(address);
		return storedData;
	} catch (err) {
		console.log(err, 'err in L1 tickets');
	}
}

export async function getuserbeneficiaryTicketsL2(address: string) {
	try {
		const provider = getProvider();
		const claimsContract = new Contract(
			proxyClaimAbiL2,
			claimContractL2,
			provider
		);
		const res: any = await claimsContract.call(
			'my_beneficiary_tickets',
			[address],
			{
				blockIdentifier: 'pending',
			}
		);
		return res;
	} catch (error) {
		console.log(error, 'err in L2 tickets');
	}
}
function parseProtocolReserves(protocolReservesData: any): any {
	try {
		let protocolReserves: any = {
			totalReserves: parseAmount(
				protocolReservesData?.total_reserves.toString(),
				8
			),
			availableReserves: parseAmount(
				protocolReservesData?.available_reserves.toString(),
				8
			),
			avgAssetUtilisation: parseAmount(
				protocolReservesData?.avg_asset_utilisation.toString(),
				2
			),
		};
		return protocolReserves;
	} catch (error) {
		console.warn('getProtocol reserves: ', error);
		throw 'get protocol stat error';
	}
}
export async function getProtocolReserves() {
	const provider = getProvider();
	try {
		const metricsContract = new Contract(
			metricsAbi,
			'0x55eda1d714ffd97ebdd6a0bb6dd75de91255697a848e15004eed985b0e5ed38',
			provider
		);
		const res: any = await metricsContract.call(
			'get_protocol_reserves',
			[],
			{
				blockIdentifier: 'pending',
			}
		);
		console.log(res);
		const protocolReserves = parseProtocolReserves(res);
		return protocolReserves;
	} catch (e) {
		//console.log("get_protocol_reserves failed: ", e);
		return parseProtocolReserves({});
	}
}

export async function viewTicketL2(ticket: number) {
	try {
		const provider = getProvider();
		const claimsContract = new Contract(
			proxyClaimAbiL2,
			claimContractL2,
			provider
		);
		const res: any = await claimsContract.call('view_ticket', [ticket], {
			blockIdentifier: 'pending',
		});
		return res;
	} catch (error) {
		console.log(error, 'err in L2 view ticket');
	}
}

export async function hstkPrice() {
	try {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.NEXT_PUBLIC_NODE_ENV === 'testnet' ?
				process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE
			:	process.env.NEXT_PUBLIC_INFURA_MAINNET
		);
		const contract = new ethers.Contract(
			uniswapPoolAddress,
			poolAbi,
			provider
		);
		const storedData = await contract.getReserves();
		console.log(storedData, 'storedData');
		return storedData;
	} catch (err) {
		console.log(err, 'err in view ticket L1');
	}
}

export async function viewTicket(ticket: number) {
	try {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.NEXT_PUBLIC_NODE_ENV === 'testnet' ?
				process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE
			:	process.env.NEXT_PUBLIC_INFURA_MAINNET
		);
		const contract = new ethers.Contract(
			claimContractL1,
			proxyClaimAbi,
			provider
		);
		const storedData = await contract.viewTicket(ticket);
		return storedData;
	} catch (err) {
		console.log(err, 'err in view ticket L1');
	}
}
