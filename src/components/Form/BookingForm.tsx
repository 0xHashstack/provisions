'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import InfoIcon from '@/assets/infoIcon';
import BlueInfoIcon from '@/assets/blueinfoIcon';
import TickCompleteIcon from '@/assets/tickIcon';
import Link from 'next/link';

interface BookingFormProps {
	wallet: string;
	starknetWallet: string;
	discord: string;
	Twitter: string;
	BookAmt: number;
	checked: boolean;
	FundName: any;
	investorcommit: number;
	DecisionTime: number;
	url: string;
	tokenName: string;
	callData: any;
	txStatus: boolean;
	prebookSucceeded: boolean;
	txLoading: boolean;
	approveLoading: boolean;
	txloading: boolean;
	formSubmitted: boolean;
	usdtBalance: any;
	usdcBalance: any;
	handleDiscordChange: (e: any) => void;
	handleTwitterChange: (e: any) => void;
	handleBookAmtCHnage: (e: any) => void;
	setChecked: (checked: boolean) => void;
	handleFundNameChange: (e: any) => void;
	handleInvestorCommitChange: (e: any) => void;
	handleDecisionTimeChange: (e: any) => void;
	handleUrlChange: (e: any) => void;
	handleSubmit: () => void;
	handleInvestorSubmit: () => void;
	setFormSubmitted: (submitted: boolean) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
	wallet,
	starknetWallet,
	discord,
	Twitter,
	BookAmt,
	checked,
	FundName,
	investorcommit,
	DecisionTime,
	url,
	tokenName,
	callData,
	txStatus,
	prebookSucceeded,
	txLoading,
	approveLoading,
	txloading,
	formSubmitted,
	usdtBalance,
	usdcBalance,
	handleDiscordChange,
	handleTwitterChange,
	handleBookAmtCHnage,
	setChecked,
	handleFundNameChange,
	handleInvestorCommitChange,
	handleDecisionTimeChange,
	handleUrlChange,
	handleSubmit,
	handleInvestorSubmit,
	setFormSubmitted,
}) => {
	const InputWrapper = ({ label, children, tooltip }: any) => (
		<div className='w-4/5 flex flex-col gap-2 mt-0'>
			<div className='flex items-center gap-1'>
				<span className='text-[#676D9A] font-inter text-xs font-normal leading-3 tracking-[-0.15px]'>
					{label}
				</span>
				{tooltip && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='cursor-pointer -mt-0.5'>
									<InfoIcon />
								</div>
							</TooltipTrigger>
							<TooltipContent className='bg-[#02010F] text-[#F0F0F5] text-sm font-normal p-2 border border-[#23233D] rounded-lg max-w-[200px]'>
								{tooltip}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
			{children}
		</div>
	);

	const InputField = ({
		value,
		onChange,
		placeholder,
		type = 'text',
		disabled = false,
		error = false,
	}: any) => (
		<div
			className={`w-full rounded-md flex justify-between ${error ? 'border border-[#CF222E]' : 'border border-[rgba(103,109,154,0.30)]'} bg-[rgba(103,109,154,0.04)]`}>
			<Input
				className='text-white border-0 bg-transparent placeholder:text-[rgba(240,240,245,0.50)] placeholder:font-inter placeholder:text-sm focus-visible:ring-0 focus-visible:ring-offset-0'
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
			/>
		</div>
	);

	if (!prebookSucceeded && !txStatus) {
		return (
			<div className='flex flex-1 flex-col justify-between items-start gap-4'>
				<InputWrapper label='Polygon Wallet Address'>
					<InputField
						value={wallet}
						disabled={true}
					/>
				</InputWrapper>

				<InputWrapper label='Starknet Wallet Address'>
					<InputField
						value={starknetWallet}
						disabled={true}
						placeholder='optional'
					/>
				</InputWrapper>

				<InputWrapper label='Discord'>
					<InputField
						value={discord}
						onChange={handleDiscordChange}
						placeholder='Aprillyto#7879'
					/>
				</InputWrapper>

				<InputWrapper label='Twitter handle'>
					<InputField
						value={Twitter}
						onChange={handleTwitterChange}
						placeholder='@Example'
					/>
				</InputWrapper>

				<InputWrapper
					label='Booking Amount'
					tooltip="The upfront payment required from potential buyers to secure their spot on the 'interested buyers list' for the tokens.">
					<InputField
						value={BookAmt === 0 ? '' : BookAmt}
						onChange={handleBookAmtCHnage}
						placeholder='250+'
						type='number'
						error={BookAmt < 250 && BookAmt !== 0}
						disabled={
							Number(usdtBalance?.data?.formatted) < 250 &&
							Number(usdcBalance?.data?.formatted) < 250
						}
					/>
				</InputWrapper>

				<div className='mt-12 mb-8'>
					<Checkbox
						id='investor-network'
						checked={checked}
						onCheckedChange={(checked: boolean) =>
							setChecked(checked)
						}
						className='text-[#B1B0B5] font-inter text-base font-normal leading-[26px] tracking-[-0.15px]'
					/>
					<label
						htmlFor='investor-network'
						className='ml-2 text-[#B1B0B5]'>
						I have access to an investor network interested in
						making an investment.
					</label>
				</div>

				{checked && (
					<div className='w-full flex flex-col gap-4'>
						<InputWrapper
							label='Fund Name'
							tooltip='Name of the investment group.'>
							<InputField
								value={FundName}
								onChange={handleFundNameChange}
							/>
						</InputWrapper>

						<InputWrapper
							label='Commitment Interest'
							tooltip='Amount of money that buyers are willing to pay in advance to secure their allocation of tokens during the pre-sale.'>
							<InputField
								value={
									investorcommit === 0 ? '' : investorcommit
								}
								onChange={handleInvestorCommitChange}
								placeholder='$50'
								type='number'
							/>
						</InputWrapper>

						<InputWrapper
							label='Time to Decision'
							tooltip='The time required for potential buyers to coordinate and purchase pre-sale tokens in bulk.'>
							<InputField
								value={DecisionTime === 0 ? '' : DecisionTime}
								onChange={handleDecisionTimeChange}
								placeholder='In Days'
								type='number'
							/>
						</InputWrapper>

						<InputWrapper
							label='Website'
							tooltip='Website of the investment fund'>
							<InputField
								value={url}
								onChange={handleUrlChange}
								placeholder='https://example.com/'
							/>
						</InputWrapper>
					</div>
				)}

				<div className='w-4/5 h-16 flex items-center mb-4'>
					<div className='flex bg-[#222766] text-[#F0F0F5] text-xs p-4 border border-[#3841AA] rounded-md'>
						<div className='pr-3 mt-0.5 cursor-pointer'>
							<BlueInfoIcon />
						</div>
						Contributor&apos;s round is closed. This form will be
						re-opened bey very soon, for pre-sale bookings.
					</div>
				</div>

				<Button
					className='mt-8 w-4/5 h-10 rounded-md border border-[rgba(103,109,154,0.30)] bg-[#4D59E8] text-white hover:bg-white hover:text-black shadow-sm'
					disabled={true}
					onClick={() => {
						if (checked) {
							if (!formSubmitted) {
								handleInvestorSubmit();
							}
							setFormSubmitted(true);
						} else {
							if (!formSubmitted) {
								handleSubmit();
							}
							setFormSubmitted(true);
						}
					}}>
					Submit
				</Button>
			</div>
		);
	}

	return (
		<div className='flex-1  flex justify-center items-center'>
			<div className='flex flex-col justify-center items-center'>
				<div className='my-2'>
					<TickCompleteIcon />
				</div>

				<h2 className='text-white text-center font-inter text-xl font-bold leading-[30px] tracking-[-0.15px]'>
					You have successfully submitted your form!
				</h2>

				{txStatus && (
					<div className='w-[606px] mt-6 mb-8 rounded-lg border border-[rgba(103,109,154,0.30)] overflow-x-hidden'>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell className='text-[#AAA] text-center font-inter text-sm font-semibold leading-[30px] tracking-[-0.15px] border border-[rgba(103,109,154,0.30)] p-7'>
										Wallet Address
									</TableCell>
									<TableCell className='text-white text-center font-inter text-sm font-semibold leading-[30px] tracking-[-0.15px] border border-[rgba(103,109,154,0.30)] p-7'>
										{wallet}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className='text-[#AAA] text-center font-inter text-sm font-semibold leading-[30px] tracking-[-0.15px] border border-[rgba(103,109,154,0.30)] p-7'>
										Transaction Id
									</TableCell>
									<TableCell className='text-white text-center font-inter text-sm font-semibold leading-[30px] tracking-[-0.15px] border border-[rgba(103,109,154,0.30)] p-7 underline'>
										<Link
											href={`https://${process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ? 'polygonscan.com' : 'mumbai.polygonscan.com'}/tx/${callData?.hash}`}>
											{callData?.hash.slice(
												0,
												callData?.hash.toString()
													.length / 2
											)}
											<br />
											{callData?.hash.slice(
												callData?.hash.toString()
													.length / 2
											)}
										</Link>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className='text-[#AAA] text-center font-inter text-sm font-semibold leading-[30px] tracking-[-0.15px] border border-[rgba(103,109,154,0.30)] p-7'>
										Booking amount
									</TableCell>
									<TableCell className='text-white text-center font-inter text-sm font-semibold leading-[30px] tracking-[-0.15px] border border-[rgba(103,109,154,0.30)] p-7'>
										{BookAmt} {tokenName}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</div>
	);
};

export default BookingForm;
