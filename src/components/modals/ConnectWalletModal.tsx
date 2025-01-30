import BravosIcon from '@/assets/braavos';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useAccount, useConnectors } from '@starknet-react/core';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/router.constant';
import { useRouter } from 'next/navigation';

interface ConnectStarknetWalletModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ConnectStarknetWalletModal = ({
	open,
	onOpenChange,
}: ConnectStarknetWalletModalProps) => {
	const [availableDataLoading, setAvailableDataLoading] = useState(true);
	const { account, address, status, isConnected } = useAccount();
	const { available, disconnect, connect, connectors, refresh } =
		useConnectors();

	useEffect(() => {
		const interval = setInterval(refresh, 2000);
		return () => clearInterval(interval);
	}, [refresh]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAvailableDataLoading(false);
		}, 3000);
		return () => clearTimeout(timeout);
	}, [refresh]);

	useEffect(() => {
		if (address) {
			onOpenChange(false);
		}
	}, [address]);

	const handleBraavosConnect = () => {
		disconnect();
		connect(connectors[0]);
	};

	const handleArgentConnect = () => {
		disconnect();
		connect(connectors[1]);
	};

	const isBraavosAvailable = available?.some(
		(connector) => connector.options?.id === 'braavos'
	);

	const isArgentAvailable = available?.some(
		(connector) => connector.options?.id === 'argentX'
	);

	const router = useRouter();

	return (
		<div>
			<Dialog
				open={open}
				onOpenChange={onOpenChange}>
				<DialogContent className='bg-[#02010F] border-[#2C2B48] sm:max-w-[464px]'>
					<DialogHeader>
						<DialogTitle className='text-white text-sm font-semibold'>
							Connect Starknet Wallet
						</DialogTitle>
					</DialogHeader>

					<div className='bg-[rgba(103,109,154,0.10)] border border-[rgba(103,109,154,0.30)] rounded-lg p-4'>
						{/* Braavos Wallet */}
						{isBraavosAvailable ?
							<button
								onClick={handleBraavosConnect}
								className='w-full flex items-center justify-between p-4 mb-4 border border-[rgba(103,109,154,0.30)] rounded-md text-white hover:bg-[rgba(103,109,154,0.05)] transition-colors duration-200'>
								<span className='text-sm'>
									{availableDataLoading ?
										<Skeleton className='h-4 w-24 bg-gray-700' />
									:	'Braavos Wallet'}
								</span>
								<span className='p-1'>
									<BravosIcon />
								</span>
							</button>
						:	<Link
								href='https://braavos.app'
								target='_blank'
								className='block w-full'>
								<div className='w-full flex items-center justify-between p-4 mb-4 border border-[rgba(103,109,154,0.30)] rounded-md text-white hover:bg-[rgba(103,109,154,0.05)] transition-colors duration-200'>
									<span className='text-sm'>
										{availableDataLoading ?
											<Skeleton className='h-4 w-24 bg-gray-700' />
										:	'Download Braavos Wallet'}
									</span>
									<span className='p-1'>
										<BravosIcon />
									</span>
								</div>
							</Link>
						}

						{/* Argent X Wallet */}
						{isArgentAvailable ?
							<button
								onClick={handleArgentConnect}
								className='w-full flex items-center justify-between p-4 border border-[rgba(103,109,154,0.30)] rounded-md text-white hover:bg-[rgba(103,109,154,0.05)] transition-colors duration-200'>
								<span className='text-sm'>
									{availableDataLoading ?
										<Skeleton className='h-4 w-24 bg-gray-700' />
									:	'Argent X Wallet'}
								</span>
								<span className='p-1'>
									<Image
										src='/ArgentXlogo.svg'
										alt='Argent X'
										width={15}
										height={15}
										className='cursor-pointer'
									/>
								</span>
							</button>
						:	<Link
								href='https://www.argent.xyz/argent-x'
								target='_blank'
								className='block w-full'>
								<div className='w-full flex items-center justify-between p-4 border border-[rgba(103,109,154,0.30)] rounded-md text-white hover:bg-[rgba(103,109,154,0.05)] transition-colors duration-200'>
									<span className='text-sm'>
										{availableDataLoading ?
											<Skeleton className='h-4 w-24 bg-gray-700' />
										:	'Download Argent X Wallet'}
									</span>
									<span className='p-1'>
										<Image
											src='/ArgentXlogo.svg'
											alt='Argent X'
											width={15}
											height={15}
											className='cursor-pointer'
										/>
									</span>
								</div>
							</Link>
						}
					</div>

					<div className='space-y-4'>
						<div className='text-sm text-white'>
							By connecting your wallet, you agree to
							Hashstack&apos;s{' '}
							<Button
								variant='link'
								onClick={() => window.open(ROUTES.TC, '_blank')}
								className='text-[#4D59E8] p-0 h-auto'>
								terms of service & disclaimer
							</Button>
						</div>

						<div className='space-y-4 text-xs text-[#3E415C]'>
							<p>
								Wallets are provided by External Providers and
								by selecting you agree to Terms of those
								Providers. Your access to the wallet might be
								reliant on the External Provider being
								operational.
							</p>
							<p>
								We urge the users to use the dapp with caution.
								Hashstack will not cover any accidental loss of
								user funds.
							</p>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ConnectStarknetWalletModal;
