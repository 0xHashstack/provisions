import { cn } from '@/utils/cn';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface MenuItem {
	label: string;
	href: string;
	route?: string;
}

interface MobileMenuProps {
	onClose: () => void;
}

const MENU_ITEMS: MenuItem[] = [
	{ label: 'Provisions', href: '/provisions', route: 'provisions' },
	{ label: 'Tokenomics', href: '/tokenomics', route: 'tokenomics' },
	{
		label: 'Docs',
		href: 'https://docs.hashstack.finance/hub',
	},
	{
		label: 'Developers',
		href: 'https://docs.hashstack.finance/developers/',
	},
	{
		label: 'Go to App',
		href: 'https://app.hashstack.finance/',
	},
];

export function MobileMenu({ onClose }: MobileMenuProps) {
	const router = useRouter();
	const pathname = usePathname().replaceAll('/', '');

	const handleNavigation = (href: string) => {
		if (href.startsWith('http')) {
			window.open(href, '_blank');
		} else {
			router.push(href);
		}
		onClose();
	};

	return (
		<div className='flex flex-col items-center min-h-screen pt-16'>
			<nav className='w-full '>
				<ul>
					{MENU_ITEMS.map((item) => (
						<li
							key={item.label}
							className='mb-0 cursor-pointer'>
							<button
								onClick={() => handleNavigation(item.href)}
								className={cn(
									'w-full h-16 flex items-center justify-center',
									'text-sm font-medium border border-[#1A1A1F]',
									'transition-colors duration-200',
									item.route === pathname ?
										'text-[#4d59e8]'
									:	'text-white hover:text-[#4d59e8]'
								)}>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<button
				onClick={onClose}
				className='absolute top-[58%] transition-transform duration-300 ease-in-out  hover:rotate-90'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					className='w-6 h-6'>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</button>
		</div>
	);
}
