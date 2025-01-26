import HashTokenIconFloater from '@/assets/hashTokenIconFloater';
import { cn } from '@/utils/cn';

const Hero = ({ addressAuthenticated }: { addressAuthenticated: boolean }) => {
	return (
		<>
			{/* HashToken Icons */}
			<div
				className={cn(
					'absolute transform rotate-[120deg]',
					addressAuthenticated
						? 'top-[5%] sm:top-[3%]'
						: 'top-[7%] sm:top-[5%]',
					'left-[7%] sm:left-[4%]'
				)}
			>
				<HashTokenIconFloater />
			</div>
			<div
				className={cn(
					'absolute',
					addressAuthenticated
						? 'top-[5%] sm:top-[3%]'
						: 'top-[7%] sm:top-[5%]',
					'right-[7%] sm:right-[5%]'
				)}
			>
				<HashTokenIconFloater />
			</div>
			{/* Dots */}
			<div
				className={cn(
					'absolute left-[18%] w-[14px] h-[14px] bg-[#9780FF] rounded-full',
					addressAuthenticated
						? 'top-[11%] sm:top-[7%]'
						: 'top-[13%] sm:top-[9%]'
				)}
			></div>
			<div
				className={cn(
					'absolute right-[18%] w-[14px] h-[14px] bg-[#9780FF] rounded-full',
					addressAuthenticated
						? 'top-[11%] sm:top-[7%]'
						: 'top-[13%] sm:top-[9%]'
				)}
			/>
			{/* <div width="100%">
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
							isSmallerThan700 ? '12px' : isSmallerThan1250 ? '14px' : '16px'
						}
						lineHeight="20px"
						textAlign="left"
						color="#F0F0F0"
						ml={isSmallerThan1000 ? '2rem' : '0'}
					>
						Hashstack team is excited to introduce the HSTK provisions. Over the
						4 past years of our existence, we have been fortunate to have worked
						with the members of various groups in the form of product users,
						investors, community contributors who have helped advance Hashstack.
						Through out this journey, we have incentivised your participation
						through points, token allocation etc. Provisions page is where you
						claim them, the HSTK tokens.
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
			</div> */}
		</>
	);
};

export default Hero;
