import WhitetickIcon from '@/assets/whitetickIcon';
import ConnectWalletL1Modal from '@/components/modals/ConnectWalletL1Modal';
import ConnectStarknetWalletModal from '@/components/modals/ConnectWalletModal';
import numberFormatter from '@/functions/numberFormatter';
import {
	Box,
	Input,
	InputGroup,
	Spinner,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';

interface EligibilityCheckerProps {
	addressInput: string;
	addressDetails: any;
	addressAuthenticated: boolean;
	totalClaimableAmount: number;
	currentClaimableAmount: number;
	setaddressDetails: (details: any) => void;
	setaddressSearched: (searched: boolean) => void;
	setaddressAuthenticated: (authenticated: boolean) => void;
	setaddressInput: (input: string) => void;
	handleSearch: () => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
	addressInput,
	addressDetails,
	addressAuthenticated,
	totalClaimableAmount,
	currentClaimableAmount,
	setaddressDetails,
	setaddressSearched,
	setaddressAuthenticated,
	setaddressInput,
	handleSearch,
}) => {
	const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

	return (
		<>
			<Box
				display='flex'
				width='100%'
				mb='0rem'
				mt='3rem'>
				<Box
					display='flex'
					flexDirection='column'
					width='100%'
					justifyContent='center'
					alignItems='center'>
					<Text
						fontSize={isSmallerThan700 ? '20px' : '32px'}
						fontWeight='700'>
						Check Your Eligibility
					</Text>
					<Box
						display='flex'
						mt='1.5rem'
						background='none'>
						<InputGroup
							width={
								isSmallerThan700 ? '60%'
								: isSmallerThan1000 ?
									'400px'
								:	'600px'
							}
							mt='0rem'
							border='1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))'
							borderRight='0px'
							borderRadius='6px 0px 0px 6px'
							height='50px'
							bg='white'
							ml={isSmallerThan700 ? '2rem' : '0rem'}>
							<Input
								fontSize='16px'
								height='100%'
								border='none'
								pl='0.5rem'
								color='black'
								placeholder='enter your address'
								_placeholder={{ color: '#BFBFC7' }}
								value={addressInput}
								ml={'0.4rem'}
								onChange={(e) => {
									setaddressDetails(null);
									setaddressSearched(false);
									setaddressAuthenticated(false);
									setaddressInput(e.target.value);
								}}
								paddingInlineStart='0'
								_focus={{
									outline: '0',
									boxShadow: 'none',
								}}
							/>
						</InputGroup>
						{addressAuthenticated ?
							addressDetails ?
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									paddingLeft='16px'
									paddingRight='16px'
									borderRightRadius='6px'
									bg='#323FF4'
									width={
										isSmallerThan1000 ? '200px' : '300px'
									}
									height='50px'>
									<WhitetickIcon />
									<Text ml='0.4rem'>Authenticated</Text>
								</Box>
							:	<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									paddingLeft='16px'
									width={
										isSmallerThan1000 ? '200px' : '300px'
									}
									paddingRight='16px'
									borderRightRadius='6px'
									bg='#323FF4'
									gap='0.4rem'
									height='50px'>
									<Spinner />
									<Text ml='0.2rem'>Verifiying</Text>
								</Box>

						: (
							(addressInput.length >= 64 &&
								addressInput.length <= 68) ||
							(addressInput.length <= 42 &&
								addressInput.length >= 40)
						) ?
							(
								addressInput.length >= 64 &&
								addressInput.length <= 68
							) ?
								<ConnectStarknetWalletModal
									cursor='pointer'
									display='flex'
									justifyContent='center'
									alignItems='center'
									paddingLeft='16px'
									paddingRight='16px'
									borderRightRadius='6px'
									bg='#323FF4'
									width={
										isSmallerThan1000 ? '200px' : '300px'
									}
									buttonText='Authenticate'
									height='50px'
								/>
							:	<ConnectWalletL1Modal
									cursor='pointer'
									display='flex'
									justifyContent='center'
									alignItems='center'
									paddingLeft='16px'
									paddingRight='16px'
									width={
										isSmallerThan1000 ? '200px' : '300px'
									}
									borderRightRadius='6px'
									bg='#323FF4'
									buttonText='Authenticate'
									height='50px'
								/>

						:	<Box
								cursor='pointer'
								display='flex'
								width={isSmallerThan1000 ? '200px' : '300px'}
								justifyContent='center'
								alignItems='center'
								paddingLeft='16px'
								paddingRight='16px'
								borderRightRadius='6px'
								bg='#323FF4'
								onClick={() => {
									if (addressInput.length !== 0) {
										handleSearch();
									}
								}}>
								Authenticate
							</Box>
						}
					</Box>
				</Box>
			</Box>
			{addressDetails && (
				<Box
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'
					textAlign='center'
					mt='1rem'
					gap={isSmallerThan700 ? '1rem' : '2rem'}>
					<Box
						display='flex'
						color='white'
						alignItems='center'
						flexDirection='column'
						padding={isSmallerThan700 ? '16px 32px' : '32px 64px'}
						bg='#120F25'
						border='1px solid #2C2B48'
						borderRadius='6px'
						mt='1rem'>
						<Text
							whiteSpace='nowrap'
							fontWeight='600'
							fontSize='18px'>
							{numberFormatter(totalClaimableAmount)} HSTK
						</Text>
						<Text
							whiteSpace='nowrap'
							color='#676D9A'>
							Tokens
						</Text>
					</Box>
					<Box
						display='flex'
						color='white'
						alignItems='center'
						flexDirection='column'
						border='1px solid #2C2B48'
						padding={isSmallerThan700 ? '16px 32px' : '32px 64px'}
						bg='#120F25'
						borderRadius='6px'
						mt='1rem'>
						<Text
							whiteSpace='nowrap'
							fontWeight='600'
							fontSize='18px'>
							{numberFormatter(currentClaimableAmount)} HSTK
						</Text>
						<Text
							whiteSpace='nowrap'
							color='#676D9A'>
							Claimable Tokens
						</Text>
					</Box>
				</Box>
			)}
		</>
	);
};
