import WhitetickIcon from '@/assets/whitetickIcon';
import ConnectWalletL1Modal from '@/components/modals/ConnectWalletL1Modal';
import ConnectStarknetWalletModal from '@/components/modals/ConnectWalletModal';
import numberFormatter from '@/functions/numberFormatter';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import React, { useState } from 'react';

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
}) => {
	const [showModal, setshowModal] = useState(false);
	const isL1 = addressInput.length <= 42 && addressInput.length >= 40;
	const isL2 = addressInput.length >= 64 && addressInput.length <= 68;
	const isValidInput = isL1 || isL2;
	const isL1ModalOpen = isL1 && showModal;
	const isL2ModalOpen = isL2 && showModal;

	return (
		<>
			{isL1ModalOpen && (
				<ConnectWalletL1Modal
					open={isL1ModalOpen}
					onOpenChange={setshowModal}
				/>
			)}
			{isL2ModalOpen && (
				<ConnectStarknetWalletModal
					open={isL2ModalOpen}
					onOpenChange={setshowModal}
				/>
			)}
			<div className='flex w-full mb-0 mt-12'>
				<div className='flex flex-col w-full justify-center items-center'>
					<h2 className='text-[20px] font-bold lg:text-[32px]'>
						Check Your Eligibility
					</h2>
					<div className='flex mt-6 bg-transparent px-4 md:px-0'>
						<div className='relative w-[60%] mt-0  lg:ml-0 md:w-[600px]'>
							<Input
								className='h-[50px] pl-4 text-black text-base border border-[rgba(103,109,154,0.30)] rounded-l-md  rounded-r-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 '
								placeholder='Enter your address'
								value={addressInput}
								onChange={(e) => {
									setaddressDetails(null);
									setaddressSearched(false);
									setaddressAuthenticated(false);
									setaddressInput(e.target.value);
								}}
							/>
						</div>
						{addressAuthenticated ?
							addressDetails ?
								<div className='flex justify-center items-center px-4 rounded-r-md bg-[#323FF4] w-[200px] h-[50px] lg:w-[300px] select-none'>
									<WhitetickIcon />
									<span className='ml-1.5'>
										Authenticated
									</span>
								</div>
							:	<div className='flex justify-center items-center px-4 rounded-r-md bg-[#323FF4] w-[200px] h-[50px] gap-1.5 lg:w-[300px]'>
									<Spinner
										className='text-white'
										size='sm'
									/>
									<span className='ml-1'>Verifying</span>
								</div>

						:	<div
								className='flex justify-center items-center px-4 rounded-r-md bg-[#323FF4] w-[200px] h-[50px] cursor-pointer lg:w-[300px]'
								onClick={() => {
									if (addressInput.length !== 0) {
										setshowModal(true);
									}
								}}>
								Authenticate
							</div>
						}
					</div>
				</div>
			</div>
			{addressDetails && (
				<div className='w-full flex justify-center items-center text-center mt-4 gap-4 lg:gap-8'>
					<div className='flex text-white items-center flex-col p-[32px_16px] mt-4 bg-[#120F25] border border-[#2C2B48] rounded-md lg:p-[64px]'>
						<span className='whitespace-nowrap font-semibold text-lg'>
							{numberFormatter(totalClaimableAmount)} HSTK
						</span>
						<span className='whitespace-nowrap text-[#676D9A]'>
							Tokens
						</span>
					</div>
					<div className='flex text-white items-center flex-col p-[32px_16px] mt-4 bg-[#120F25] border border-[#2C2B48] rounded-md lg:p-[64px]'>
						<span className='whitespace-nowrap font-semibold text-lg'>
							{numberFormatter(currentClaimableAmount)} HSTK
						</span>
						<span className='whitespace-nowrap text-[#676D9A]'>
							Claimable Tokens
						</span>
					</div>
				</div>
			)}
		</>
	);
};
