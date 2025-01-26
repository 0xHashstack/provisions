import HashTokenIconFloater from '@/assets/hashTokenIconFloater';
import HstkLogo from '@/assets/HstkLogo';
import VideoLogo from '@/assets/videoLogo';
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
			<div className="w-full">
				<div className="flex w-full justify-center">
					<div className="flex flex-col items-center">
						<div className="rounded-full border-10 border-[#3B39C9]">
							<HstkLogo />
						</div>
						<p className="text-3xl sm:text-5xl mt-4 font-bold">HSTK</p>
					</div>
				</div>
				<div className="flex w-full justify-center">
					<p className="text-2xl sm:text-3xl mt-4">Hashstack Provisions</p>
				</div>
				<div className="w-full flex justify-center">
					<p className="max-w-[900px] mt-8 text-sm text-left sm:text-base lg:text-lg leading-6 font-light text-[#F0F0F0] ml-8 sm:ml-0">
						Hashstack team is excited to introduce the HSTK provisions. Over the
						4 past years of our existence, we have been fortunate to have worked
						with the members of various groups in the form of product users,
						investors, community contributors who have helped advance Hashstack.
						Throughout this journey, we have incentivised your participation
						through points, token allocation etc. Provisions page is where you
						claim them, the HSTK tokens.
					</p>
				</div>
				<div className="flex w-full justify-center items-center mt-12 gap-2 cursor-pointer">
					<VideoLogo />
					<a
						href="https://app.supademo.com/demo/cm4ts6m8j0qfh6gs8dm50znl7"
						target="_blank"
					>
						<p className="text-[#00D395] border-b-2 border-transparent hover:border-[#00D395] cursor-pointer">
							Quick guide to HSTK provisions
						</p>
					</a>
				</div>
			</div>
		</>
	);
};

export default Hero;
