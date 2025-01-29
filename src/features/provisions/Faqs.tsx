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
				className='bg-[#0C0C1C] rounded-lg border overflow-hidden border-[#272942]'>
				<AccordionItem
					value='item-0'
					className='border-none'>
					<AccordionTrigger className='sm:px-4 sm:py-6 px-8 py-11 hover:no-underline hover:bg-[#0C0C1C] font-bold'>
						Frequently Asked Questions
					</AccordionTrigger>
					<AccordionContent className='px-4'>
						<Accordion
							type='multiple'
							className='space-y-4'>
							{faqData.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`faq-${index}`}
									className={`border-0 ${index !== faqData.length - 1 ? 'border-b border-[#272942]' : ''} py-4`}>
									<AccordionTrigger className='hover:no-underline text-base font-normal'>
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
