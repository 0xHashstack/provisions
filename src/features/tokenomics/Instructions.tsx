const list = [
	{
		title: 'Store of authority (Governance)',
		description: 'To enable decentralised governance.',
	},
	{
		title: 'Store of authority (Store of value/Utility)',
		description:
			'For payment of in-dapp transaction fees, compensating partner projects, KOLs, and community participants who help secure/further the Hashstack ecosystem.',
	},
	{
		title: 'Unlock liquidator role',
		description:
			'Liquidators on Hashstack take the responsibility of repaying the bad debt to the Hashstack protocol, in exchange for acquiring them at a discount.',
	},
];

const Instructions = () => {
	return (
		<div>
			<p className='text-3xl sm:text-5xl font-bold max-w-[400px]'>
				Hashstack Tokenomics
			</p>
			<p className='max-w-[500px] mt-4'>
				The HSTK token serves as the cornerstone of our DeFi ecosystem,
				built to drive value, incentivize active participation, and
				generate sustainable economic momentum.
			</p>
			<div className='h-[1px] border border-[#272943] w-3/5 mt-6'></div>

			<div className='flex flex-col mt-2'>
				{list.map((item, index) => (
					<div
						key={index}
						className='flex flex-col mt-2'>
						<div className='rounded-full bg-[#7331EA] w-[22px] h-[22px] flex items-center justify-center'>
							{index + 1}
						</div>
						<p className='font-bold mt-3'>{item.title}</p>
						<p className='mt-2 text-sm sm:text-base leading-[20px] text-[#676D9A]'>
							{item.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Instructions;
