import HashTokenIconFloater from '@/assets/hashTokenIconFloater';
import HstkLogo from '@/assets/HstkLogo';
import VideoLogo from '@/assets/videoLogo';

const Hero = () => {
	return (
		<div className='relative isolate'>
			{/* HashToken Icons */}
			<div className='absolute transform rotate-[120deg] top-[14%] sm:top-[20%] left-[7%] sm:left-[9%] z-[-1]'>
				<HashTokenIconFloater />
			</div>
			<div className='absolute top-[14%] sm:top-[20%] right-[7%] sm:right-[9%] z-[-1]'>
				<HashTokenIconFloater />
			</div>
			{/* Dots */}
			<div className='absolute left-[18%] w-[14px] h-[14px] bg-[#9780FF] rounded-full top-[40%] sm:top-[60%] z-[-1]' />
			<div className='absolute right-[18%] w-[14px] h-[14px] bg-[#9780FF] rounded-full top-[40%] sm:top-[60%] z-[-1]' />
			<div className='w-full'>
				<div className='flex w-full justify-center'>
					<div className='flex flex-col items-center gap-8 sm:gap-6 px-4 md:px-0'>
						<div className='rounded-full border-[10px] border-[#3B39C9]'>
							<HstkLogo />
						</div>
						<p className='text-4xl sm:text-5xl  font-bold'>HSTK</p>
						<p className='text-[28px] sm:text-[44px]  font-light text-center'>
							Hashstack Provisions
						</p>

						<p className='max-w-[900px] text-sm text-center text-balance leading-5 font-light text-[#F0F0F0] '>
							Hashstack team is excited to introduce the HSTK
							provisions. Over the 4 past years of our existence,
							we have been fortunate to have worked with the
							members of various groups in the form of product
							users, investors, community contributors who have
							helped advance Hashstack. Throughout this journey,
							we have incentivised your participation through
							points, token allocation etc. Provisions page is
							where you claim them, the HSTK tokens.
						</p>
					</div>
				</div>

				<div className='flex w-full justify-center items-center mt-12 gap-2 cursor-pointer'>
					<a
						href='https://app.supademo.com/demo/cm4ts6m8j0qfh6gs8dm50znl7'
						target='_blank'
						className='flex items-center gap-2'>
						<VideoLogo />
						<span className='text-success'>
							<p className='border-b-2 border-transparent border-dotted hover:border-[#00D395] cursor-pointer'>
								Quick guide to HSTK provisions
							</p>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
