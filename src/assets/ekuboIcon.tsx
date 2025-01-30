import Image from 'next/image';
import React from 'react';

const EkuboIcon = () => {
	return (
		<Image
			src='/icons/ekubo.webp'
			alt='ekubo icon'
			width={32}
			height={32}
			className='rounded-full'
		/>
	);
};

export default EkuboIcon;
