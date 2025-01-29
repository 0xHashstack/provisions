import HstkLogo from '@/assets/HstkLogo';
import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div
			className='flex flex-col min-h-screen'
			style={{
				background: `radial-gradient(circle 600px at 50% 10%, rgba(83, 49, 234, 0.2), transparent), radial-gradient(circle 1200px at bottom right, rgba(83, 49, 234, 0.2), transparent), black`,
				backgroundAttachment: 'fixed',
			}}>
			<Navbar />
			<div className='flex-1 w-full flex items-center justify-center p-4'>
				<div className='bg-[rgba(12,12,28,0.5)] backdrop-blur-md rounded-lg border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.17)] p-8 max-w-md w-full text-center flex flex-col items-center gap-4'>
					<div className='mb-4'>
						<HstkLogo />
					</div>
					<h2 className='text-xl mb-2'>Page Not Found</h2>
					<p className='text-[#676D9A] mb-4'>
						The page you&apos;re looking for doesn&apos;t exist or
						has been moved.
					</p>
					<Link
						href='/provisions'
						className='inline-block px-6 py-3 bg-[rgba(103,109,154,0.10)] hover:bg-[rgba(103,109,154,0.15)] transition-colors rounded-lg border border-white/10'>
						Go to Provisions
					</Link>
				</div>
			</div>
		</div>
	);
}
