import { RootContextProvider } from '@/context/RootContext';
import '@/styles/globals.scss';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Hashstack | Under-collateralised loans | Defi',
	description:
		'Hashstack provides a permissionless zk-native money market protocol enabling secure under-collateralised loans to the crypto retail. Built on Starknet L2 [announcement], Hashstack leverages the capability of zero-knowledge proofs to provide a cost & capital-efficient lending solution.',
	verification: {
		google: '9U0-YnKdWueBdZmj8Y5_JEkGNPOiV-_d8cPrmjIgifs',
	},
	other: {
		'Cache-Control': 'no-cache, must-revalidate',
		Pragma: 'no-cache',
		Expires: '0',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`${inter.className} ${inter.variable}`}>
			<body>
				<RootContextProvider>{children}</RootContextProvider>
			</body>
		</html>
	);
}
