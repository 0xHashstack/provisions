import ContributorsChart from '@/components/charts/ContributorsChart';

const cards = [
	{ percentage: '18%', title: 'Hashstack Investors', borderColor: '#3E7CFF' },
	{
		percentage: '24.4%',
		title: 'Adoption Incentives',
		borderColor: '#00D395',
	},
	{ percentage: '3.3%', title: 'Community', borderColor: '#00C7F2' },
	{ percentage: '14%', title: 'Product Development', borderColor: '#FFAB80' },
	{ percentage: '26%', title: 'Founder(s) & Team', borderColor: '#A38CFF' },
	{
		percentage: '14.3%',
		title: 'Exchange Liquidity',
		borderColor: '#FFD347',
	},
];

const Charts = () => {
	return (
		<div className='flex flex-col gap-8 mt-8'>
			<ContributorsChart />
			<ul className='grid gap-6 grid-cols-2 lg:grid-cols-3'>
				{cards.map((card, index) => (
					<li
						key={index}
						className='flex flex-col border-l-4 pl-2'
						style={{ borderColor: card.borderColor }}>
						<p className='font-bold'>{card.percentage}</p>
						<p className='font-semibold text-[#676D9A]'>
							{card.title}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Charts;
