import Navbar from '@/components/navbar';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}

export default layout;
