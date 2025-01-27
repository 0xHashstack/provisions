import Link from 'next/link';
import React from 'react';
import { LINKS } from './constants';

export const FooterLinks: React.FC = () => (
	<div className='border-l border-[#2B2F35] h-full mr-auto flex'>
		{LINKS.map((link, index) => (
			<div
				key={link.href}
				className={`h-full py-2 ${
					index !== LINKS.length - 1 ?
						'border-r border-[#2B2F35]'
					:	''
				} ${index === 0 ? 'px-8' : 'pl-4'}`}>
				<Link
					href={link.href}
					target='_blank'
					className='text-[#676D9A] text-xs cursor-pointer flex items-center'>
					{link.label}
				</Link>
			</div>
		))}
	</div>
);
