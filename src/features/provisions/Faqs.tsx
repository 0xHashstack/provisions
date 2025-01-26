import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from '@chakra-ui/react';
import Link from 'next/link';

const faqData = [
	{
		question: 'Why do I see zero claimable tokens?',
		answer:
			'Check if you meet the eligibility criteria under Airdrop, CCP, or Early Investors at https://token.hashstack.finance/tokenomics.',
	},
	{
		question: 'My wallet address is missing in the JSON provision file!',
		answer:
			'Ensure you’re searching without leading zeros and verify if you qualify under the defined eligibility categories.',
	},
	{
		question: 'I participated in campaigns but don’t see my allocations. Why?',
		answer:
			'Double-check the eligibility criteria (e.g., number of CCP posts or transaction thresholds) on the https://token.hashstack.finance/tokenomics page.',
	},
	{
		question: 'Why does my leaderboard rank not match token allocations?',
		answer:
			'Token allocations depend on contribution quality, not just leaderboard rank; refer to the CCP guidelines for more details.',
	},
	{
		question: 'Where can I trade HSTK tokens now?',
		answer:
			'HSTK is live on Uniswap and Ekubo. You can trade or swap your tokens their',
	},
	{
		question: 'Can we get a token chart or swap link?',
		answer:
			'Charts and swap links will be updated in announcements shortly; keep an eye on official channels.',
	},
	{
		question: 'What are the staking benefits for HSTK?',
		answer:
			' HSTK offers utility for governance, transaction fees, and unlocking features; specific staking benefits will be revealed in future updates.',
	},
	{
		question: 'Will HSTK be listed on centralized exchanges?',
		answer:
			'Listings on centralized exchanges are being explored; stay tuned for official announcements.',
	},
	{
		question: 'I’m new. How do I get started with Hashstack?',
		answer:
			'Visit https://hashstack.finance for documentation and walkthrough videos to help you get started',
	},
];
const FAQs = () => {
	const renderAnswer = (text: string) => {
		const parts = text.split(/(https?:\/\/[^\s]+)/g); // Split text into parts by URLs
		return parts.map((part, index) => {
			if (part.match(/https?:\/\/[^\s]+/)) {
				return (
					<a
						key={index}
						href={part}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#676D9A', textDecoration: 'underline' }} // Optional: Styling for the link
					>
						{part}
					</a>
				);
			}
			return <span key={index}>{part}</span>;
		});
	};

	return (
		<div className="w-full mt-12">
			<div className="ml-8 lg:ml-20 bg-white rounded-lg">
				<Accordion
					border="1px solid #272942"
					borderRadius="6px"
					defaultIndex={[0]}
					allowMultiple
				>
					<AccordionItem>
						<h2>
							<AccordionButton
								className="sm:px-4 sm:py-6 px-8 py-11"
								bg="#0C0C1C"
								_hover={{ bg: '#0C0C1C' }}
							>
								<Box as="span" flex="1" textAlign="left" fontWeight="bold">
									Frequently Asked Questions
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Accordion border="0px" allowMultiple>
								{faqData.map((faq, index) => (
									<AccordionItem
										padding="1rem 0rem"
										border="0px"
										borderBottom={
											index === faqData.length - 1 ? '0px' : '1px solid #272942'
										}
										key={index}
									>
										<h2>
											<AccordionButton>
												<Box
													fontSize="16px"
													as="span"
													flex="1"
													textAlign="left"
													fontWeight="400"
												>
													{faq.question}
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4} color="#676D9A">
											{renderAnswer(faq.answer)}
										</AccordionPanel>
									</AccordionItem>
								))}
							</Accordion>
							<Box mt="0.5rem">
								Still Facing any issue
								<Link
									href="https://discord.com/invite/VaThqq8vbS"
									target="blank"
								>
									Reach out to us on Discord! --{'>'}
								</Link>
							</Box>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default FAQs;
