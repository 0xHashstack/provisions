import Image from 'next/image';
import React from 'react';

const UniswapLogo = () => {
	return (
		<Image
			src='/icons/uniswap.svg'
			alt='uniswap icon'
			width={32}
			height={32}
			className='rounded-full w-8 h-8 bg-white'
		/>
	);
};

export default UniswapLogo;
