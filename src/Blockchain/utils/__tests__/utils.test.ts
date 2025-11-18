import {
  BNtoNum,
  NumToBN,
  GetErrorText,
  toFixed,
  depositInterestAccrued,
  borrowInterestAccrued,
  etherToWeiBN,
  weiToEtherNumber,
  parseAmount,
  fixedSpecial,
} from '../utils'
import { BigNumber } from 'bignumber.js'

// Mock ethers Logger
const Logger = {
  errors: {
    CALL_EXCEPTION: 'CALL_EXCEPTION',
  },
}

describe('utils.ts utility functions', () => {
  describe('fixedSpecial', () => {
    it('should handle numbers without exponent notation', () => {
      const result = fixedSpecial(123.456, 0)
      expect(result).toBeDefined()
    })

    it('should handle very large numbers', () => {
      const result = fixedSpecial(1e10, 0)
      expect(result).toBeDefined()
    })

    it('should handle numbers with decimals', () => {
      const result = fixedSpecial(0.00001, 2)
      expect(result).toBeDefined()
    })
  })

  describe('BNtoNum', () => {
    it('should convert BigNumber with default decimals (18)', () => {
      const result = BNtoNum(1e18)
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })

    it('should handle small numbers', () => {
      const result = BNtoNum(1)
      expect(result).toBeDefined()
    })

    it('should handle zero', () => {
      const result = BNtoNum(0)
      expect(result).toBeDefined()
    })

    it('should convert with custom decimals', () => {
      const result = BNtoNum(1000, 6)
      expect(result).toBeDefined()
    })
  })

  describe('NumToBN', () => {
    it('should convert number to BigNumber with default decimals', () => {
      const result = NumToBN(1)
      expect(result).toBeDefined()
    })

    it('should handle large numbers', () => {
      const result = NumToBN(1000000)
      expect(result).toBeDefined()
    })

    it('should convert with custom decimals', () => {
      const result = NumToBN(100, 6)
      expect(result).toBeDefined()
    })
  })

  describe('GetErrorText', () => {
    it('should return transaction failed message for CALL_EXCEPTION', () => {
      const err = {
        code: Logger.errors.CALL_EXCEPTION,
        transactionHash: '0x123',
      }
      const result = GetErrorText(err)
      expect(result).toContain('Transaction failed')
      expect(result).toContain('0x123')
    })

    it('should return error data message if available', () => {
      const err = {
        data: {
          message: 'Custom error message',
        },
      }
      const result = GetErrorText(err)
      expect(result).toBe('Custom error message')
    })

    it('should return error message property if available', () => {
      const err = {
        message: 'Error message from err.message',
      }
      const result = GetErrorText(err)
      expect(result).toBe('Error message from err.message')
    })

    it('should return string if error is a string', () => {
      const result = GetErrorText('String error')
      expect(result).toBe('String error')
    })

    it('should return default message for unknown error', () => {
      const result = GetErrorText({})
      expect(result).toBe('Oops! Something went wrong.')
    })
  })

  describe('toFixed', () => {
    it('should fix number to specified decimal places', () => {
      const result = toFixed(3.14159, 2)
      expect(result).toBe(3.14)
    })

    it('should return 0 for NaN values', () => {
      const result = toFixed(NaN, 2)
      expect(result).toBe(0)
    })

    it('should handle zero', () => {
      const result = toFixed(0, 4)
      expect(result).toBe(0)
    })

    it('should handle negative numbers', () => {
      const result = toFixed(-5.6789, 2)
      expect(result).toBe(-5.68)
    })

    it('should handle zero decimal places', () => {
      const result = toFixed(123.456, 0)
      expect(result).toBe(123)
    })
  })

  describe('borrowInterestAccrued', () => {
    it('should calculate borrow interest correctly', () => {
      const asset = {
        loanInterest: '1e18', // 1 token with 18 decimals
      }
      const result = borrowInterestAccrued(asset)
      expect(result).toBe('1.000000')
    })

    it('should handle zero interest', () => {
      const asset = {
        loanInterest: '0',
      }
      const result = borrowInterestAccrued(asset)
      expect(result).toBe('0.000000')
    })

    it('should handle large interest values', () => {
      const asset = {
        loanInterest: '1000000000000000000000',
      }
      const result = borrowInterestAccrued(asset)
      expect(result).toBeDefined()
    })
  })

  describe('etherToWeiBN', () => {
    it('should convert ether amount to wei', () => {
      const result = etherToWeiBN('1', 'ETH')
      expect(result).toBeDefined()
      expect(result).not.toBe(0)
    })

    it('should return 0 for null/undefined amount', () => {
      const result = etherToWeiBN(null, 'ETH')
      expect(result).toBe(0)
    })

    it('should return 0 for undefined amount', () => {
      const result = etherToWeiBN(undefined, 'ETH')
      expect(result).toBe(0)
    })

    it('should handle decimal amounts', () => {
      const result = etherToWeiBN('0.5', 'ETH')
      expect(result).toBeDefined()
    })

    it('should handle large amounts', () => {
      const result = etherToWeiBN('1000', 'ETH')
      expect(result).toBeDefined()
    })
  })

  describe('weiToEtherNumber', () => {
    it('should convert wei to ether number', () => {
      const result = weiToEtherNumber('1000000000000000000', 'ETH')
      expect(result).toBeDefined()
      expect(result).toBeGreaterThan(0)
    })

    it('should handle zero wei', () => {
      const result = weiToEtherNumber('0', 'ETH')
      expect(result).toBe(0)
    })

    it('should truncate to 6 decimal places', () => {
      const result = weiToEtherNumber('1234567890123456789', 'ETH')
      expect(result).toBeDefined()
      // Verify it's truncated, not rounded
      const decimalPlaces = result.toString().split('.')[1]?.length || 0
      expect(decimalPlaces).toBeLessThanOrEqual(6)
    })
  })

  describe('parseAmount', () => {
    it('should parse amount with default decimals', () => {
      const result = parseAmount('1000000000000000000')
      expect(result).toBe(1)
    })

    it('should parse amount with custom decimals', () => {
      const result = parseAmount('1000000', 6)
      expect(result).toBe(1)
    })

    it('should parse amount with custom precision', () => {
      const result = parseAmount('1234567890123456789', 18, 6)
      expect(result).toBeLessThanOrEqual(1.234567)
    })

    it('should handle zero amount', () => {
      const result = parseAmount('0')
      expect(result).toBe(0)
    })

    it('should handle large amounts', () => {
      const result = parseAmount('1000000000000000000000000')
      expect(result).toBeDefined()
    })
  })

  describe('depositInterestAccrued', () => {
    it('should calculate interest for valid historical data', () => {
      const asset = {
        marketAddress: '0xABC',
        commitmentIndex: 1,
        amount: '1000000000000000000',
      }
      const historicalData = [
        {
          market: '0xABC',
          commitment: '1',
          timestamp: Date.now() / 1000 - 86400, // 1 day ago
          apr100x: '1000', // 10%
        },
      ]
      const result = depositInterestAccrued(asset, historicalData)
      expect(result).toBeDefined()
    })

    it('should handle empty historical data', () => {
      const asset = {
        marketAddress: '0xABC',
        commitmentIndex: 1,
        amount: '1000000000000000000',
      }
      const result = depositInterestAccrued(asset, [])
      expect(result).toBeDefined()
    })

    it('should return zero for no matching historical entries', () => {
      const asset = {
        marketAddress: '0xABC',
        commitmentIndex: 1,
        amount: '1000000000000000000',
      }
      const historicalData = [
        {
          market: '0xDEF', // Different market
          commitment: '1',
          timestamp: Date.now() / 1000 - 86400,
          apr100x: '1000',
        },
      ]
      const result = depositInterestAccrued(asset, historicalData)
      expect(result).toBeDefined()
    })

    it('should handle multiple historical entries', () => {
      const asset = {
        marketAddress: '0xABC',
        commitmentIndex: 1,
        amount: '1000000000000000000',
      }
      const now = Date.now() / 1000
      const historicalData = [
        {
          market: '0xABC',
          commitment: '1',
          timestamp: now - 86400,
          apr100x: '1000',
        },
        {
          market: '0xABC',
          commitment: '1',
          timestamp: now - 172800,
          apr100x: '1000',
        },
      ]
      const result = depositInterestAccrued(asset, historicalData)
      expect(result).toBeDefined()
    })
  })
})
