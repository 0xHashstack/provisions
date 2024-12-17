import contractsEnv from './contractsAddresses.json'

export const claimContractL1=process.env.NEXT_PUBLIC_NODE_ENV==='testnet'?contractsEnv?.sepolia?.CLAIM_CONTRACT_ADDRESS:contractsEnv?.sepolia?.CLAIM_CONTRACT_ADDRESS

export const claimContractL2=process.env.NEXT_PUBLIC_NODE_ENV==='testnet'?contractsEnv?.sepolia?.CLAIM_CONTRACT_ADDRESS_STARKNET:contractsEnv?.sepolia?.CLAIM_CONTRACT_ADDRESS