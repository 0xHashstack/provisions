'use client';
import React, { useEffect, useState } from 'react';
import { AccountInterface } from 'starknet';
import { getProtocolReserves } from '@/Blockchain/scripts/claimProxy';
import { MetricsSlider } from './MetricsSlider';
import { FooterLinks } from './FooterLinks';

const Footer: React.FC = () => {
	const [protocolReserves, setProtocolReserves] =
		useState<Record<string, number>>();

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

	return (
		<div className='fixed bottom-0 z-[14] w-screen h-8 bg-[#02010F] shadow-[0_15px_25px_rgba(0,0,0,0.15),0_5px_10px_rgba(0,0,0,0.05)] text-white border-y border-[#2B2F35]'>
			<div className='w-[95%] flex justify-between items-center mx-auto'>
				<MetricsSlider
					protocolReserves={protocolReserves}
					perviewCount={2}
				/>
				<FooterLinks />
			</div>
		</div>
	);
};

export default Footer;
