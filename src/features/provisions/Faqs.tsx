import Link from 'next/link';
import { faqData } from '@/constants/faq';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const renderAnswer = (text: string) => {
	const parts = text.split(/(https?:\/\/[^\s]+)/g);
	return parts.map((part, index) => {
		if (part.match(/https?:\/\/[^\s]+/)) {
			return (
				<a
					key={index}
					href={part}
					target='_blank'
					rel='noopener noreferrer'
					className='text-[#676D9A] underline'>
					{part}
				</a>
			);
		}
		return <span key={index}>{part}</span>;
	});
};

const FAQs = () => {
	return (
		<div className='w-full mt-12 px-4 lg:px-20'>
			<Accordion
				type='single'
				collapsible
				className='bg-[rgba(12,12,28,0.5)] backdrop-blur-md rounded-lg border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.17)]'>
				<AccordionItem
					value='item-0'
					className='border-none'>
					<AccordionTrigger className='px-4 py-6  hover:no-underline  transition-colors font-bold'>
						Frequently Asked Questions
					</AccordionTrigger>
					<AccordionContent className='px-4'>
						<Accordion
							type='multiple'
							className='space-y-2'>
							{faqData.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`faq-${index}`}
									className={`border-0 ${index !== faqData.length - 1 ? 'border-b border-white/10' : ''} sm:py-2`}>
									<AccordionTrigger className='hover:no-underline  transition-colors text-base font-normal rounded'>
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className='text-[#676D9A]'>
										{renderAnswer(faq.answer)}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
						<div className='mt-4 text-[#676D9A]'>
							Still Facing any issue{' '}
							<Link
								href='https://discord.com/invite/VaThqq8vbS'
								target='blank'
								className='text-[#676D9A] hover:text-[#7f85b5]'>
								Reach out to us on Discord! --{'>'}
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default FAQs;
