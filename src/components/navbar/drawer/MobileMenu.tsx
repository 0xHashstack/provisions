import { Btn } from '@/components/ui/button';
import { NAVIGATION_LINKS } from '@/constants/router.constant';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface Props {
	onClose: () => void;
}

export function MobileMenu({ onClose }: Props) {
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
			<nav className='w-full'>
				<ul>
					{NAVIGATION_LINKS.map((item) => (
						<li
							key={item.label}
							className='mb-0 cursor-pointer'>
							<button
								onClick={() => handleNavigation(item.href)}
								className={cn(
									'flex w-full px-4 py-2',
									'text-sm font-medium border border-[#1A1A1F]',
									'transition-colors duration-200',
									item.route === pathname
										? 'text-[#4d59e8]'
										: 'text-white hover:text-[#4d59e8]'
								)}>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<Btn.Icon
				onClick={onClose}
				className='mt-8'>
				<X size={24} />
			</Btn.Icon>
		</div>
	);
}
