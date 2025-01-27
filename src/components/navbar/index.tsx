'use client';
import DiscordLogo from '@/assets/discordLogo';
import HashstackLogo from '@/assets/hashstacklogo';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { cn } from '@/utils/cn';
import { Drawer } from './drawer/Drawer';
import { MobileMenu } from './drawer/MobileMenu';

const Navbar = () => {
	const pathname = usePathname().replaceAll('/', '');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen((prevState) => !prevState);
	};

	return (
		<nav
			className={cn(
				styles.navbar,
				'flex items-center justify-between w-full p-2.5 fixed z-50'
			)}>
			<div className='flex gap-4 items-center'>
				<HashstackLogo />
				<Link
					href='/provisions'
					className='ml-4 hidden lg:block'
					style={{
						color:
							pathname === 'provisions' ? '#4D59E8' : '#676D9A',
					}}>
					Provisions
				</Link>
				<Link
					href='/tokenomics'
					className='hidden lg:block'
					style={{
						color:
							pathname === 'tokenomics' ? '#4D59E8' : '#676D9A',
					}}>
					Tokenomics
				</Link>
				<Link
					className='hidden lg:block'
					style={{ color: '#676D9A' }}
					href='https://app.hashstack.finance'
					target='blank'>
					Go to App
				</Link>
			</div>

			<div>
				<Link
					href='https://discord.com/invite/VaThqq8vbS'
					target='blank'
					style={{ color: '#676D9A' }}
					className='hidden lg:flex items-center gap-1'>
					Need help? Reach out on <DiscordLogo /> Discord!
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
		</nav>
	);
};

export default Navbar;
