import contractsEnv from './contractsAddresses.json'

export const claimContractL1=process.env.NEXT_PUBLIC_NODE_ENV==='testnet'?contractsEnv?.sepolia_base?.CLAIM_CONTRACT_ADDRESS:contractsEnv?.sepolia_base?.CLAIM_CONTRACT_ADDRESS