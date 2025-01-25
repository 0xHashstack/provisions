import DiscordLogo from '@/assets/discordLogo';
import HashstackLogo from '@/assets/hashstacklogo';
import {
	HStack,
	Text,
	Box,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	useDisclosure,
	DrawerCloseButton,
	useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';

const Navbar = () => {
	const [addressFetched, setaddressFetched] = useState(false);
	const { address } = useAccount();
	const [isLessThan1210] = useMediaQuery('(max-width: 1210px)');
	const [isLessThan700] = useMediaQuery('(max-width: 700px)');
	const router = useRouter();
	const pathname = usePathname();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleClick = (newSize: any) => {
		// setSize(newSize);
		// toggleDrawer();
		onOpen();
	};
	// co
	return (
		<HStack
			padding="10px"
			width="100vw"
			display="flex"
			background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
			boxShadow="rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px"
			justifyContent="space-between"
			alignItems="center"
			color="#fff"
			height="3.8125rem"
		>
			<Box display="flex" gap="2rem">
				<Box
					ml="1rem"
					cursor="pointer"
					onClick={() => {
						router.push('/provisions');
					}}
				>
					<HashstackLogo />
				</Box>
				{!isLessThan1210 && (
					<Box
						display="flex"
						gap="1rem"
						justifyContent="center"
						alignItems="center"
					>
						<Box
							cursor="pointer"
							onClick={() => {
								router.push('/provisions');
							}}
						>
							<Text color={pathname === '/provisions' ? '#4D59E8' : '#676D9A'}>
								Provisions
							</Text>
						</Box>
						<Box
							cursor="pointer"
							onClick={() => {
								router.push('/tokenomics');
							}}
						>
							<Text color={pathname === '/tokenomics' ? '#4D59E8' : '#676D9A'}>
								Tokenomics
							</Text>
						</Box>
						<Box>
							<Link href="https://app.hashstack.finance" target="blank">
								<Text color={'#676D9A'}>Go to App</Text>
							</Link>
						</Box>
					</Box>
				)}
			</Box>
			{isLessThan1210 && (
				<Box
					border="2px solid #2C2B48"
					padding="2px"
					borderRadius="6px"
					onClick={() => handleClick('sm')}
				>
					<Image
						src="/hamburgerIcon.svg"
						alt="picture of author"
						width={isLessThan700 ? 30 : 40}
						height={isLessThan700 ? 30 : 40}
					/>
				</Box>
			)}
			{!isLessThan1210 && (
				<HStack color="white" mr="1rem">
					<Box color="#676D9A">Need help? Talk to us:</Box>
					<Link href="https://discord.com/invite/VaThqq8vbS" target="blank">
						<Box
							display="flex"
							alignItems="center"
							gap="0.3rem"
							cursor="pointer"
						>
							<DiscordLogo />
							<Text color="#676D9A">Discord</Text>
						</Box>
					</Link>
				</HStack>
			)}
			<Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
				<DrawerOverlay />
				<DrawerContent zIndex={500}>
					{/* <DrawerCloseButton width="50%"  /> */}
					<DrawerBody padding="0">
						<Box
							display="flex"
							bg="#000"
							alignItems="center"
							height="100vh"
							flexDirection="column"
						>
							<Box
								display="flex"
								flexDirection="row"
								cursor="pointer"
								mt="2rem"
							>
								{/* {isLessThan500 ? <HashstackLogoMobile /> : <HashstackLogo />} */}
							</Box>
							<Text
								color={pathname === '/provisions' ? '#4D59E8' : '#fff'}
								fontSize="14px"
								fontStyle="normal"
								fontWeight="500"
								width="100%"
								display="flex"
								alignItems="center"
								justifyContent="center"
								lineHeight="20px"
								cursor="pointer"
								height="64px"
								mt="2rem"
								border="1px solid rgb(26, 26, 31)"
								mb="0rem"
								onClick={() => {
									router.push('/provisions');
								}}
							>
								Provisions
							</Text>
							<Text
								color={pathname === '/tokenomics' ? '#4D59E8' : '#fff'}
								fontSize="14px"
								fontStyle="normal"
								fontWeight="500"
								width="100%"
								display="flex"
								alignItems="center"
								justifyContent="center"
								lineHeight="20px"
								cursor="pointer"
								height="64px"
								// mt="2rem"
								border="1px solid rgb(26, 26, 31)"
								mb="0rem"
								onClick={() => {
									router.push('/tokenomics');
								}}
							>
								Tokenomics
							</Text>
							<Text
								color="#fff"
								fontSize="14px"
								fontStyle="normal"
								fontWeight="500"
								lineHeight="20px"
								cursor="pointer"
								width="100%"
								textAlign="center"
								height="64px"
								display="flex"
								alignItems="center"
								justifyContent="center"
								border="1px solid rgb(26, 26, 31)"
								margin="0"
								onClick={() => {
									router.push('https://docs.hashstack.finance/');
								}}
							>
								Docs
							</Text>
							<Text
								color="#fff"
								fontSize="14px"
								fontStyle="normal"
								fontWeight="500"
								lineHeight="20px"
								cursor="pointer"
								width="100%"
								textAlign="center"
								height="64px"
								display="flex"
								alignItems="center"
								justifyContent="center"
								border="1px solid rgb(26, 26, 31)"
								margin="0"
								onClick={() => {
									router.push('https://docs.hashstack.finance/developers/');
								}}
							>
								Developers
							</Text>
							<Text
								color="#fff"
								fontSize="14px"
								fontStyle="normal"
								fontWeight="500"
								lineHeight="20px"
								cursor="pointer"
								width="100%"
								textAlign="center"
								height="64px"
								display="flex"
								alignItems="center"
								justifyContent="center"
								border="1px solid rgb(26, 26, 31)"
								margin="0"
								onClick={() => {
									router.push('https://app.hashstack.finance/');
								}}
							>
								Go to App
							</Text>
						</Box>
						<DrawerCloseButton
							position="fixed"
							bottom="10%"
							top="54%"
							left="47%"
							width="48px"
							height="48px"
							borderRadius="8px"
							bg="transparent"
							color="white"
						/>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</HStack>
	);
};

export default Navbar;
