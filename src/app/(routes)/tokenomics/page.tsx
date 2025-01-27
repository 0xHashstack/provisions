'use client';
import { HStack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import EmissionRateChart from '@/components/charts/EmissionRateChart';
import EmissionDashboard from '@/components/EmissionDashboard';
import Hero from '@/features/tokenomics/Hero';
import Market from '@/features/tokenomics/Market';

export default function Tokenomics() {
	const [isSmallerThan1250] = useMediaQuery('(max-width: 1250px)');
	const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');

	return (
		<>
			{
				<div
					className='relative z-[1] text-white flex flex-col min-h-screen pt-24 pb-28 pl-8 sm:pl-16 lg:pl-24 xl:pl-16'
					style={{
						background: `
								radial-gradient(circle 600px at 30% 10%, rgba(83, 49, 234, 0.2), transparent),
								radial-gradient(circle 600px at bottom right, rgba(83, 49, 234, 0.3), transparent),
								black
    						`,
						backgroundAttachment: 'fixed',
					}}>
					<Hero />
					<div className='px-0 sm:px-8 lg:px-28 mt-8'>
						<EmissionDashboard />
						<Market />
					</div>
					<HStack
						mt='3rem'
						w='100%'
						h='30%'
						display='flex'
						justifyContent='space-between'
						alignItems='flex-start'
						paddingLeft={
							isSmallerThan700 ? '0rem'
							: isSmallerThan1250 ?
								'2rem'
							:	'7rem'
						}
						paddingRight={
							isSmallerThan700 ? '1rem'
							: isSmallerThan1250 ?
								'2rem'
							:	'7rem'
						}>
						<EmissionRateChart />
					</HStack>
				</div>
			}
		</>
	);
}
