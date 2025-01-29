export const ANIMATION_DURATION = 40000;

export const METRICS = [
	{
		id: 'total-reserves',
		label: 'Total Reserves',
		key: 'totalReserves',
		prefix: '$',
	},
	{
		id: 'available-reserves',
		label: 'Available Reserves',
		key: 'availableReserves',
		prefix: '$',
	},
	{
		id: 'asset-utilisation',
		label: 'Average Asset Utilisation',
		key: 'avgAssetUtilisation',
		suffix: '%',
	},
];

export const LINKS = [
	{ href: 'https://docs.hashstack.finance/hub', label: 'Docs' },
	{ href: 'https://docs.hashstack.finance/developers', label: 'Developers' },
] as const;
