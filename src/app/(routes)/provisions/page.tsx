'use client';
import React, { useEffect, useState } from 'react';

import {
	useAccount as useAccountL1,
	useWaitForTransaction,
	useDisconnect,
} from 'wagmi';
import airdropIcon from '@/assets/airdrop.jpg';
import investorIcon from '@/assets/investor.png';
import othersIcon from '@/assets/others.png';
import ccpIcon from '@/assets/ccp.jpg';
import kolIcon from '@/assets/kols.png';
import {
	useAccount,
	useConnectors,
	useWaitForTransaction as useWaitForTransactionStarknet,
} from '@starknet-react/core';
import { parseAmount, processAddress } from '@/Blockchain/utils/utils';
import { toast } from 'react-toastify';
import useClaimL1 from '@/Blockchain/hooks/useClaimL1';
import useClaimStarknet from '@/Blockchain/hooks/useClaimStarknet';
import {
	getuserbeneficiaryTicketsL1,
	getuserbeneficiaryTicketsL2,
	viewTicket,
	viewTicketL2,
} from '@/Blockchain/scripts/claimProxy';
import { useDrawContext } from '@/context/DrawerContext';
import Hero from '@/features/provisions/Hero';
import FAQs from '@/features/provisions/Faqs';
import { EligibilityChecker } from '@/features/provisions/EligibilityChecker';
import { ProvisionCard } from '@/features/provisions/ProvisionCard';

export const dynamic = 'force-static';
export const runtime = 'nodejs';

export default function Provisions() {
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
		writeClaimL1,
		claimAddressL1,
		setclaimAddressL1,
		ticketId,
		setticketId,
	} = useClaimL1();

	const {
		setclaimAddressL2,
		ticketIdL2,
		setticketIdL2,
		dataClaimL2,
		writeAsyncClaimL2,
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
				(data: any, index: number) =>
					data.ticketType === category.ticketType
			);

			if (matchingData) {
				return {
					...category,
					ticketId: matchingData.ticketId,
					claimableAmount: parseAmount(
						matchingData.amount.toString()
					),
					currentClaimableAmount: parseAmount(
						matchingData.balance.toString()
					),
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
					claimableAmount: parseAmount(
						matchingData.amount.toString()
					),
					currentClaimableAmount: parseAmount(
						matchingData.balance.toString()
					),
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
				currentClaimbale +=
					provisionCategories[i].currentClaimableAmount;
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
					if (
						processAddress(address) === processAddress(addressInput)
					) {
						setaddressAuthenticated(true);
					} else {
						if (loading) {
							if (!toastPopupConfimred) {
								toast.error(
									'Please sign in with the correct wallet address',
									{
										position: 'bottom-right',
									}
								);
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
								toast.error(
									'Please sign in with the correct wallet address',
									{
										position: 'bottom-right',
									}
								);
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
		<>
			{
				<div
					className='relative flex flex-col min-h-screen pt-24 pb-28 text-white z-10 bg-fixed'
					style={{
						background: `radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.2), transparent), radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.2), transparent), black`,
						backgroundAttachment: 'fixed',
					}}>
					<Hero />
					<EligibilityChecker
						addressInput={addressInput}
						setaddressInput={setaddressInput}
						handleSearch={handleSearch}
						addressDetails={addressDetails}
						addressAuthenticated={addressAuthenticated}
						setaddressDetails={setaddressDetails}
						setaddressSearched={setaddressSearched}
						setaddressAuthenticated={setaddressAuthenticated}
						currentClaimableAmount={currentClaimableAmount}
						totalClaimableAmount={totalClaimableAmount}
					/>
					<FAQs />
					<div className='w-full mt-20 px-4 lg:px-20'>
						<div className='flex gap-1.5 text-xl md:text-3xl lg:text-4xl whitespace-nowrap'>
							Are you eligible for{' '}
							<span className='text-[#FFD027]'>HSTK</span> tokens
							?
						</div>

						<div>
							{provisionCategories.map((category, index) => (
								<ProvisionCard
									key={index}
									category={category}
									addressAuthenticated={addressAuthenticated}
									addressDetails={addressDetails}
									claimAddress={claimAddress}
									userConfirmation={userConfirmation}
									onClaim={(ticketId) => {
										setticketId(ticketId);
										setticketIdL2(ticketId);
										setcalltransaction(true);
									}}
								/>
							))}
						</div>
					</div>
				</div>
			}
		</>
	);
}
