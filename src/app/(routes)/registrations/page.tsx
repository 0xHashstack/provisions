'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	useAccount,
	useBalance,
	useConnect,
	useContractRead,
	useNetwork,
} from 'wagmi';
import {
	mainnet,
	sepolia,
	goerli,
	polygon,
	optimism,
	polygonMumbai,
} from '@wagmi/core/chains';

// Icons
import WalletConnectIcon from '@/assets/walletConnectIcon';
import MetamaskIcon from '@/assets/metamaskIcon';
import CoinbaseIcon from '@/assets/coinbaseIcon';
import BlueInfoIcon from '@/assets/blueinfoIcon';
import RedinfoIcon from '@/assets/redinfoIcon';

export const dynamic = 'force-static';
export const runtime = 'nodejs';

interface WalletBalanceState {
	hasUSDT: boolean;
	hasUSDC: boolean;
	isLoading: boolean;
}

export default function Home() {
	const router = useRouter();
	const [availableDataLoading, setAvailableDataLoading] = useState(true);
	const [loading, setLoading] = useState(true);

	const { address, isConnecting, isDisconnected, connector } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect({
			chainId:
				process.env.NEXT_PUBLIC_NODE_ENV === 'mainnet' ?
					polygon.id
				:	polygonMumbai.id,
		});

	const USDC =
		process.env.NEXT_PUBLIC_NODE_ENV === 'mainnet' ?
			process.env.NEXT_PUBLIC_MC_USDC
		:	process.env.NEXT_PUBLIC_TC_USDC;

	const USDT =
		process.env.NEXT_PUBLIC_NODE_ENV === 'mainnet' ?
			process.env.NEXT_PUBLIC_MC_USDT
		:	process.env.NEXT_PUBLIC_TC_USDT;

	const usdtBalance = useBalance({
		address,
		token: `0x${USDT}`,
		chainId:
			process.env.NEXT_PUBLIC_NODE_ENV === 'mainnet' ?
				polygon.id
			:	polygonMumbai.id,
	});

	const usdcBalance = useBalance({
		address,
		token: `0x${USDC}`,
		chainId:
			process.env.NEXT_PUBLIC_NODE_ENV === 'mainnet' ?
				polygon.id
			:	polygonMumbai.id,
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAvailableDataLoading(false);
		}, 600);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (address) setLoading(false);
	}, [address]);

	useEffect(() => {
		const connectWallet = async () => {
			if (!address) return;

			const isCorrectNetwork =
				process.env.NEXT_PUBLIC_NODE_ENV === 'mainnet' ?
					connector?.chains[0].id === polygon.id
				:	connector?.chains[0].id === polygonMumbai.id;

			if (isCorrectNetwork) {
				router.push('/registrations/form');
			}
		};

		if (address) connectWallet();
	}, [address, usdtBalance, usdcBalance, connector, router]);

	const renderBalanceWarning = () => {
		if ((usdcBalance || usdtBalance) && loading) {
			return (
				<div className='w-full h-16 flex items-center mb-4'>
					<div className='flex bg-[#222766] text-[#F0F0F5] text-xs p-4 border border-[#3841AA] rounded-md'>
						<span className='pr-3 mt-0.5 cursor-pointer'>
							<BlueInfoIcon />
						</span>
						Your wallet should have more than $250 USDT/USDC as
						balance.
					</div>
				</div>
			);
		}

		if (
			address &&
			!(
				Number(usdtBalance?.data?.formatted) > 250 ||
				Number(usdcBalance?.data?.formatted) > 250
			)
		) {
			return (
				<div className='w-full h-16 flex items-center mb-4'>
					<div className='flex bg-[#480C10] text-[#F0F0F5] text-xs p-4 border border-[#9B1A23] rounded-md'>
						<span className='pr-3 mt-0.5 cursor-pointer'>
							<RedinfoIcon />
						</span>
						Your wallet doesn&apos;t have sufficient balance connect
						wallet which has more than $50 USDT/USDC.
					</div>
				</div>
			);
		}

		return null;
	};

	const getWalletIcon = (id: string) => {
		switch (id) {
			case 'metaMask':
				return <MetamaskIcon />;
			case 'coinbaseWallet':
				return <CoinbaseIcon />;
			default:
				return <WalletConnectIcon />;
		}
	};

	const getWalletName = (id: string) => {
		switch (id) {
			case 'metaMask':
				return 'MetaMask';
			case 'coinbaseWallet':
				return 'Coinbase';
			default:
				return 'Wallet Connect';
		}
	};

	return (
		<div className='flex justify-center items-center bg-[#191922] min-h-screen'>
			<div className='flex flex-col items-start p-8 w-[462px] bg-[#02010F] border border-[rgba(103,109,154,0.30)] rounded-lg'>
				<h1 className='text-white'>Connect a wallet</h1>

				<div className='p-4 bg-[rgba(103,109,154,0.10)] border border-[rgba(103,109,154,0.30)] w-full mt-2 rounded-lg'>
					{renderBalanceWarning()}

					{connectors.map((connector) => (
						<button
							key={connector.id}
							onClick={() => connect({ connector })}
							className='w-full border border-[rgba(103,109,154,0.30)] py-2 rounded-md mb-4 flex justify-between items-center hover:bg-[rgba(103,109,154,0.05)] transition-colors'>
							<span className='ml-4 text-white'>
								{availableDataLoading ?
									<div className='w-24 h-[1.4rem] bg-[#101216] animate-pulse rounded-md' />
								:	getWalletName(connector.id)}
							</span>
							<span className='p-1 mr-4'>
								{getWalletIcon(connector.id)}
							</span>
						</button>
					))}
				</div>

				<div className='mt-4 text-sm'>
					<p className='text-white'>
						By connecting your wallet, you agree to Hashstack&apos;s{' '}
						<button className='text-[#4D59E8] hover:underline'>
							terms of service & disclaimer
						</button>
					</p>
				</div>

				<div className='mt-4 space-y-4 text-xs text-[#3E415C]'>
					<p>
						Wallets are provided by External Providers and by
						selecting you agree to Terms of those Providers. Your
						access to the wallet might be reliant on the External
						Provider being operational.
					</p>
					<p>
						We urge the users to use the dapp with caution.
						Hashstack will not cover any accidental loss of user
						funds.
					</p>
				</div>
			</div>
		</div>
	);
}
