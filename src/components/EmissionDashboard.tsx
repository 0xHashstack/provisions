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
		<div
			className={`border border-gray-300/30 bg-gray-300/10 rounded-lg p-8 shadow-lg text-white`}>
			<div
				className={`overflow-x-visible`}
				style={{
					scrollbarWidth: 'thin',
					scrollbarColor:
						'rgba(103, 109, 154, 0.5) rgba(103, 109, 154, 0.2)',
				}}>
				<h2 className={`sm:text-xl text-2xl font-semibold mb-4`}>
					HSTK Tokenomics
				</h2>
				<Table>
					<TableBody>
						<TableRow>
							{columnItems.map((columnItem, index) => (
								<TableCell
									key={index}
									className='text-base font-medium text-left text-gray-400'>
									{columnItem}
								</TableCell>
							))}
						</TableRow>
						{data.map((item, index) =>
							item.subData.map((sub, idx) => (
								<TableRow key={`${index}-${idx}`}>
									{idx === 0 && (
										<TableCell
											rowSpan={item.subData.length}
											className='flex items-center gap-2 whitespace-normal break-words font-medium w-52'>
											{item.icon && <item.icon />}
											{item.title}
										</TableCell>
									)}
									<TableCell className='whitespace-nowrap break-words font-light w-44'>
										{sub}
									</TableCell>
									<TableCell className='text-white font-light w-28'>
										{item.distributions[idx]}%
									</TableCell>
									<TableCell className='text-white font-light w-32'>
										{numberFormatter(item.totals[idx])}
									</TableCell>
									<TableCell className='text-white font-light w-52 whitespace-normal break-words'>
										{item.criterias[idx]}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default EmissionDashboard;
