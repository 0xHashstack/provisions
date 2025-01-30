import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';
import React from 'react';

const Footer = dynamic(() => import('@/components/footer'), {
	ssr: false,
});

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{children}
			<div className='hidden lg:block'>
				<Footer />
			</div>
		</div>
	);
}

export default layout;
