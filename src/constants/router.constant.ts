export const ROUTES = {
	PROVISION: {
		HOME: '/provisions',
	},
	TOKENOMICS: {
		HOME: '/tokenomics',
	},
};

export const NAVIGATION_LINKS = [
	{
		href: ROUTES.PROVISION.HOME,
		label: 'Provisions',
		route: 'provisions',
	},
	{
		href: ROUTES.TOKENOMICS.HOME,
		label: 'Tokenomics',
		route: 'tokenomics',
	},
	{
		href: 'https://app.hashstack.finance',
		label: 'Go to App',
		route: 'app',
		external: true,
	},
];

export const DISCORD_LINK = {
	href: 'https://discord.com/invite/VaThqq8vbS',
	label: 'Need help? Reach out on Discord!',
} as const;
