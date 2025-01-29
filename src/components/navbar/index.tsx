'use client';
import DiscordLogo from '@/assets/discordLogo';
import HashstackLogo from '@/assets/hashstacklogo';
import { DISCORD_LINK, NAVIGATION_LINKS } from '@/constants/router.constant';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
const Drawer = dynamic(
	() => import('./drawer/Drawer').then((mod) => mod.Drawer),
	{
		ssr: false,
	}
);
import { MobileMenu } from './drawer/MobileMenu';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';

const Navbar = () => {
	const pathname = usePathname().replaceAll('/', '');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen((prevState) => !prevState);
	};

	return (
		<nav className={cn(styles.navbar, ' w-full  fixed z-50 ')}>
			<div className='flex items-center justify-between py-2.5 px-2.5 lg:px-6  h-[60px] bg-[rgba(103,109,154,0.10)]'>
				<div className='flex gap-6 items-center'>
					<HashstackLogo />
					{NAVIGATION_LINKS.map((link) => (
						<Link
							key={link.route}
							href={link.href}
							className='hidden lg:block'
							{...(link.external && { target: 'blank' })}
							{...(!link.external && {
								className: ' hidden lg:block',
							})}
							style={{
								color:
									pathname === link.route ?
										'#4D59E8'
									:	'#676D9A',
							}}>
							{link.label}
						</Link>
					))}
				</div>

				<div>
					<Link
						href={DISCORD_LINK.href}
						target='blank'
						style={{ color: '#676D9A' }}
						className='hidden lg:flex items-center gap-1'>
						{DISCORD_LINK.label} <DiscordLogo />
					</Link>
					<div className='block lg:hidden h-[40px]'>
						<button
							onClick={toggleDrawer}
							className='cursor-pointer'>
							<Image
								src={'/hamburgerIcon.svg'}
								alt='picture of author'
								width={40}
								height={40}
							/>
						</button>
						<Drawer
							isOpen={isDrawerOpen}
							onClose={toggleDrawer}>
							<MobileMenu onClose={toggleDrawer} />
						</Drawer>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
