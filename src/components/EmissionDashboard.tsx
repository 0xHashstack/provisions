import React from 'react';
import numberFormatter from '@/functions/numberFormatter';
import HashstackIllustrationTokenomics from '@/assets/hashstackIllustrationTokenomics';
import AdoptionIncentives from '@/assets/adoptionIncentives';
import CommunityIncentives from '@/assets/communityIncentives';
import ProductIncentives from '@/assets/productIncentives';
import FoundersIncentives from '@/assets/foundersIncentives';
import ExchangeLiquidity from '@/assets/exchangeLiquidity';
import { Table, TableBody, TableCell, TableRow } from './ui/table';

const EmissionDashboard = () => {
	const columnItems = [
		'Category',
		'Sub',
		'Distribution',
		'Total',
		'Unlock & vesting',
	];

	const data = [
		{
			title: 'Hastack Investors',
			subData: ['Private round'],
			distributions: [18],
			totals: [1620000000],
			icon: HashstackIllustrationTokenomics,
			criterias: [
				'10% unlocked at tge, 3 months cliff, 15 months linear release.',
			],
		},
		{
			title: 'Adoption Incentives',
			subData: ['Airdrop', 'Integration Incentives', 'Liquidity mining'],
			distributions: [2.4, 7, 15],
			icon: AdoptionIncentives,
			totals: [216000000, 630000000, 1350000000],
			criterias: [
				'25% unlocked at tge,6 months cliff. 3 months linear release',
				'0% unlocked at tge. 12.5% quarterly deployed over 24 months',
				'60% dripped over 24 months after lockdrop. Equally distributed to supply/borrow. 40% non-linearly dripped over 20 months.',
			],
		},
		{
			title: 'Community',
			subData: ['Community'],
			distributions: [3.3],
			icon: CommunityIncentives,
			totals: [297000000],
			criterias: ['3 months cliff, linear release over 24 months'],
		},
		{
			title: 'Product development',
			subData: ['Infrastructure fund'],
			distributions: [14],
			icon: ProductIncentives,
			totals: [1260000000],
			criterias: ['9 months cliff, 36 months linear release'],
		},
		{
			title: 'Founder(s) & team',
			subData: ['Team'],
			distributions: [26],
			icon: FoundersIncentives,
			totals: [2340000000],
			criterias: ['12 months cliff, linear release for 48 months'],
		},
		{
			title: 'Exchange liquidity',
			subData: ['Exchange Liquidity'],
			distributions: [14.3],
			icon: ExchangeLiquidity,
			totals: [1287000000],
			criterias: [
				'25% unlocked within 7 days of tge. 75% linear release over 12 months',
			],
		},
	];

	return (
		<div className='rounded-lg p-4 sm:p-8 bg-[rgba(103,109,154,0.05)] backdrop-blur-md border border-[rgba(103,109,154,0.15)] shadow-[0_8px_32px_0_rgba(31,38,135,0.17)]'>
			<h2 className='text-xl sm:text-2xl font-semibold mb-6 text-white'>
				HSTK Tokenomics
			</h2>

			<div className='overflow-x-auto -mx-4 w-[86vw] md:w-full  sm:mx-0'>
				<div className='min-w-[800px] md:min-w-full p-4 sm:p-0'>
					<Table className='w-full'>
						<TableBody>
							<TableRow className='border-b border-white/5 hover:bg-transparent'>
								{columnItems.map((columnItem, index) => (
									<TableCell
										key={index}
										className='py-6 text-sm sm:text-base font-medium text-left text-gray-400'>
										{columnItem}
									</TableCell>
								))}
							</TableRow>
							{data.map((item, index) => (
								<React.Fragment key={index}>
									{item.subData.map((sub, subIndex) => (
										<TableRow
											key={`${index}-${subIndex}`}
											className='border-b border-white/5 hover:bg-transparent'>
											{subIndex === 0 && (
												<TableCell
													rowSpan={
														item.subData.length
													}
													className='py-6 border-0 align-top'>
													<div className='flex items-center gap-2'>
														{React.createElement(
															item.icon,
															{
																className:
																	'w-6 h-6',
															}
														)}
														<span>
															{item.title}
														</span>
													</div>
												</TableCell>
											)}
											<TableCell className='py-6'>
												{sub}
											</TableCell>
											<TableCell className='py-6'>
												{numberFormatter(
													item.distributions[subIndex]
												)}
												%
											</TableCell>
											<TableCell className='py-6'>
												{numberFormatter(
													item.totals[subIndex]
												)}
											</TableCell>
											<TableCell className='py-6'>
												{item.criterias[subIndex]}
											</TableCell>
										</TableRow>
									))}
								</React.Fragment>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default EmissionDashboard;
