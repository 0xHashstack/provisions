'use client';
import React from 'react';

import EmissionRateChart from '@/components/charts/EmissionRateChart';
import EmissionDashboard from '@/components/EmissionDashboard';
import Hero from '@/features/tokenomics/Hero';
import Market from '@/features/tokenomics/Market';

export default function Tokenomics() {
	return (
		<>
			{
				<div
					className='relative z-[1] text-white flex flex-col min-h-screen pt-24 pb-28 px-0 lg:px-6'
					style={{
						background: `
								radial-gradient(circle 600px at 30% 10%, rgba(83, 49, 234, 0.2), transparent),
								radial-gradient(circle 600px at bottom right, rgba(83, 49, 234, 0.3), transparent),
							black
    						`,
						backgroundAttachment: 'fixed',
					}}>
					<div className=' max-w-[1200px] mx-auto lg:px-0 px-4'>
						<Hero />
						<div className='mt-10'>
							<EmissionDashboard />
							<Market />
							<EmissionRateChart />
						</div>
					</div>
				</div>
			}
		</>
	);
}
