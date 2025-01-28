import EkuboIcon from '@/assets/ekuboIcon';
import LeadingLogo from '@/assets/leadingLogo';
import UniswapLogo from '@/assets/uniswapLogo';
import { hstkPrice } from '@/Blockchain/scripts/claimProxy';
import { parseAmount } from '@/Blockchain/utils/utils';
import { Button } from '@/components/ui/button';
import numberFormatter from '@/functions/numberFormatter';
import { BigNumber } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Market = () => {
	const router = useRouter();
	const [tokenPrice, settokenPrice] = useState<number>();
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
			console.error(error, 'err while fetching price');
		}
	}, []);
	return (
		<div className='mt-8 flex flex-col sm:flex-row gap-8 w-full'>
			{/* Uniswap & Ekubo Section */}
			<div className='flex flex-col sm:w-2/5 gap-6'>
				<Link
					href='https://app.uniswap.org/swap?chain=mainnet&inputCurrency=0xf38774a034f5f533d7f9e2ba6b7f3a7542714fa9&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7'
					target='_blank'
					className='w-full'>
					<div className='border border-gray-800 rounded-md p-4 flex justify-between items-center cursor-pointer'>
						<div className='flex items-center gap-2'>
							<UniswapLogo />
							<p className='text-base sm:text-lg font-semibold'>
								Uniswap
							</p>
						</div>
						<div className='ml-2'>
							<LeadingLogo />
						</div>
					</div>
				</Link>
				<Link
					href='https://app.ekubo.org/?inputCurrency=HSTK&amount=1&outputCurrency=USDT'
					target='_blank'
					className='w-full'>
					<div className='border border-gray-800 rounded-md p-4 flex justify-between items-center cursor-pointer'>
						<div className='flex items-center gap-2'>
							<EkuboIcon />
							<p className='text-base sm:text-lg font-semibold'>
								Ekubo
							</p>
						</div>
						<div className='ml-2'>
							<LeadingLogo />
						</div>
					</div>
				</Link>
			</div>
			<div className='border border-gray-800 rounded-md p-7 flex flex-col gap-6 sm:w-3/5'>
				<div className='flex justify-between w-full'>
					<p className='text-sm sm:text-base max-w-[70%] sm:max-w-[80%]'>
						Check out our liquidity pools on Uniswap and Ekubo,
						start earning!
					</p>
					<Button
						variant={'link'}
						className='p-0 h-fit'
						onClick={() => router.push('/provisions')}>
						Earn
					</Button>
				</div>
				<div className='flex gap-4 w-full mt-6'>
					<div className='rounded-md flex flex-col gap-1 w-1/2'>
						<p className='font-semibold'>HSTK Price</p>
						{tokenPrice ?
							<p className='text-gray-500'>
								{numberFormatter(tokenPrice)}
							</p>
						:	<div className='bg-gray-700 h-3 w-12 rounded-md'></div>
						}
					</div>
					<div className='rounded-md flex flex-col gap-1 w-1/2'>
						<p className='font-semibold'>24H Trading Volume</p>
						<p className='text-gray-500'>NA</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Market;
