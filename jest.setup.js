// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Polyfills for Node.js testing environment
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Mock environment variables
process.env.NEXT_PUBLIC_NODE_ENV = 'testnet'
process.env.NEXT_PUBLIC_INFURA_TESTNET_BASE = 'https://sepolia.infura.io/v3/test'
process.env.NEXT_PUBLIC_INFURA_MAINNET = 'https://mainnet.infura.io/v3/test'
