'use client';
import Navbar from '@/components/navbar';
import {
	Box,
	Button,
	HStack,
	Skeleton,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import EmissionRateChart from '@/components/charts/EmissionRateChart';
import EmissionDashboard from '@/components/EmissionDashboard';
import UniswapLogo from '@/assets/uniswapLogo';
import LeadingLogo from '@/assets/leadingLogo';
import EkuboIcon from '@/assets/ekuboIcon';
import numberFormatter from '@/functions/numberFormatter';
import Footer from '@/components/footer';
import Link from 'next/link';
import { hstkPrice } from '@/Blockchain/scripts/claimProxy';
import { BigNumber } from 'ethers';
import { parseAmount } from '@/Blockchain/utils/utils';
import Hero from '@/features/tokenomics/Hero';

export default function Tokenomics() {
	const [isLargerThan2000] = useMediaQuery('(min-width: 2000px)');
	const [tokenPrice, settokenPrice] = useState<number>();
	const [isSmallerThan1250] = useMediaQuery('(max-width: 1250px)');
	const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
	const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
	const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');

	useEffect(() => {
		try {
			const fetchPrice = async () => {
				const res = await hstkPrice();
				if (res) {
					let priceValue =
						(parseAmount(
							BigNumber.from(res?._reserve0).toString(),
							8
						) /
							parseAmount(
								BigNumber.from(res?._reserve1).toString(),
								18
							)) *
						100;
					settokenPrice(priceValue);
				}
			};
			fetchPrice();
		} catch (error) {
			console.log(error, 'err while fetching price');
		}
	}, []);

	const router = useRouter();
	return (
		<>
			<Navbar />
			{
				<div
					className='relative z-[1] text-white flex flex-col min-h-screen pt-24 pb-28 pl-8 sm:pl-16 lg:pl-24 xl:pl-16'
					style={{
						background: `
								radial-gradient(circle 600px at 30% 10%, rgba(83, 49, 234, 0.2), transparent),
								radial-gradient(circle 600px at bottom right, rgba(83, 49, 234, 0.3), transparent),
								black
    						`,
						backgroundAttachment: 'fixed',
					}}>
					<Hero />
					<Box
						paddingLeft={
							isSmallerThan700 ? '0rem'
							: isSmallerThan1250 ?
								'2rem'
							:	'7rem'
						}
						paddingRight={
							isSmallerThan700 ? '1rem'
							: isSmallerThan1250 ?
								'2rem'
							:	'7rem'
						}
						mt='2rem'>
						<EmissionDashboard />
						<Text
							fontSize={isSmallerThan700 ? '24px' : '48px'}
							mt='3rem'>
							HSTK Markets
						</Text>
						<Box
							// padding="36px"
							// bg="#0C0C1D"
							mt='2rem'
							borderRadius='6px'
							// border="1px solid #272943"
							display='flex'
							flexDirection={isSmallerThan700 ? 'column' : 'row'}
							width='100%'
							gap='2rem'>
							<Box
								// border="1px solid #272943"
								borderRadius='6px'
								// padding="28px"
								display='flex'
								flexDirection={
									isSmallerThan700 ? 'row' : 'column'
								}
								gap='1.5rem'
								justifyContent='space-between'
								alignItems='center'
								width={isSmallerThan700 ? '100%' : '40%'}>
								<Link
									style={{ width: '100%' }}
									href='https://app.uniswap.org/swap?chain=mainnet&inputCurrency=0xf38774a034f5f533d7f9e2ba6b7f3a7542714fa9&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7'
									target='_blank'>
									<Box
										border='1px solid #272943'
										borderRadius='6px'
										padding='16px 24px'
										display='flex'
										justifyContent='space-between'
										width='100%'
										alignItems='center'
										cursor='pointer'>
										<Box
											display='flex'
											alignItems='center'
											gap='0.8rem'>
											<UniswapLogo />
											<Text
												fontSize={
													isSmallerThan500 ? '12px'
													:	'16px'
												}
												fontWeight='600'>
												Uniswap
											</Text>
										</Box>
										<Box ml='0.5rem'>
											<LeadingLogo />
										</Box>
									</Box>
								</Link>
								<Link
									href='https://app.ekubo.org/?inputCurrency=HSTK&amount=1&outputCurrency=USDT'
									target='_blank'
									style={{ width: '100%' }}>
									<Box
										border='1px solid #272943'
										borderRadius='6px'
										padding='16px 24px'
										display='flex'
										justifyContent='space-between'
										alignItems='center'
										width='100%'
										cursor='pointer'>
										<Box
											display='flex'
											alignItems='center'
											gap='0.8rem'>
											<EkuboIcon />
											<Text
												fontSize={
													isSmallerThan500 ? '12px'
													:	'16px'
												}
												fontWeight='600'>
												Ekubo
											</Text>
										</Box>
										<Box ml='0.5rem'>
											<LeadingLogo />
										</Box>
									</Box>
								</Link>
							</Box>
							<Box
								border='1px solid #272943'
								borderRadius='6px'
								padding='28px'
								display='flex'
								flexDirection='column'
								// gap="1.5rem"
								justifyContent='space-between'
								alignItems='center'
								width={isSmallerThan700 ? '100%' : '60%'}>
								<Box
									display='flex'
									width='100%'
									justifyContent='space-between'>
									<Text
										fontSize={
											isSmallerThan500 ? '12px' : '16px'
										}
										maxW={isSmallerThan900 ? '80%' : '70%'}>
										Check out our liquidity pools on uniswap
										and ekubo, start earning!
									</Text>
									<Button
										onClick={() => {
											router.push('/provisions');
										}}
										variant='link'>
										Earn
									</Button>
								</Box>
								<Box
									display='flex'
									gap='1rem'
									width='100%'
									mt='1.5rem'>
									<Box
										// border="1px solid #272943"
										borderRadius='6px'
										// bg="#191934"
										// padding="8px"
										width='50%'
										display='flex'
										flexDirection='column'
										gap='0.3rem'>
										<Text fontWeight='600'>HSTK Price</Text>
										{tokenPrice ?
											<Text color='#676D9A'>
												{numberFormatter(tokenPrice)}
											</Text>
										:	<Skeleton
												width='3rem'
												height='0.8rem'
												startColor='#101216'
												endColor='#2B2F35'
												borderRadius='6px'
											/>
										}
									</Box>
									<Box
										// border="1px solid #272943"
										borderRadius='6px'
										// bg="#191934"
										// padding="24px 28px"
										display='flex'
										flexDirection='column'
										gap='0.3rem'
										width='50%'>
										<Text
											fontWeight='600'
											whiteSpace='nowrap'>
											24H Trading Volume
										</Text>
										<Text color='#676D9A'>NA</Text>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>

					<HStack
						mt='3rem'
						w='100%'
						h='30%'
						display='flex'
						justifyContent='space-between'
						alignItems='flex-start'
						paddingLeft={
							isSmallerThan700 ? '0rem'
							: isSmallerThan1250 ?
								'2rem'
							:	'7rem'
						}
						paddingRight={
							isSmallerThan700 ? '1rem'
							: isSmallerThan1250 ?
								'2rem'
							:	'7rem'
						}>
						<EmissionRateChart />
					</HStack>

					{/* <Text color="white" mt="3rem" mb="2rem">
          Tokenomics
        </Text>
        <ContributorsChart/> */}
				</div>
			}
			<Footer />
		</>
	);
}
