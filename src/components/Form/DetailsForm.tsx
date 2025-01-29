import React, { useEffect, useState } from 'react';
import contr from '../../abi/ERC20.json';

import axios from 'axios';
import { useAccount as useStarknetAccount } from '@starknet-react/core';
import {
	erc20ABI,
	useAccount,
	useBalance,
	useContractInfiniteReads,
	useContractRead,
	useContractWrite,
	useDisconnect,
	useWaitForTransaction,
} from 'wagmi';
import preSaleAbi from '../../abi/tokenPreSaleBooking.json';
import {
	mainnet,
	sepolia,
	goerli,
	polygon,
	optimism,
	polygonMumbai,
} from '@wagmi/core/chains';
import { formatUnits } from 'viem';
import { useRouter } from 'next/navigation';
import TickCompleteIcon from '@/assets/tickIcon';
import Link from 'next/link';
import BlueInfoIcon from '@/assets/blueinfoIcon';
import HashTokenDetails from '@/features/hashtoken/details';
import BookingForm from './BookingForm';

const DetailsForm = ({ handler }: any) => {
	const { address, isConnecting, isDisconnected } = useAccount();
	const [txStatus, settxStatus] = useState(false);
	const {
		account: starknetAccount,
		address: starknetaddress,
		status,
		isConnected: isStarknetConencted,
	} = useStarknetAccount();

	const [wallet, setWallet] = useState(address ? address : '');
	const [starknetWallet, setStarknetWallet] = useState(
		starknetaddress ? starknetaddress : ''
	);
	const [discord, setdiscord] = useState('');
	const [tokenName, setTokenName] = useState('USDT');
	const router = useRouter();
	const [Twitter, setTwitter] = useState('');
	const [Commit, setCommit] = useState<number>(0);
	const [BookAmt, setBookAmt] = useState<any>(0);
	const [checked, setChecked] = useState<boolean>(false);
	const [FundName, setFundName] = useState();
	const [investorcommit, setInvestorcommit] = useState<number>(0);
	const [DecisionTime, setDecisionTime] = useState<number>(0);
	const [url, setUrl] = useState('');
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
	const [successFull, setSuccessFull] = useState(false);
	const [tokenContr, setTokenContr] = useState(
		process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
			process.env.NEXT_PUBLIC_MC_USDT
		:	process.env.NEXT_PUBLIC_TC_USDT
	);
	const USDC =
		process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
			process.env.NEXT_PUBLIC_MC_USDC
		:	process.env.NEXT_PUBLIC_TC_USDC;
	const USDT =
		process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
			process.env.NEXT_PUBLIC_MC_USDT
		:	process.env.NEXT_PUBLIC_TC_USDT;
	const PRESALE_CONTR =
		process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
			process.env.NEXT_PUBLIC_MC_PRESALE
		:	process.env.NEXT_PUBLIC_TC_PRESALE;
	const [txloading, setTxloading] = useState(false);
	const usdtBalance = useBalance({
		address: address,
		token: `0x${USDT}`,
		chainId:
			process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
				polygon.id
			:	polygonMumbai.id,
	});
	const { disconnect } = useDisconnect();

	const usdcBalance = useBalance({
		address: address,
		token: `0x${USDC}`,
		chainId:
			process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
				polygon.id
			:	polygonMumbai.id,
	});
	// console.log((Number(usdcBalance?.data?.formatted)),"usdcbalance")
	// useEffect(()=>{
	//   if(!isNaN(Number(usdtBalance?.data?.formatted))  &&!isNaN(Number(usdcBalance?.data?.formatted)) &&Number(usdtBalance?.data?.formatted) <  50  && (Number(usdcBalance?.data?.formatted) <  50 )){
	//     console.log(address,Number(usdcBalance?.data?.formatted) )
	//     // router.push('')

	//   }
	// },[address])

	useEffect(() => {
		if (starknetaddress) {
			setStarknetWallet(starknetaddress);
		} else {
			setStarknetWallet('');
		}
	}, [starknetaddress]);

	useEffect(() => {
		try {
			const setnetwork = async () => {
				if (address) {
					setWallet(address);
					// console.log((usdtBalance?.data?.value) , Number(usdcBalance?.data?.formatted) ,address)
					if (Number(usdtBalance?.data?.formatted) > 50) {
						// router.push("/registrations/form");
						setTokenName('USDT');
						setTokenContr(USDT);
					} else if (Number(usdcBalance?.data?.formatted) > 50) {
						setTokenContr(USDC);
						setTokenName('USDC');
					}
				}
			};
			if (
				address &&
				!isNaN(Number(usdtBalance?.data?.formatted)) &&
				!isNaN(Number(usdcBalance?.data?.formatted))
			) {
				setnetwork();
			}
		} catch (err) {
			console.log(err, 'err in conencting');
		}
	}, [address, usdtBalance, usdcBalance]);

	const handleWalletChange = (e: any) => {
		// setWallet(e.target.value);
	};
	const handleDiscordChange = (e: any) => {
		setdiscord(e.target.value);
	};
	const handleTwitterChange = (e: any) => {
		setTwitter(e.target.value);
	};
	const handleCommitChange = (e: any) => {
		setCommit(e.target.value);
	};
	const handleBookAmtCHnage = (e: any) => {
		setBookAmt(e.target.value);
	};
	const handleFundNameChange = (e: any) => {
		setFundName(e.target.value);
	};
	const handleInvestorCommitChange = (e: any) => {
		setInvestorcommit(e.target.value);
	};
	const handleDecisionTimeChange = (e: any) => {
		setDecisionTime(e.target.value);
	};
	const handleUrlChange = (e: any) => {
		setUrl(e.target.value);
	};
	//   struct InvestorDetails {
	//     String fund_name;
	//     Number commitment_interest;
	//     uint256 time_to_decision;
	//     string website_url;
	// }
	const {
		data,
		isSuccess,
		isError,
		writeAsync: writeApproval,
	} = useContractWrite({
		address: `0x${tokenContr}`,
		abi: erc20ABI,
		functionName: 'approve',
		args: [`0x${PRESALE_CONTR}`, BigInt(BookAmt * 1000000)],
		chainId:
			process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
				polygon.id
			:	polygonMumbai.id,
	});
	const [declined, setDeclined] = useState(false);
	const { isLoading: approveLoading, isSuccess: approveSuccess } =
		useWaitForTransaction({
			hash: data?.hash,
		});
	console.log(approveSuccess);
	const [trigger, setTrigger] = useState(false);
	const {
		data: callData,
		isLoading,
		isSuccess: callSuccess,
		writeAsync: writeCall,
	} = useContractWrite({
		address: `0x${PRESALE_CONTR}`,
		abi: preSaleAbi.abi,
		functionName: 'preBooking',
		args: [BigInt(BookAmt * 1000000), `0x${tokenContr}`],
		chainId:
			process.env.NEXT_PUBLIC_NODE_ENV == 'mainnet' ?
				polygon.id
			:	polygonMumbai.id,
		onError: (err) => {
			console.log(err);
		},
	});
	const [prebookSucceeded, setPrebookSucceeded] = useState(false);
	const { data: dataPreebooked } = useContractRead({
		address: `0x${PRESALE_CONTR}`,
		abi: preSaleAbi.abi,
		functionName: 'hasUserPreBooked',
		args: [address],
	});
	const { isLoading: txLoading, isSuccess: txSuccess } =
		useWaitForTransaction({
			hash: callData?.hash,
		});

	// if()
	useEffect(() => {
		if (txSuccess && !txLoading) {
			settxStatus(true);
			setTxloading(false);
		}
	}, [txSuccess]);

	const {
		data: allowanceData,
		isError: isAllowanceError,
		isLoading: isAllowanceLoading,
	} = useContractRead({
		address: `0x${tokenContr}`,
		abi: contr.genericErc20Abi,
		functionName: 'allowance',
		args: [wallet, `0x${PRESALE_CONTR}`],
	});
	// console.log(formatUnits(allowanceData,6));

	useEffect(() => {
		setPrebookSucceeded(dataPreebooked == true);
	}, [dataPreebooked]);
	// useEffect(()=>{
	//   if(trigger){
	//   // writeCall()

	//   }
	//   setTrigger(false);

	// },[trigger])
	// useEffect(()=>{
	//   Trigger(trusete);
	// }[isSuccess])
	useEffect(() => {
		console.log(callSuccess, txLoading);
		if (txSuccess) {
			setTxloading(false);
		}
	}, [callSuccess]);
	// useEffect(() => {
	//   if (trigger && isSuccess && data?.hash) {
	//     console.log(data?.hash);
	//     setTimeout(async () => {
	//       try {
	//         await writeCall();

	//         // setTxloading(false);
	//       } catch (err) {
	//         console.log("Error in writeCall:", err);
	//         // Handle the error here, you can set some state or perform other actions
	//       }
	//     }, 5000);
	//     setTrigger(false);
	//     setTimeout(() => {
	//       setTxloading(false);
	//     }, 10000);
	//   }
	// }, [trigger, isSuccess]);
	useEffect(() => {
		const performPrebook = async () => {
			console.log(approveSuccess && !txLoading);
			if (approveSuccess && !txLoading) {
				console.log('inside');
				try {
					await writeCall();
				} catch (err) {
					console.log(err);
					setDeclined(true);
					setTxloading(false);
				}

				// setTxloading(false);
			}
		};
		if (
			(approveSuccess || !approveLoading) &&
			txStatus === false &&
			!txLoading &&
			!declined
		) {
			performPrebook();
		}
	}, [approveSuccess]);

	useEffect(() => {
		setTrigger(true);
	}, [isSuccess]);
	useEffect(() => {
		setTxloading(false);
	}, [isError]);

	const handleSubmit = async () => {
		setDeclined(false);

		try {
			setTxloading(true);
			axios
				.post(
					'https://b1ibz9x1s9.execute-api.ap-southeast-1.amazonaws.com/api/presale/unchecked',
					{
						wallet: address,
						discord: discord,
						twitter: Twitter,
						commit: 50,
						bookamt: BookAmt,
						hasInvestor: checked,
						starknet_address:
							starknetWallet ? starknetWallet : 'nil',
					}
				)
				.then((response) => {
					console.log(response, 'linked'); // Log the response from the backend.
				})
				.catch((error) => {
					console.error('Error:', error);
				});
			// console.log(Number(formatUnits(allowanceData,6)),Number(BookAmt) );
			if (
				typeof allowanceData === 'bigint' &&
				allowanceData &&
				Number(formatUnits(allowanceData, 6)) >= Number(BookAmt)
			) {
				await writeCall();
			} else {
				await writeApproval();
			}
			// await writeCall();
		} catch (err) {
			console.log(err);
			setFormSubmitted(false);
		}
	};

	const handleInvestorSubmit = async () => {
		setTxloading(true);
		setDeclined(false);
		try {
			axios
				.post(
					'https://b1ibz9x1s9.execute-api.ap-southeast-1.amazonaws.com/api/presale/checked',
					{
						wallet: address,
						discord: discord,
						twitter: Twitter,
						commit: 50,
						bookamt: BookAmt,
						hasInvestor: checked,
						fundname: FundName,
						Fundcommit: investorcommit,
						decisiontime: DecisionTime,
						url: url,
						starknet_address:
							starknetWallet ? starknetWallet : 'nil',
					}
				)
				.then((response) => {
					console.log(response, 'linked'); // Log the response from the backend.
				})
				.catch((error) => {
					console.error('Error:', error);
				});
			if (
				typeof allowanceData === 'bigint' &&
				Number(formatUnits(allowanceData, 6)) >= Number(BookAmt)
			) {
				await writeCall();
			} else {
				await writeApproval();
			}
		} catch (err) {
			console.log(err);
			setFormSubmitted(false);
		}
	};

	return (
		<div className='flex flex-col lg:flex-row gap-6'>
			<BookingForm
				wallet={wallet}
				starknetWallet={starknetWallet}
				discord={discord}
				Twitter={Twitter}
				BookAmt={BookAmt}
				checked={checked}
				FundName={FundName}
				investorcommit={investorcommit}
				DecisionTime={DecisionTime}
				url={url}
				tokenName={tokenName}
				callData={callData}
				txStatus={txStatus}
				prebookSucceeded={prebookSucceeded}
				txLoading={txLoading}
				approveLoading={approveLoading}
				txloading={txloading}
				formSubmitted={formSubmitted}
				usdtBalance={usdtBalance}
				usdcBalance={usdcBalance}
				handleDiscordChange={handleDiscordChange}
				handleTwitterChange={handleTwitterChange}
				handleBookAmtCHnage={handleBookAmtCHnage}
				setChecked={setChecked}
				handleFundNameChange={handleFundNameChange}
				handleInvestorCommitChange={handleInvestorCommitChange}
				handleDecisionTimeChange={handleDecisionTimeChange}
				handleUrlChange={handleUrlChange}
				handleSubmit={handleSubmit}
				handleInvestorSubmit={handleInvestorSubmit}
				setFormSubmitted={setFormSubmitted}
			/>
			<HashTokenDetails />
		</div>
	);
};
export default DetailsForm;
