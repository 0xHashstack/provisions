'use client';
import Navbar from '@/components/navbar';
import ContributorsChart from '@/components/charts/ContributorsChart';
import {
	Box,
	Button,
	HStack,
	Skeleton,
	Spinner,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DetailsForm from '@/components/Form/DetailsForm';
import { useAccount, useBalance } from 'wagmi';
import { useRouter } from 'next/navigation';
import {
	mainnet,
	sepolia,
	goerli,
	polygon,
	optimism,
	polygonMumbai,
} from '@wagmi/core/chains';
import EmissionRateChart from '@/components/charts/EmissionRateChart';
import TokenomicsTable from '@/components/EmissionDashboard';
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

export const dynamic = 'force-static';
export const runtime = 'nodejs';

export default function Tokenomics() {
	const [isLargerThan2000] = useMediaQuery('(min-width: 2000px)');
	const [isLargerThan1280] = useMediaQuery('(min-width: 1248px)');
	const [tokenPrice, settokenPrice] = useState<number>();
	const [isSmallerThan1250] = useMediaQuery('(max-width: 1250px)');
	const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
	const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
	const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
	// const
	const [render, setRender] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setRender(true);
		}, 2000);
	}, []);

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
		<Box>
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
			{
				<Box
					background={`
          radial-gradient(circle 600px at 30% 10%, rgba(83, 49, 234, 0.2), transparent),
          radial-gradient(circle 600px at bottom right, rgba(83, 49, 234, 0.3), transparent),
          black
        `}
					backgroundAttachment='fixed'
					position='relative'
					color='white'
					zIndex={1}
					padding='0'
					// mb="4rem"
					// pr="4rem"
					pl={
						isSmallerThan1250 ? '2rem'
						: isLargerThan2000 ?
							'6rem'
						:	'4rem'
					}
					display='flex'
					flexDirection='column'
					minHeight={'100vh'}
					pt='6rem'
					pb={'7rem'}>
					<Box
						display='flex'
						flexDirection={isSmallerThan900 ? 'column' : 'row'}
						alignItems='center'
						width='100%'
						justifyContent='center'
						gap={isSmallerThan1250 ? '4%' : '14%'}
						mb='2rem'>
						<Box
							display='flex'
							flexDirection='column'
							gap='1rem'
							maxW='700px'
							pr={isSmallerThan700 ? '1rem' : '0rem'}>
							<Text
								fontSize={isSmallerThan700 ? '36px' : '52px'}
								fontWeight='700'
								maxW='400px'>
								Hashstack Tokenomics
							</Text>
							<Text maxW='500px'>
								The HSTK token serves as the cornerstone of our
								DeFi ecosystem, built to drive value,
								incentivize active participation, and generate
								sustainable economic momentum.
							</Text>
							<Box
								height='1px'
								border='1px solid #272943'
								width='60%'></Box>
							<Box
								display='flex'
								flexDirection='column'
								mt='0.5rem'>
								<Box
									borderRadius='500px'
									bg='#7331EA'
									width='22px'
									height='22px'
									display='flex'
									justifyContent='center'
									alignItems='center'>
									1
								</Box>
								<Text
									mt='0.8rem'
									fontWeight='700'>
									Store of authority(Governance)
								</Text>
								<Text
									mt='0.5rem'
									lineHeight='20px'
									fontSize={
										isSmallerThan500 ? '12px' : '16px'
									}
									color='#676D9A'>
									To enable decentralised governance.
								</Text>
							</Box>
							<Box
								display='flex'
								flexDirection='column'
								mt='0.5rem'>
								<Box
									borderRadius='500px'
									bg='#7331EA'
									width='22px'
									height='22px'
									display='flex'
									justifyContent='center'
									alignItems='center'>
									2
								</Box>
								<Text
									mt='0.8rem'
									fontWeight='700'>
									Store of authority(Store of value(Utility))
								</Text>
								<Text
									mt='0.5rem'
									lineHeight='20px'
									fontSize={
										isSmallerThan500 ? '12px' : '16px'
									}
									color='#676D9A'
									maxW='500px'>
									For payment of in-dapp transaction fees,
									compensating partner projects, KOLs, and
									community participants who help
									secure/further the Hashstack ecosystem.
								</Text>
							</Box>
							<Box
								display='flex'
								flexDirection='column'
								mt='0.5rem'>
								<Box
									borderRadius='500px'
									bg='#7331EA'
									width='22px'
									height='22px'
									display='flex'
									justifyContent='center'
									alignItems='center'>
									3
								</Box>
								<Text
									mt='0.8rem'
									fontWeight='700'>
									Unlock liquidator role
								</Text>
								<Text
									mt='0.5rem'
									lineHeight='20px'
									fontSize={
										isSmallerThan500 ? '12px' : '16px'
									}
									color='#676D9A'
									maxW='500px'>
									Liquidators on Hashstack take the
									responsibility of repaying the bad debt to
									the Hashstack protocol, in-exchange for
									acquiring them at a discount.
								</Text>
							</Box>
						</Box>
						<Box
							display='flex'
							flexDirection='column'
							gap='0rem'
							mt='2rem'>
							<ContributorsChart />
							{!isSmallerThan700 ?
								<Box
									display='flex'
									flexDirection='column'
									gap='2rem'
									mt='3rem'>
									<Box
										display='flex'
										gap='1.5rem'>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #3E7CFF'>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												18%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Hashstack Investors
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #00D395'>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												24.4%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Adoption Incentives
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #00C7F2'>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												3.3%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Community
											</Text>
										</Box>
									</Box>
									<Box
										display='flex'
										gap='1.5rem'>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #FFAB80'>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												14%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Product development
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #A38CFF'>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												26%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Founder(s) & team
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #FFD347'>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												14.3%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Exchange liquidity
											</Text>
										</Box>
									</Box>
								</Box>
							:	<Box
									display='flex'
									flexDirection='column'
									gap='2rem'
									mt='3rem'
									fontSize={
										isSmallerThan500 ? '14px' : '16px'
									}>
									<Box
										display='flex'
										flexWrap='wrap'
										gap='1.5rem'
										justifyContent={{
											base: 'center',
											md: 'flex-start',
										}}>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #3E7CFF'
											width={{ base: '45%', md: 'auto' }}>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												18%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Hashstack Investors
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #00D395'
											width={{ base: '45%', md: 'auto' }}>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												24.4%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Adoption Incentives
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #00C7F2'
											width={{ base: '45%', md: 'auto' }}>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												3.3%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Community
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #FFAB80'
											width={{ base: '45%', md: 'auto' }}>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												14%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Product development
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #A38CFF'
											width={{ base: '45%', md: 'auto' }}>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												26%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Founder(s) & team
											</Text>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											borderLeft='4px solid #FFD347'
											width={{ base: '45%', md: 'auto' }}>
											<Text
												ml='0.4rem'
												fontWeight='700'>
												14.3%
											</Text>
											<Text
												ml='0.4rem'
												fontWeight='600'
												color='#676D9A'>
												Exchange liquidity
											</Text>
										</Box>
									</Box>
								</Box>
							}
						</Box>
					</Box>
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
				</Box>
			}
			<Footer />
		</Box>
	);
}
