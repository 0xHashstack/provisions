import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

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
