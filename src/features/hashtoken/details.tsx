'use client';

import React from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const HashTokenDetails = () => {
	return (
		<div className='flex flex-1 justify-between items-end'>
			<div className=' rounded-lg border border-[rgba(103,109,154,0.30)] bg-[rgba(103,109,154,0.10)] p-4 sm:p-8'>
				<h2 className='font-inter text-white text-lg sm:text-xl font-bold leading-[30px] tracking-[-0.15px]'>
					Hash Tokens
				</h2>

				<p className='mt-4 sm:mt-8 font-inter text-white text-sm sm:text-base font-normal leading-[24px] sm:leading-[30px] tracking-[-0.15px] break-words'>
					The HASH token is a key catalyst in the Hashstack ecosystem,
					and will serve 3 primary objectives. <br />
					1. Store of authority(Governance): To enable decentralised
					governance. <br />
					2. Store of value(Utility): For payment of in-dapp
					transaction fees, compensating partner projects, KOLs, and
					community participants who help secure/further the Hashstack
					ecosystem. <br />
					3. Unlock liquidator role: Liquidators on Hashstack take the
					responsibility of repaying the bad debt to the Hashstack
					protocol, in-exchange for acquiring them at a discount.
				</p>

				<p className='mt-6 sm:mt-12 font-inter text-white text-sm sm:text-base font-normal leading-[24px] sm:leading-[30px] tracking-[-0.15px] break-words'>
					HASH tokens total supply is hard capped to 9,000,000,000 (9
					billion). For TGE, Hashstack has partnered with the Industry
					leading launchpad - Tokensoft that helped launch AVAX
					(Avalanche token), GRT (The Graph token) among other notable
					projects.
				</p>

				<h3 className='mt-8 sm:mt-16 font-inter text-white text-lg sm:text-xl font-bold leading-[30px] tracking-[-0.15px]'>
					Token details
				</h3>

				<div className='mt-4 sm:mt-6 mb-4 sm:mb-8 rounded-lg border border-[rgba(103,109,154,0.30)]'>
					<div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'>
						<Table>
							<TableHeader>
								<TableRow className='text-xs sm:text-sm font-normal'>
									<TableHead className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center text-gray-400 normal-case whitespace-nowrap'>
										Token
									</TableHead>
									<TableHead className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center text-gray-400 normal-case whitespace-nowrap'>
										Total Supply
									</TableHead>
									<TableHead className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center text-gray-400 normal-case whitespace-nowrap'>
										Decimals
									</TableHead>
									<TableHead className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center text-gray-400 normal-case whitespace-nowrap'>
										Numeric
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow className='text-xs sm:text-base font-semibold'>
									<TableCell className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center whitespace-nowrap'>
										HASH
									</TableCell>
									<TableCell className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center whitespace-nowrap'>
										9,000,000,000
									</TableCell>
									<TableCell className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center whitespace-nowrap'>
										18
									</TableCell>
									<TableCell className='border border-[rgba(103,109,154,0.30)] p-3 sm:p-7 text-center whitespace-nowrap'>
										ETH
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HashTokenDetails;
