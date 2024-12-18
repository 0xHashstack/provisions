import { RpcProvider } from 'starknet';
import contractsEnv from './contractsAddresses.json'

export const getProvider = () => {
    const rpctestnetUrl=String(process.env.NEXT_PUBLIC_INFURA_TESTNET_STARKNET);
    const rpcUrl=String(process.env.NEXT_PUBLIC_INFURA_MAINNET_STARKNET);
    if (process.env.NEXT_PUBLIC_NODE_ENV==='testnet') {
      const provider = new RpcProvider({ nodeUrl: rpctestnetUrl});
      return provider;
    }
    else {
      const provider = new RpcProvider({ nodeUrl: rpcUrl});
      return provider;
  
    }
  }

export const claimContractL1=process.env.NEXT_PUBLIC_NODE_ENV==='testnet'?contractsEnv?.sepolia?.CLAIM_CONTRACT_ADDRESS:contractsEnv?.mainnet?.CLAIM_CONTRACT_ADDRESS

export const claimContractL2=process.env.NEXT_PUBLIC_NODE_ENV==='testnet'?contractsEnv?.sepolia?.CLAIM_CONTRACT_ADDRESS_STARKNET:contractsEnv?.mainnet?.CLAIM_CONTRACT_ADDRESS