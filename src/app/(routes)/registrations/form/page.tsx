'use client';

import DetailsForm from '@/components/Form/DetailsForm';

export const dynamic = 'force-static';
export const runtime = 'nodejs';
import styles from './form.module.scss';
import { cn } from '@/lib/utils';

export default function Form() {
	return (
		<div>
			<div
				className={cn(
					'flex min-h-screen pb-4 sm:pb-12 flex-col  px-8 pt-32 text-white xl:pb-28 xl:px-24 2xl:px-32',
					styles['form-con']
				)}>
				<div className='mb-16 flex w-[15%] flex-row justify-start'>
					<div className='border-b-2 border-[#4D59E8] p-2'>
						Contributors Round
					</div>
				</div>

				<div className='flex w-full justify-between items-start'>
					<DetailsForm />
				</div>
			</div>
		</div>
	);
}
