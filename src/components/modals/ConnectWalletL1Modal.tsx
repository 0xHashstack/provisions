import { useAccount, useConnect } from 'wagmi';
import { mainnet } from 'viem/chains';
import Image from 'next/image';
import { useEffect } from 'react';
import MetamaskIcon from '@/assets/metamaskIcon';
import CoinbaseIcon from '@/assets/coinbaseIcon';
import WalletConnectIcon from '@/assets/walletConnectIcon';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConnectorOption {
	id: string;
	name: string;
	icon: React.ReactNode;
}

interface ConnectWalletL1ModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const connectorOptions: ConnectorOption[] = [
	{
		id: 'metaMask',
		name: 'MetaMask',
		icon: <MetamaskIcon />,
	},
	{
		id: 'coinbaseWallet',
		name: 'Coinbase',
		icon: <CoinbaseIcon />,
	},
	{
		id: 'walletConnect',
		name: 'Wallet Connect',
		icon: <WalletConnectIcon />,
	},
];

export const ConnectWalletL1Modal = ({
	open,
	onOpenChange,
}: ConnectWalletL1ModalProps) => {
	const { address } = useAccount();
	const { connect, connectors } = useConnect({
		chainId: mainnet.id,
	});

	useEffect(() => {
		if (address) {
			onOpenChange(false);
		}
	}, [address, onOpenChange]);

	const handleConnect = (connectorId: string) => {
		const connector = connectors.find((c) => c.id === connectorId);
		if (connector) {
			connect({ connector });
		}
	};

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={onOpenChange}>
				<DialogContent className='bg-[#02010F] border-[#2C2B48] sm:max-w-[464px]'>
					<DialogHeader>
						<DialogTitle className='text-white text-sm font-semibold'>
							Connect L1 Wallet
						</DialogTitle>
					</DialogHeader>
					<div className='flex flex-col gap-6'>
						<div className='bg-[rgba(103,109,154,0.10)] border border-[rgba(103,109,154,0.30)] rounded-lg p-4'>
							{connectorOptions.map((option) => (
								<button
									key={option.id}
									onClick={() => handleConnect(option.id)}
									className={cn(
										'w-full flex items-center justify-between p-2 mb-4 last:mb-0',
										'border border-[rgba(103,109,154,0.30)] rounded-md',
										'text-white hover:bg-[rgba(103,109,154,0.05)]',
										'transition-colors duration-200'
									)}>
									<span className='ml-4'>{option.name}</span>
									<span className='p-1 mr-4'>
										{option.icon}
									</span>
								</button>
							))}
						</div>

						<div className='space-y-4'>
							<div className='text-sm text-white'>
								By connecting your wallet, you agree to
								Hashstack&apos;s{' '}
								<Button
									variant='link'
									className='text-[#4D59E8] p-0 h-auto'>
									terms of service & disclaimer
								</Button>
							</div>

							<div className='space-y-4 text-xs text-[#3E415C]'>
								<p>
									Wallets are provided by External Providers
									and by selecting you agree to Terms of those
									Providers. Your access to the wallet might
									be reliant on the External Provider being
									operational.
								</p>
								<p>
									We urge the users to use the dapp with
									caution. Hashstack will not cover any
									accidental loss of user funds.
								</p>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ConnectWalletL1Modal;
