'use client';

import Navbar from '@/components/navbar';
import {
	Box,
	HStack,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import client components
const DetailsForm = dynamic(() => import('@/components/Form/DetailsForm'), {
	ssr: false,
});

export default function FormContent() {
	const [isLargerThan2000] = useMediaQuery('(min-width: 2000px)');
	const [isLargerThan1280] = useMediaQuery('(min-width: 1248px)');
	const [render, setRender] = useState(false);

	useEffect(() => {
		setRender(true);
	}, []);

	if (!render) {
		return null;
	}

	return (
		<>
			<Box
				background={`
					radial-gradient(circle 1800px at top left, rgba(115, 49, 234, 0.10), transparent) top left,
					radial-gradient(circle 1200px at bottom right, rgba(115, 49, 234, 0.10), transparent) bottom right,
					black
				`}
				position={'fixed'}
				zIndex={3}>
				<Navbar />
			</Box>
			<Box
				color='white'
				zIndex={1}
				padding='0'
				pr='2rem'
				pl={isLargerThan2000 ? '6rem' : '2rem'}
				display='flex'
				flexDirection='column'
				minHeight={'100vh'}
				pt='8rem'
				pb={isLargerThan1280 ? '7rem' : '0rem'}>
				<Text
					borderBottom={'thick'}
					color='white'
					mb='4rem'
					width={'15%'}
					display='flex'
					flexDirection={'row'}
					justifyContent='begin'>
					<Box
						borderBottomWidth={'medium'}
						borderBottomColor={'#4D59E8'}
						p='2'>
						Contributers Round
					</Box>
				</Text>

				<HStack
					w='100%'
					h='30%'
					display='flex'
					justifyContent='space-between'
					alignItems='flex-start'>
					<DetailsForm />
				</HStack>
			</Box>
		</>
	);
}
