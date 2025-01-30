import Image from 'next/image';
import numberFormatter from '@/functions/numberFormatter';
import { ProvisionCategory } from '@/types/common.types';
import { cn } from '@/lib/utils';

interface ProvisionCardProps {
	category: ProvisionCategory;
	addressAuthenticated: boolean;
	addressDetails: any;
	claimAddress: string;
	userConfirmation: boolean;
	onClaim: (ticketId: number) => void;
}

export const ProvisionCard = ({
	category,
	addressAuthenticated,
	addressDetails,
	claimAddress,
	userConfirmation,
	onClaim,
}: ProvisionCardProps) => {
	return (
		<>
			<div className='flex flex-col md:flex-row gap-8 lg:gap-12 mt-12'>
				<div className='flex justify-center items-center w-full md:w-[300px] lg:w-[360px] h-full border border-[#2C2B48] rounded-md overflow-hidden'>
					<Image
						src={category.icon}
						alt={category.id}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'contain',
						}}
					/>
				</div>

				<div
					className={cn('flex flex-col justify-center', {
						'md:pb-10': !addressDetails,
					})}>
					<div className='flex items-center justify-between md:justify-start text-[#F0F0F5] text-[18px] lg:text-[26px] font-medium lg:font-semibold'>
						{category.id}
						{addressAuthenticated && (
							<button
								className='md:hidden w-1/5 h-[35px] border border-[#F0F0F5] text-[#F0F0F5] hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={
									category.ticketId === 0 ?
										category.claimableAmount === 0
									: claimAddress !== '' ?
										!userConfirmation
									:	category.currentClaimableAmount === 0
								}
								onClick={() => onClaim(category.ticketId)}>
								Claim
							</button>
						)}
					</div>
					<p className='max-w-[700px] mt-6 md:mt-2 lg:mt-4 text-sm font-light lg:text-base'>
						{category.description}
					</p>
					{addressDetails && (
						<div className='flex gap-6 mt-6'>
							<div className='text-xs md:text-sm lg:text-base'>
								<p>
									{numberFormatter(category.claimableAmount)}
								</p>
								<p className='whitespace-nowrap'>Tokens</p>
							</div>
							<div className='h-[50px] border-l-2 border-[#2C2B48] rounded-md'></div>
							<div className='text-xs md:text-sm lg:text-base'>
								<p>
									{numberFormatter(
										category.currentClaimableAmount
									)}
								</p>
								<p className='whitespace-nowrap'>
									Claimable Tokens
								</p>
							</div>
							{!addressAuthenticated && (
								<>
									<div className='hidden md:block h-[50px] border-l-2 border-[#2C2B48] rounded-md'></div>
									<button
										className='hidden md:block w-1/5 h-[50px] border border-[#F0F0F5] text-[#F0F0F5] hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed'
										disabled={
											category.ticketId === 0 ?
												category.claimableAmount === 0
											: claimAddress !== '' ?
												!userConfirmation
											:	category.currentClaimableAmount ===
												0

										}
										onClick={() =>
											onClaim(category.ticketId)
										}>
										Claim
									</button>
								</>
							)}
						</div>
					)}
				</div>
			</div>
			<div className='h-[1px] bg-[#2C2B48] mt-6 w-full'></div>
		</>
	);
};
