import { Box, Text } from '@chakra-ui/react';
import ContributorsChart from '@/components/charts/ContributorsChart';

const Charts = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			gap='0rem'
			mt='2rem'>
			<ContributorsChart />
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
		</Box>
	);
};

export default Charts;
