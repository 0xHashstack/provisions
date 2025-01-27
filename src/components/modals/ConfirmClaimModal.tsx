import BravosIcon from '@/assets/braavos';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Tooltip,
	Slider,
	SliderMark,
	SliderTrack,
	SliderThumb,
	SliderFilledTrack,
	NumberInput,
	NumberInputField,
	Box,
	Text,
	Card,
	ModalHeader,
	Skeleton,
} from '@chakra-ui/react';
import { useAccount, useConnectors } from '@starknet-react/core';
import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import ETHLogo from '@/assets/eth';
import STRKLogo from '@/assets/strk';
import InfoIcon from '@/assets/infoIcon';
import { useDrawContext } from '@/context/DrawerContext';
import { toast } from 'react-toastify';

const ConfirmClaimModal = ({
	buttonText,
	walletTypeSelected,
	allocatedAddress,
	claimAddress,
	...restProps
}: any) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [availableDataLoading, setAvailableDataLoading] = useState(true);
	const { account, address, status, isConnected } = useAccount();
	const { userConfirmation, toggleConfirmation, setuserConfirmation } =
		useDrawContext();
	// const { data, isLoading, error, refetch } = useBalance({
	//   address
	// })
	const { available, disconnect, connect, connectors, refresh } =
		useConnectors();

	useEffect(() => {
		const interval = setInterval(refresh, 2000);
		// setAvailableDataLoading(false);
		return () => clearInterval(interval);
	}, [refresh]);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setAvailableDataLoading(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [refresh]);
	useEffect(() => {
		if (address) {
			onClose();
		}
	}, [address]);
	return (
		<Box>
			<Box
				onClick={() => {
					onOpen();
				}}
				{...restProps}>
				{buttonText}
			</Box>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
				}}
				isCentered
				size={{ width: '200px', height: '100px' }}
				scrollBehavior='inside'>
				<ModalOverlay
					bg='rgba(244, 242, 255, 0.5);'
					mt='3.8rem'
				/>
				<ModalContent
					mt='8rem'
					bg={'#02010F'}
					maxW={walletTypeSelected === 'L1' ? '480px' : '650px'}>
					<ModalHeader
						mt='1rem'
						fontSize='18px'
						fontWeight='600'
						fontStyle='normal'
						lineHeight='20px'
						color='white'
						display='flex'
						gap='0.5rem'
						alignItems='center'>
						<Text color='#676D9A'>Network:</Text>
						{walletTypeSelected === 'L1' ?
							<ETHLogo
								width={18}
								height={18}
							/>
						:	<STRKLogo
								width={18}
								height={18}
							/>
						}
						<Text>
							{walletTypeSelected === 'L1' ?
								'Ethereum'
							:	'Starknet'}
						</Text>
					</ModalHeader>
					<ModalCloseButton
						color='white'
						mt='1rem'
						mr='1rem'
					/>
					{/* <ModalHeader>Borrow</ModalHeader> */}
					<ModalBody
						color={'#E6EDF3'}
						overflow='hidden'>
						{/* <ModalCloseButton mt="1rem" mr="1rem" color="white" /> */}
						{/* <button onClick={onClose}>Cancel</button> */}
						<Box
							display='flex'
							justifyContent='center'
							alignItems='center'
							backgroundColor='#191922'
							//   height="100vh"
						>
							{/* <PageCard
      justifyContent="center"
      alignItems="center"
      backgroundColor="#191922"
      height="100vh"
    > */}

							<Box
								display='flex'
								background='#02010F'
								flexDirection='column'
								alignItems='flex-start'
								padding='0px 64px'
								pb='16px' // width="562px"
								// height="567px"
								borderRadius='8px'
								// bgColor="red"
							>
								<Card
									p='1rem'
									background='var(--surface-of-10, rgba(103, 109, 154, 0.10))'
									border='1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))'
									// width="400px"
									// width="500px"
									// mt="8px"
								>
									<Box
										w='full'
										// border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
										py='2'
										borderRadius='6px'
										gap='1rem'
										display='flex'
										flexDirection='column'
										justifyContent='space-between'
										cursor='pointer'
										// onClick={() => router.push("/market")}
									>
										<Box
											display='flex'
											flexDirection='column'
											gap='0.2rem'>
											<Text color='#676D9A'>
												Allocated Address
											</Text>
											<Box
												display='flex'
												gap='0.2rem'
												alignItems='center'>
												{walletTypeSelected === 'L1' ?
													<ETHLogo
														width={16}
														height={16}
													/>
												:	<STRKLogo
														width={16}
														height={16}
													/>
												}
												<Text
													fontSize='14px'
													color='white'>
													{allocatedAddress}
												</Text>
											</Box>
										</Box>
										<Box
											display='flex'
											flexDirection='column'
											gap='0.2rem'>
											<Text color='#676D9A'>
												Claim Address
											</Text>
											<Box
												display='flex'
												gap='0.2rem'
												alignItems='center'>
												{walletTypeSelected === 'L1' ?
													<ETHLogo
														width={16}
														height={16}
													/>
												:	<STRKLogo
														width={16}
														height={16}
													/>
												}
												<Text
													fontSize='14px'
													color='white'>
													{claimAddress}
												</Text>
											</Box>
										</Box>
									</Box>
								</Card>
								<Box
									display='flex'
									gap='0.2rem'
									mt='1rem'>
									<Box mt='0.2rem'>
										<InfoIcon />
									</Box>
									<Text
										color='#676D9A'
										fontSize='14px'>
										Claim addresses is where you receive
										your HSTK tokens. You can only update it
										once.
									</Text>
								</Box>
								<Box
									mt='2rem'
									display='flex'
									alignItems='flex-end'
									justifyContent='flex-end'
									gap='1rem'
									width='100%'
									pl='0.5rem'>
									<Button
										width='30%'
										color='white'
										bg='#34345680'
										border='1px solid #34345699'
										borderRadius='6px'
										_hover={{
											bg: '#34345680',
											color: 'white',
										}}
										onClick={() => {
											onClose();
										}}>
										Cancel
									</Button>
									<Button
										width='30%'
										border='1px solid white'
										bg='none'
										color='white'
										borderRadius='6px'
										_hover={{ bg: 'none', color: 'white' }}
										onClick={() => {
											setuserConfirmation(true);
											toast.success(
												'Claim address updated successfully',
												{
													position: 'bottom-right',
												}
											);
											onClose();
										}}>
										Confirm
									</Button>
								</Box>
							</Box>
							{/* </PageCard> */}
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ConfirmClaimModal;
