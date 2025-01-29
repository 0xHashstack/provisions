import React from 'react';

function page() {
	return (
		<div
			className='min-h-screen pt-24 px-4 '
			style={{
				background: `radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.2), transparent), radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.2), transparent), black`,
				backgroundAttachment: 'fixed',
			}}>
			<div className='max-w-[800px] mx-auto'>Terms and Conditions</div>
		</div>
	);
}

export default page;
