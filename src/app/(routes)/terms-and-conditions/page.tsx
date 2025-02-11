'use client';

import React from 'react';
import { Text } from '@/components/ui/typography/Text';
import { tacSection } from './constant';

function TermsAndConditionsPage() {
	return (
		<div
			className='min-h-screen pt-24 px-4 pb-16'
			style={{
				background: `radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.2), transparent), radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.2), transparent), black`,
				backgroundAttachment: 'fixed',
			}}>
			<div className='max-w-[800px] mx-auto'>
				<Text.Bold36 className=' mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
					Terms and Conditions
				</Text.Bold36>

				<Text.Medium20 className='text-gray-400 mb-8 text-center'>
					Welcome to{' '}
					<a
						href='https://app.hashstack.finance'
						className='text-white hover:underline'>
						Hashstack
					</a>
					,a website-hosted user interface committed to creating
					open-source software brought to you by Hashstack and its
					affiliates (collectively, “we”, “us” or “our”), that
					provides information, resources and access to decentralized
					autonomous interest-bearing liquidity markets that enable
					users to supply and borrow certain digital assets in a
					non-custodial manner (the “Open Protocol” or “Protocol”).
				</Text.Medium20>

				<div className='space-y-8'>
					{tacSection.map((section, index) => (
						<div
							key={index}
							className='bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-purple-500/50 transition-colors'>
							<Text.Medium20 className='mb-4 text-white/90'>
								{section.title}
							</Text.Medium20>
							<Text.Regular14 className='text-gray-400 whitespace-pre-line leading-relaxed'>
								{section.content}
							</Text.Regular14>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default TermsAndConditionsPage;
