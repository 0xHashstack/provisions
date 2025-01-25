'use client';
import Navbar from '@/components/Navbar';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Input,
	InputGroup,
	Spinner,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import {
	useAccount as useAccountL1,
	useWaitForTransaction,
	useDisconnect,
} from 'wagmi';
import airdropIcon from '../../assets/airdrop.jpg';
import investorIcon from '../../assets/investor.png';
import othersIcon from '../../assets/others.png';
import ccpIcon from '../../assets/ccp.jpg';
import kolIcon from '../../assets/kols.png';
import Image from 'next/image';
import HashTokenIconFloater from '@/assets/hashTokenIconFloater';
import ConnectStarknetWalletModal from '@/components/modals/ConnectWalletModal';
import {
	useAccount,
	useConnectors,
	useWaitForTransaction as useWaitForTransactionStarknet,
} from '@starknet-react/core';
import ConnectWalletL1Modal from '@/components/modals/ConnectWalletL1Modal';
import { parseAmount, processAddress } from '@/Blockchain/utils/utils';
import WhitetickIcon from '@/assets/whitetickIcon';
import { toast } from 'react-toastify';
import useClaimL1 from '@/Blockchain/hooks/useClaimL1';
import useClaimStarknet from '@/Blockchain/hooks/useClaimStarknet';
import {
	getuserbeneficiaryTicketsL1,
	getuserbeneficiaryTicketsL2,
	viewTicket,
	viewTicketL2,
} from '@/Blockchain/scripts/claimProxy';
import numberFormatter from '@/functions/numberFormatter';
import { useDrawContext } from '@/context/DrawerContext';
import HstkLogo from '@/assets/HstkLogo';
import VideoLogo from '@/assets/videoLogo';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Provisions() {
	const [isLargerThan2000] = useMediaQuery('(min-width: 2000px)');
	const [isSmallerThan1250] = useMediaQuery('(max-width: 1250px)');
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
	const [addressSearched, setaddressSearched] = useState<boolean>(false);
	const [addressDetails, setaddressDetails] = useState<any>();
	const [addressAuthenticated, setaddressAuthenticated] =
		useState<boolean>(false);
	const [walletTypeSelected, setwalletTypeSelected] = useState('');
	const [addressInput, setaddressInput] = useState('');
	const [claimAddress, setclaimAddress] = useState('');
	const [totalClaimableAmount, settotalClaimableAmount] = useState<number>(0);
	const [currentClaimableAmount, setcurrentClaimableAmount] =
		useState<number>(0);
	const [calltransaction, setcalltransaction] = useState(false);
	const [provisionCategories, setprovisionCategories] = useState([
		{
			ticketId: 0,
			id: 'Airdrop 1',
			claimableAmount: 0,
			currentClaimableAmount: 0,
			EmissionRate: 27.37,
			ticketType: 2,
			description:
				'You should have completed more than five transactions on Hashstack V1 across three months, with $100+ cumulative value and $25 minimum supply/borrow balance.',
			icon: airdropIcon,
		},
		{
			ticketId: 0,
			id: 'CCP',
			claimableAmount: 0,
			currentClaimableAmount: 0,
			EmissionRate: 4.7,
			ticketType: 3,
			description:
				'You should have generated diverse, original content about Hashstack across multiple platforms, creating at least three distinct pieces in different formats.',
			icon: ccpIcon,
		},
		{
			ticketId: 0,
			id: 'Investors',
			claimableAmount: 0,
			currentClaimableAmount: 0,
			EmissionRate: 41.06,
			ticketType: 0,
			description:
				'Early private round investors who contributed to our foundational stage are eligible to claim their benefits.',
			icon: investorIcon,
		},
		{
			ticketId: 0,
			id: 'Community partners',
			claimableAmount: 0,
			currentClaimableAmount: 0,
			EmissionRate: 41.06,
			ticketType: 1,
			description:
				'Key community members who actively promoted our product across various channels qualify for this program.',
			icon: kolIcon,
		},
		{
			ticketId: 0,
			id: 'Others',
			claimableAmount: 0,
			currentClaimableAmount: 0,
			EmissionRate: 41.06,
			ticketType: 4,
			description:
				'Individuals with previous SAFT allocations or past incentive program eligibility can claim through this section.',
			icon: othersIcon,
		},
	]);

	const [claimAddressConfirmed, setclaimAddressConfirmed] =
		useState<boolean>(false);

	// const
	const [render, setRender] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setRender(true);
		}, 2000);
	}, []);
	const faqData = [
		{
			question: 'Why do I see zero claimable tokens?',
			answer:
				'Check if you meet the eligibility criteria under Airdrop, CCP, or Early Investors at https://token.hashstack.finance/tokenomics.',
		},
		{
			question: 'My wallet address is missing in the JSON provision file!',
			answer:
				'Ensure you’re searching without leading zeros and verify if you qualify under the defined eligibility categories.',
		},
		{
			question:
				'I participated in campaigns but don’t see my allocations. Why?',
			answer:
				'Double-check the eligibility criteria (e.g., number of CCP posts or transaction thresholds) on the https://token.hashstack.finance/tokenomics page.',
		},
		{
			question: 'Why does my leaderboard rank not match token allocations?',
			answer:
				'Token allocations depend on contribution quality, not just leaderboard rank; refer to the CCP guidelines for more details.',
		},
		{
			question: 'Where can I trade HSTK tokens now?',
			answer:
				'HSTK is live on Uniswap and Ekubo. You can trade or swap your tokens their',
		},
		{
			question: 'Can we get a token chart or swap link?',
			answer:
				'Charts and swap links will be updated in announcements shortly; keep an eye on official channels.',
		},
		{
			question: 'What are the staking benefits for HSTK?',
			answer:
				' HSTK offers utility for governance, transaction fees, and unlocking features; specific staking benefits will be revealed in future updates.',
		},
		{
			question: 'Will HSTK be listed on centralized exchanges?',
			answer:
				'Listings on centralized exchanges are being explored; stay tuned for official announcements.',
		},
		{
			question: 'I’m new. How do I get started with Hashstack?',
			answer:
				'Visit https://hashstack.finance for documentation and walkthrough videos to help you get started',
		},
	];
	const renderAnswer = (text: string) => {
		const parts = text.split(/(https?:\/\/[^\s]+)/g); // Split text into parts by URLs
		return parts.map((part, index) => {
			if (part.match(/https?:\/\/[^\s]+/)) {
				return (
					<a
						key={index}
						href={part}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#676D9A', textDecoration: 'underline' }} // Optional: Styling for the link
					>
						{part}
					</a>
				);
			}
			return <span key={index}>{part}</span>;
		});
	};
	const handleSearch = async () => {
		if (
			(addressInput.length >= 64 && addressInput.length <= 68) ||
			(addressInput.length <= 42 && addressInput.length >= 40)
		) {
			// setaddressDetails(1);
			// setaddressSearched(true);
		} else {
			toast.error('Please enter correct address', {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: false,
			});
		}
	};
	const {
		dataClaimL1,
		isSuccessL1,
		isErrorL1,
		writeClaimL1,
		claimAddressL1,
		setclaimAddressL1,
		ticketId,
		setticketId,
		errorL1,
	} = useClaimL1();

	const {
		claimAddressL2,
		setclaimAddressL2,
		ticketIdL2,
		setticketIdL2,
		dataClaimL2,
		errorClaimL2,
		resetClaimL2,
		writeClaimL2,
		writeAsyncClaimL2,
		isErrorClaimL2,
		isIdleClaimL2,
		isSuccessClaimL2,
		statusClaimL2,
	} = useClaimStarknet();

	const { isLoading: approveLoading, isSuccess: approveSuccess } =
		useWaitForTransaction({
			hash: dataClaimL1?.hash,
		});
	const { data, error, isLoading, isError, isSuccess } =
		useWaitForTransactionStarknet({
			hash: dataClaimL2?.transaction_hash,
			watch: true,
		});
	const errorMessages = {
		ElectionInactive: 'Election is Not Active',
		OwnerPermissioned: 'Must be Owner of Election',
		AlreadyVoted: 'Vote Already Casted',
		GetVotes: 'Error in Getting Voted',
		ElectionIncomplete: 'Election is still Active',
		OnlyOwner: 'Must be Owner of Election',
		NotEnoughBalance: 'Link Tokens exhausted',
		VoteInputLength: 'Incorrect Length of Vote ',
		IncorrectCredits: ' Incorrect Credits Given',
		NoCandidates: 'No Candidates to Vote',
		ChainMismatchError: 'Switch to Mainnet!',
		NothingToClaim:
			'You have currently claimed the full amount. Please wait for the cliff period to end before claiming any additional funds.',
	};

	const ErrorMessage = (error: any) => {
		console.log('Error : ', error);
		for (const [key, message] of Object.entries(errorMessages)) {
			if (error.message.includes(key)) {
				return message;
			}
		}
		return 'Something went wrong. Please try again.';
	};
	const handleTransactionl1 = async () => {
		try {
			if (ticketId !== 0) {
				const res = await writeClaimL1();
			}
		} catch (error) {
			toast.error(`${ErrorMessage(error)}`, {
				position: 'bottom-right',
			});
			console.log(error, 'err l1');
		}
	};

	const handleTransactionL2 = async () => {
		try {
			if (ticketIdL2 !== 0) {
				const res = await writeAsyncClaimL2();
			}
		} catch (error) {
			toast.error(`${ErrorMessage(error)}`, {
				position: 'bottom-right',
			});
			console.log(error, 'err l2');
		}
	};

	useEffect(() => {
		if (approveSuccess && !approveLoading) {
			toast.success('Successfully claimed HSTK Tokens', {
				position: 'bottom-right',
			});
			setcalltransaction(false);
		}
	}, [approveSuccess]);

	useEffect(() => {
		if (claimAddress) {
			setclaimAddressL1(claimAddress);
			setclaimAddressL2(claimAddress);
		}
	}, [claimAddress, addressAuthenticated]);

	const updateProvisionCategories = (incomingData: any) => {
		const updatedCategories = provisionCategories.map((category) => {
			const matchingData = incomingData.find(
				(data: any, index: number) => data.ticketType === category.ticketType
			);

			if (matchingData) {
				return {
					...category,
					ticketId: matchingData.ticketId,
					claimableAmount: parseAmount(matchingData.amount.toString()),
					currentClaimableAmount: parseAmount(matchingData.balance.toString()),
				};
			}

			return category;
		});

		setprovisionCategories(updatedCategories);
	};
	const updateProvisionCategoriesL2 = (incomingData: any) => {
		const updatedCategories = provisionCategories.map((category) => {
			const matchingData = incomingData.find(
				(data: any, index: number) =>
					Number(data.ticket_type) === category.ticketType
			);

			if (matchingData) {
				return {
					...category,
					ticketId: matchingData.ticketId,
					claimableAmount: parseAmount(matchingData.amount.toString()),
					currentClaimableAmount: parseAmount(matchingData.balance.toString()),
				};
			}

			return category;
		});

		setprovisionCategories(updatedCategories);
	};
	useEffect(() => {
		if (
			addressInput.length <= 42 &&
			addressInput.length >= 40 &&
			addressAuthenticated &&
			addressL1
		) {
			let arr: any = [];
			const fetchData = async () => {
				try {
					const res = await getuserbeneficiaryTicketsL1(addressL1);
					const dataTickets = res;

					for (let i = 0; i < dataTickets.length; i++) {
						arr.push(Number(dataTickets[i]));
					}

					let arrTicketValues: any = [];
					if (arr.length > 0) {
						const promises = arr.map(async (ticketId: any) => {
							const res2 = await viewTicket(ticketId);
							return { ...res2, ticketId };
						});

						const arrTicketValues = await Promise.all(promises);
						if (arrTicketValues.length > 0) {
							updateProvisionCategories(arrTicketValues);
						}
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				} finally {
					// Ensure addressSearched is set to true after all calls are complete
					setaddressDetails(provisionCategories);
					// setaddressSearched(true);
				}
			};

			fetchData();
		} else if (
			addressInput.length >= 64 &&
			addressInput.length <= 68 &&
			addressAuthenticated &&
			address
		) {
			let arr: any = [];
			const fetchData = async () => {
				try {
					const res = await getuserbeneficiaryTicketsL2(
						processAddress(address)
					);
					console.log(res, 'value');
					const dataTickets = res;

					for (let i = 0; i < dataTickets.length; i++) {
						arr.push(Number(dataTickets[i]));
					}

					let arrTicketValues: any = [];
					if (arr.length > 0) {
						const promises = arr.map(async (ticketId: any) => {
							const res2 = await viewTicketL2(ticketId);
							return { ...res2, ticketId };
						});

						const arrTicketValues = await Promise.all(promises);
						if (arrTicketValues.length > 0) {
							updateProvisionCategoriesL2(arrTicketValues);
						}
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				} finally {
					// Ensure addressSearched is set to true after all calls are complete
					setaddressDetails(provisionCategories);
					// setaddressSearched(true);
				}
			};

			fetchData();
		}
	}, [addressInput, addressAuthenticated, approveSuccess, isSuccess]);

	useEffect(() => {
		if (addressDetails) {
			let valueTotal = 0;
			let currentClaimbale = 0;
			for (var i = 0; i < provisionCategories.length; i++) {
				valueTotal += provisionCategories[i].claimableAmount;
				currentClaimbale += provisionCategories[i].currentClaimableAmount;
			}
			setcurrentClaimableAmount(currentClaimbale);
			settotalClaimableAmount(valueTotal);
		}
	}, [addressDetails, approveSuccess, isSuccess]);

	useEffect(() => {
		if (isSuccess && !isLoading) {
			toast.success('Successfully claimed HSTK Tokens', {
				position: 'bottom-right',
			});
			setcalltransaction(false);
		}
	}, [isSuccess]);

	const { address: addressL1 } = useAccountL1();
	const { address, account } = useAccount();
	const { available, disconnect, connectors } = useConnectors();
	const { disconnect: disconnectL1 } = useDisconnect();
	const [toastPopupConfimred, settoastPopupConfimred] =
		useState<boolean>(false);
	const [loading, setloading] = useState(false);
	const { userConfirmation, toggleConfirmation } = useDrawContext();
	useEffect(() => {
		if (addressInput) {
			if (address || addressL1) {
				if (address) {
					if (processAddress(address) === processAddress(addressInput)) {
						setaddressAuthenticated(true);
					} else {
						if (loading) {
							if (!toastPopupConfimred) {
								toast.error('Please sign in with the correct wallet address', {
									position: 'bottom-right',
								});
								settoastPopupConfimred(true);
							}
						}
					}
				}
				if (addressL1) {
					if (addressL1 === addressInput) {
						setaddressAuthenticated(true);
					} else {
						if (loading) {
							if (!toastPopupConfimred) {
								toast.error('Please sign in with the correct wallet address', {
									position: 'bottom-right',
								});
								settoastPopupConfimred(true);
							}
						}
					}
				}
			}
		}
	}, [address, addressL1]);

	useEffect(() => {
		if (!addressInput) {
			if (address) {
				disconnect();
			}
			if (addressL1) {
				disconnectL1();
			}
			setloading(true);
		}
	}, [loading, address, addressL1]);

	useEffect(() => {
		if (addressInput.length >= 64 && addressInput.length <= 68 && address) {
			setwalletTypeSelected('L2');
		} else if (
			addressInput.length <= 42 &&
			addressInput.length >= 40 &&
			addressL1
		) {
			setwalletTypeSelected('L1');
		} else {
			setwalletTypeSelected('');
		}
	}, [addressInput, address, addressL1]);

	useEffect(() => {
		if (walletTypeSelected === 'L1') {
			if (claimAddress !== '') {
				if (claimAddress.length === 42) {
					setclaimAddressConfirmed(true);
				} else {
					setclaimAddressConfirmed(false);
				}
			}
		} else {
			if (claimAddress !== '') {
				if (claimAddress.length === 66) {
					setclaimAddressConfirmed(true);
				} else {
					setclaimAddressConfirmed(false);
				}
			}
		}
	}, [walletTypeSelected, claimAddress]);

	useEffect(() => {
		if (calltransaction) {
			if (ticketId !== 0 && addressL1) {
				handleTransactionl1();
			}
			if (ticketIdL2 !== 0 && address) {
				handleTransactionL2();
			}
		}
	}, [calltransaction, ticketId, ticketIdL2]);

	useEffect(() => {
		if (walletTypeSelected === 'L1') {
			if (claimAddress !== '') {
			}
		}
	}, [walletTypeSelected, claimAddress]);

	return (
		<Box>
			<Box
				background={`
            radial-gradient(circle 1800px at top left, rgba(115, 49, 234, 0.10), transparent) top left,
            radial-gradient(circle 1200px at bottom right, rgba(115, 49, 234, 0.10), transparent) bottom right,
            black
          `}
				position={'fixed'}
				zIndex={3}
			>
				<Navbar />
			</Box>
			{
				<Box
					background={`
    radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.2), transparent),
    radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.2), transparent),
    black
  `}
					backgroundAttachment="fixed"
					position="relative"
					color="white"
					zIndex={1}
					padding="0"
					pr={isSmallerThan1250 ? '1rem' : '4rem'}
					pl={isLargerThan2000 ? '6rem' : isSmallerThan1250 ? '0rem' : '4rem'}
					display="flex"
					flexDirection="column"
					minHeight="100vh"
					pt="6rem"
					pb={'7rem'}
				>
					<Box
						position="absolute"
						top={
							isSmallerThan700
								? addressAuthenticated
									? '3%'
									: '5%'
								: addressAuthenticated
								? '6%'
								: '7%'
						}
						left={isSmallerThan700 ? '4%' : '7%'}
						transform="rotate(120deg)"
					>
						<HashTokenIconFloater />
					</Box>
					<Box
						position="absolute"
						top={
							isSmallerThan700
								? addressAuthenticated
									? '7%'
									: '9%'
								: addressAuthenticated
								? '11%'
								: '13%'
						}
						left={'18%'}
						width="14px"
						height="14px"
						bg="#9780FF"
						borderRadius="200px"
					/>
					<Box
						position="absolute"
						top={
							isSmallerThan700
								? addressAuthenticated
									? '3%'
									: '5%'
								: addressAuthenticated
								? '6%'
								: '7%'
						}
						right={isSmallerThan700 ? '5%' : '7%'}
					>
						<HashTokenIconFloater />
					</Box>
					<Box
						position="absolute"
						top={
							isSmallerThan700
								? addressAuthenticated
									? '7%'
									: '9%'
								: addressAuthenticated
								? '11%'
								: '13%'
						}
						right="18%"
						width="14px"
						height="14px"
						bg="#9780FF"
						borderRadius="200px"
					/>
					<Box width="100%">
						<Box width="100%">
							<Box display="flex" width="100%" justifyContent="center">
								<Box display="flex" flexDirection="column" alignItems="center">
									<Box borderRadius="200px" border="10px solid #3B39C9">
										<HstkLogo />
									</Box>
									<Text
										fontSize={isSmallerThan700 ? '36px' : '56px'}
										mt="1rem"
										fontWeight="700"
									>
										HSTK
									</Text>
								</Box>
							</Box>
							<Box display="flex" width="100%" justifyContent="center">
								<Text fontSize={isSmallerThan700 ? '28px' : '44px'} mt="1rem">
									Hashstack Provisions
								</Text>
							</Box>
							<Box width="100%" display="flex" justifyContent="center">
								<Text
									maxW="900px"
									mt="2rem"
									fontSize={
										isSmallerThan700
											? '12px'
											: isSmallerThan1250
											? '14px'
											: '16px'
									}
									lineHeight="20px"
									textAlign="left"
									color="#F0F0F0"
									ml={isSmallerThan1000 ? '2rem' : '0'}
								>
									Hashstack team is excited to introduce the HSTK provisions.
									Over the 4 past years of our existence, we have been fortunate
									to have worked with the members of various groups in the form
									of product users, investors, community contributors who have
									helped advance Hashstack. Through out this journey, we have
									incentivised your participation through points, token
									allocation etc. Provisions page is where you claim them, the
									HSTK tokens.
								</Text>
							</Box>
							<Box
								display="flex"
								width="100%"
								justifyContent="center"
								alignItems="center"
								mt="3rem"
								gap="0.5rem"
								cursor="pointer"
							>
								<VideoLogo />
								<Link
									href="https://app.supademo.com/demo/cm4ts6m8j0qfh6gs8dm50znl7"
									target="_blank"
								>
									<Text
										color="#00D395"
										border="2px dotted transparent"
										_hover={{ borderBottom: '2px dotted #00D395' }}
										cursor="pointer"
									>
										Quick guide to HSTK provisions
									</Text>
								</Link>
							</Box>
						</Box>
					</Box>
					<Box display="flex" width="100%" mb="0rem" mt="3rem">
						<Box
							display="flex"
							flexDirection="column"
							width="100%"
							justifyContent="center"
							alignItems="center"
						>
							<Text
								fontSize={isSmallerThan700 ? '20px' : '32px'}
								fontWeight="700"
							>
								Check Your Eligibility
							</Text>
							<Box display="flex" mt="1.5rem" background="none">
								<InputGroup
									width={
										isSmallerThan700
											? '60%'
											: isSmallerThan1000
											? '400px'
											: '600px'
									}
									mt="0rem"
									border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
									borderRight="0px"
									borderRadius="6px 0px 0px 6px"
									height="50px"
									bg="white"
									ml={isSmallerThan700 ? '2rem' : '0rem'}
								>
									<Input
										fontSize="16px"
										height="100%"
										border="none"
										pl="0.5rem"
										color="black"
										placeholder="enter your address"
										_placeholder={{ color: '#BFBFC7' }}
										value={addressInput}
										ml={'0.4rem'}
										// isDisabled={true}
										onChange={(e) => {
											setaddressDetails(null);
											setaddressSearched(false);
											setaddressAuthenticated(false);
											setaddressInput(e.target.value);
										}}
										//   value={
										//     totalBorrow == 0 && totalSupply == 0 ? '****' : refferal
										//   }
										paddingInlineStart="0"
										_focus={{
											outline: '0',
											boxShadow: 'none',
										}}
										//   onChange={handleChange}
									/>
								</InputGroup>
								{addressAuthenticated ? (
									addressDetails ? (
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
											paddingLeft="16px"
											paddingRight="16px"
											borderRightRadius="6px"
											bg="#323FF4"
											width={isSmallerThan1000 ? '200px' : '300px'}
											height="50px"
										>
											<WhitetickIcon />
											<Text ml="0.4rem">Authenticated</Text>
										</Box>
									) : (
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
											paddingLeft="16px"
											width={isSmallerThan1000 ? '200px' : '300px'}
											paddingRight="16px"
											borderRightRadius="6px"
											bg="#323FF4"
											gap="0.4rem"
											height="50px"
										>
											<Spinner />
											<Text ml="0.2rem">Verifiying</Text>
										</Box>
									)
								) : (addressInput.length >= 64 && addressInput.length <= 68) ||
								  (addressInput.length <= 42 && addressInput.length >= 40) ? (
									addressInput.length >= 64 && addressInput.length <= 68 ? (
										<ConnectStarknetWalletModal
											cursor="pointer"
											display="flex"
											justifyContent="center"
											alignItems="center"
											paddingLeft="16px"
											paddingRight="16px"
											borderRightRadius="6px"
											bg="#323FF4"
											width={isSmallerThan1000 ? '200px' : '300px'}
											buttonText="Authenticate"
											height="50px"
										/>
									) : (
										<ConnectWalletL1Modal
											cursor="pointer"
											display="flex"
											justifyContent="center"
											alignItems="center"
											paddingLeft="16px"
											paddingRight="16px"
											width={isSmallerThan1000 ? '200px' : '300px'}
											borderRightRadius="6px"
											bg="#323FF4"
											buttonText="Authenticate"
											height="50px"
										/>
									)
								) : (
									<Box
										cursor="pointer"
										display="flex"
										width={isSmallerThan1000 ? '200px' : '300px'}
										justifyContent="center"
										alignItems="center"
										paddingLeft="16px"
										paddingRight="16px"
										borderRightRadius="6px"
										bg="#323FF4"
										onClick={() => {
											if (addressInput.length !== 0) {
												handleSearch();
											}
										}}
									>
										Authenticate
									</Box>
								)}
							</Box>
						</Box>
					</Box>
					{addressDetails && (
						<Box
							width="100%"
							display="flex"
							justifyContent="center"
							alignItems="center"
							textAlign="center"
							mt="1rem"
							gap={isSmallerThan700 ? '1rem' : '2rem'}
						>
							<Box
								display="flex"
								color="white"
								alignItems="center"
								flexDirection="column"
								padding={isSmallerThan700 ? '16px 32px' : '32px 64px'}
								bg="#120F25"
								border="1px solid #2C2B48"
								borderRadius="6px"
								mt="1rem"
							>
								<Text whiteSpace="nowrap" fontWeight="600" fontSize="18px">
									{numberFormatter(totalClaimableAmount)} HSTK
								</Text>
								<Text whiteSpace="nowrap" color="#676D9A">
									Tokens
								</Text>
							</Box>
							<Box
								display="flex"
								color="white"
								alignItems="center"
								flexDirection="column"
								border="1px solid #2C2B48"
								padding={isSmallerThan700 ? '16px 32px' : '32px 64px'}
								bg="#120F25"
								borderRadius="6px"
								mt="1rem"
							>
								<Text whiteSpace="nowrap" fontWeight="600" fontSize="18px">
									{numberFormatter(currentClaimableAmount)} HSTK
								</Text>
								<Text whiteSpace="nowrap" color="#676D9A">
									Claimable Tokens
								</Text>
							</Box>
						</Box>
					)}
					<Box width="100%" mt="3rem">
						<Box
							ml={isSmallerThan1250 ? '2rem' : '5rem'}
							mt={8}
							color="white"
							borderRadius="lg"
						>
							<Accordion
								border="1px solid #272942"
								borderRadius="6px"
								defaultIndex={[0]}
								allowMultiple
							>
								<AccordionItem>
									<h2>
										<AccordionButton
											padding={isSmallerThan700 ? '16px 22px' : '32px 44px'}
											bg="#0C0C1C"
											_hover={{ bg: '#0C0C1C' }}
										>
											<Box
												as="span"
												flex="1"
												textAlign="left"
												fontSize={isSmallerThan700 ? '20px' : '32px'}
												fontWeight="bold"
											>
												Frequently Asked Questions
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<Accordion border="0px" allowMultiple>
											{faqData.map((faq, index) => (
												<AccordionItem
													padding="1rem 0rem"
													border="0px"
													borderBottom={
														index === faqData.length - 1
															? '0px'
															: '1px solid #272942'
													}
													key={index}
												>
													<h2>
														<AccordionButton>
															<Box
																fontSize="16px"
																as="span"
																flex="1"
																textAlign="left"
																fontWeight="400"
															>
																{faq.question}
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4} color="#676D9A">
														{renderAnswer(faq.answer)}
													</AccordionPanel>
												</AccordionItem>
											))}
										</Accordion>
										<Box mt="0.5rem">
											<Text fontSize={isSmallerThan700 ? '20px' : '32px'}>
												Still Facing any issue
											</Text>
											<Link
												href="https://discord.com/invite/VaThqq8vbS"
												target="blank"
											>
												<Text
													mt="0.5rem"
													fontSize={isSmallerThan700 ? '14px' : '18px'}
													color="#00D395"
													cursor="pointer"
													_hover={{ textDecoration: 'underline' }}
												>
													Reach out to us on Discord! --{'>'}
												</Text>
											</Link>
										</Box>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Box>
					</Box>
					<Box width="100%" mt="5rem">
						<Box ml={isSmallerThan1250 ? '2rem' : '5rem'} gap="0">
							<Box
								display="flex"
								gap="0.4rem"
								fontSize={
									isSmallerThan700
										? '20px'
										: isSmallerThan1250
										? '28px'
										: '40px'
								}
								whiteSpace="nowrap"
							>
								Are you eligible for <Text color="#FFD027">HSTK</Text> tokens ?
							</Box>
						</Box>
						<Box>
							{provisionCategories.map((catgeory: any, index: number) => (
								<Box key={index} ml={isSmallerThan1250 ? '2rem' : '5rem'}>
									<Box
										display="flex"
										gap={isSmallerThan700 ? '2rem' : '3rem'}
										mt={'3rem'}
										flexDirection={isSmallerThan700 ? 'column' : 'row'}
										// alignItems="stretch"
										// alignItems="center"
									>
										<Box
											borderRadius="6px"
											border="1px solid #2C2B48"
											width={
												isSmallerThan700
													? '100%'
													: isSmallerThan1250
													? '300px'
													: '360px'
											}
											height="100%" // Optional: adjust based on your layout needs
											display="flex" // Optional: helps if you want the image centered inside the box
											justifyContent="center" // Optional: centers the image horizontally
											alignItems="center" // Optional: centers the image vertically
										>
											<Image
												src={catgeory.icon}
												alt=""
												style={{
													width: '100%', // Ensures the image takes full width of the Box
													height: '100%', // Ensures the image takes full height of the Box
													objectFit: 'contain', // Keeps the aspect ratio intact while filling the box
												}}
											/>
										</Box>

										<Box display="flex" flexDir="column">
											<Box
												color="#F0F0F5"
												fontSize={isSmallerThan1250 ? '22px' : '32px'}
												fontWeight="800"
												display="flex"
												alignItems="center"
												justifyContent={isSmallerThan700 ? 'space-between' : ''}
											>
												{catgeory.id}
												{addressAuthenticated && isSmallerThan700 && (
													<Button
														bg="none"
														border="1px solid #F0F0F5"
														color="#F0F0F5"
														width="20%"
														height="35px"
														// mt="0.4rem"
														_hover={{
															background: 'white',
															color: 'black',
														}}
														isDisabled={
															catgeory.ticketId === 0
																? catgeory.claimableAmount === 0
																: claimAddress !== ''
																? !userConfirmation
																: catgeory.currentClaimableAmount === 0
														}
														onClick={() => {
															setticketId(catgeory.ticketId);
															setticketIdL2(catgeory.ticketId);
															setcalltransaction(true);
														}}
													>
														Claim
													</Button>
												)}
											</Box>
											<Text
												maxW="700px"
												mt={
													isSmallerThan700
														? '1.5rem'
														: isSmallerThan1250
														? '0.5rem'
														: '1rem'
												}
												fontSize={isSmallerThan1250 ? '14px' : '16px'}
											>
												{catgeory.description}
											</Text>
											{addressDetails && (
												<Box display="flex" gap="1.5rem" mt="1.5rem">
													<Box
														fontSize={
															isSmallerThan700
																? '12px'
																: isSmallerThan1250
																? '14px'
																: '16px'
														}
													>
														<Text>
															{numberFormatter(catgeory.claimableAmount)}
														</Text>
														<Text whiteSpace="nowrap">Tokens</Text>
													</Box>
													<Box
														height="50px"
														borderLeft="2px solid #2C2B48"
														borderRadius="6px"
													></Box>
													<Box
														fontSize={
															isSmallerThan700
																? '12px'
																: isSmallerThan1250
																? '14px'
																: '16px'
														}
													>
														<Text>
															{numberFormatter(catgeory.currentClaimableAmount)}
														</Text>
														<Text whiteSpace="nowrap">Claimable Tokens</Text>
													</Box>
													{/* <Box
                            height="50px"
                            borderLeft="2px solid #2C2B48"
                            borderRadius="6px"
                          ></Box> */}
													{/* <Box
                            fontSize={
                              isSmallerThan700
                                ? "12px"
                                : isSmallerThan1250
                                ? "14px"
                                : "16px"
                            }
                          >
                            <Text ml="0.4rem">
                              {numberFormatterPercentage(catgeory.EmissionRate)}
                              %
                            </Text>
                            <Text ml="0.4rem" whiteSpace="nowrap">
                              Emisiion Rate
                            </Text>
                          </Box> */}
													{!isSmallerThan700 && (
														<Box
															height="50px"
															borderLeft="2px solid #2C2B48"
															borderRadius="6px"
														></Box>
													)}
													{addressAuthenticated && !isSmallerThan700 && (
														<Button
															bg="none"
															border="1px solid #F0F0F5"
															color="#F0F0F5"
															width="20%"
															height="50px"
															// mt="0.4rem"
															_hover={{
																background: 'white',
																color: 'black',
															}}
															isDisabled={
																catgeory.ticketId === 0
																	? catgeory.claimableAmount === 0
																	: claimAddress !== ''
																	? !userConfirmation
																	: catgeory.currentClaimableAmount === 0
															}
															onClick={() => {
																setticketId(catgeory.ticketId);
																setticketIdL2(catgeory.ticketId);
																setcalltransaction(true);
															}}
														>
															Claim
														</Button>
													)}
												</Box>
											)}
										</Box>
									</Box>
									<Box
										height="1px"
										border="1px solid #2C2B48"
										mt="1.5rem"
										width={isSmallerThan700 ? '100%' : '80%'}
									></Box>
								</Box>
							))}
						</Box>
					</Box>
					{/* <Text color="white" mt="3rem" mb="2rem">
          Tokenomics
        </Text>
        <ContributorsChart/> */}
				</Box>
			}
			{!isSmallerThan1250 && <Footer />}
		</Box>
	);
}
