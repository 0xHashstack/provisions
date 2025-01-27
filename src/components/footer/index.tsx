'use client';

import { useAccount, useBlockNumber, useNetwork } from '@starknet-react/core';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { AccountInterface, BlockNumber } from 'starknet';
import { getProtocolReserves } from '@/Blockchain/scripts/claimProxy';
import { MetricsSlider } from './MetricsSlider';
import { FooterLinks } from './FooterLinks';

interface ExtendedAccountInterface extends AccountInterface {
	provider?: {
		chainId: string;
	};
}

const Footer: React.FC = () => {
	const [protocolReserves, setProtocolReserves] =
		useState<Record<string, number>>();
	const isLessThan1400 = useMediaQuery('(max-width: 1400px)');
	const [perviewCount, setPerviewCount] = useState<number>(2);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getProtocolReserves();
				if (res) {
					setProtocolReserves(res);
				}
			} catch (error) {
				console.error('Failed to fetch protocol reserves:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		setPerviewCount(isLessThan1400 ? 1 : 2);
	}, [isLessThan1400]);

	return (
		<div className='fixed bottom-0 z-[14] w-screen h-8 bg-[#02010F] shadow-[0_15px_25px_rgba(0,0,0,0.15),0_5px_10px_rgba(0,0,0,0.05)] text-white border-y border-[#2B2F35]'>
			<div className='w-[95%] flex justify-between items-center mx-auto'>
				<MetricsSlider
					protocolReserves={protocolReserves}
					perviewCount={perviewCount}
				/>
				<FooterLinks />
			</div>
		</div>
	);
};

export default Footer;
