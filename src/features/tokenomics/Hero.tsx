import Charts from './Charts';
import Instructions from './Instructions';

const Hero = () => {
	return (
		<div className='flex flex-col md:flex-row items-center w-full justify-center mb-8 gap-[4%] sm:gap-[14%]'>
			<Instructions />
			<Charts />
		</div>
	);
};

export default Hero;
